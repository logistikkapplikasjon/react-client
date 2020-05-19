import React, { useRef, useEffect } from 'react';

/**
 * Component for generating a canvas and drawing bound boxes around the detected objects
 * @component
 * @param {props} props props passed from container
 */
const DetectedImage = (props) => {
  /**
   * Destructuring of props
   */
  const { image, predictions } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = image;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      predictions.map((prediction) => {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000000';
        ctx.fillStyle = '#000000';
        ctx.rect(
          prediction.bbox[0],
          prediction.bbox[1],
          prediction.bbox[2],
          prediction.bbox[3]
        );
        ctx.stroke();
        drawText(
          ctx,
          prediction.class,
          prediction.score.toPrecision(3),
          prediction.bbox[0],
          prediction.bbox[1]
        );
        return null;
      });
    };
  });

  const drawText = (ctx, predictionClass, predictionScore, x, y) => {
    ctx.font = '20px Courier';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 6;
    ctx.strokeText(predictionClass, x, y + 20);
    ctx.strokeText(predictionScore, x, y - 5);
    ctx.fillStyle = 'white';
    ctx.fillText(predictionClass, x, y + 20);
    ctx.fillText(predictionScore, x, y - 5);
  };

  return (
    <div>
      <canvas ref={canvasRef} width={600} height={800} />
    </div>
  );
};
export default DetectedImage;
