import React, { useState, useEffect } from 'react';
import ImageUpload from '../components/ImageUpload';
import InputDetections from '../components/Forms/InputDetections';
import apiCall from '../functions/apiCall';
import { Button, Alert } from 'reactstrap';
import { Container, Row, Col, Form } from 'reactstrap';
import DetectedImage from '../components/DetectedImage';
import Loading from './Loading';
import loadImage from 'blueimp-load-image';

/**
 * Container for creating transactions.
 * Lets the user withdraw or deposit items either by using manual forms or by submitting a picture for object recognition.
 * Uses Hooks to fetch data, and submits POST-requests by using a submit function through the apiCall function
 * @component
 */

const AddRemove = (props) => {
  const [usePicture, setUsePicture] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [response, setResponse] = useState();
  const [projects, setProjects] = useState();
  const [fetching, setFetching] = useState(true);
  const [predictions, setPredictions] = useState();
  const [imageUrl, setImageUrl] = useState('');
  const [imageData, setImageData] = useState('');
  const [items, setItems] = useState();
  const option = props.match.params.option;

  useEffect(() => {
    /**
     * Asynchronous fetch function for getting projects and populating them to state
     */
    const getProjects = async () => {
      try {
        setFetching(true);
        const response = await apiCall('projects', 'GET');
        setProjects(response.result);
        setFetching(false);
      } catch (error) {
        console.log(error);
        setFetching(false);
      }
    };
    /**
     * Asynchronous fetch function for getting items and populating them to state
     */
    const getItems = async () => {
      try {
        setFetching(true);
        const response = await apiCall('items', 'GET');
        setItems(response.result);
        setFetching(false);
      } catch (error) {
        console.log(error);
        setFetching(false);
      }
    };
    getProjects();
    getItems();
  }, []);

  /**
   * Asynchronous fetch function for sending POST-requests with transactions to the API.
   * @param {event} e event
   */
  const generateTransaction = async (e) => {
    e.preventDefault();
    try {
      setFetching(true);
      const results = await Promise.all(
        transactions.map((transaction) =>
          apiCall('transactions', 'POST', transaction)
        )
      );
      setResponse(results);
      setFetching(false);
    } catch (error) {
      console.log(error);
      setFetching(false);
    }
  };

  /**
   * Function for handling changes in objects which are part of the transactions array. Takes an input of index and changes the value of the targeted input in the correct object.
   * @param {number} index array index of transaction to change
   */
  const handleTransactionChange = (index) => (e) => {
    let newArr = [...transactions];
    let newObject = { ...newArr[index] };
    newObject[e.target.name] = e.target.value;
    newArr[index] = newObject;
    setTransactions(newArr);
  };

  /**
   * Function for populating predictions fetched from the API to the transactions array.
   * @param {Array} submittedPredictions array of prediction objects
   */
  const initializePredictionObjects = (submittedPredictions) => {
    const values = submittedPredictions.map((prediction) => ({
      item_id:
        items && items.length > 0
          ? items.find(
              (item) =>
                item.name.toLowerCase() === prediction.class.toLowerCase()
            ).item_id
          : undefined,
      amount: 1,
      option: option,
      project_id:
        projects && projects.length > 0 ? projects[0]['project_id'] : undefined,
      score: prediction.score.toPrecision(3),
      name: prediction.class,
    }));
    setTransactions(values);
  };

  /**
   * Function for submitting an user selected picture through the input field. Sends a POST-request to the API with the image data and populates predictions in state.
   * @param {event} e event
   */
  const submitPicture = async (e) => {
    e.preventDefault();
    try {
      setDisabled(true);
      setFetching(true);
      const results = await apiCall('images', 'POST', {
        imageData: imageData,
      });
      setPredictions(results);
      setFetching(false);
      initializePredictionObjects(results);
    } catch (error) {
      console.log(error);
      setFetching(false);
    }
  };

  /**
   * Function for handling the input of pictures, resizing them to a resolution better handled by the API and passing them to the function for converting them to base64
   * code based on: https://github.com/mosch/react-avatar-editor/issues/123#issuecomment-279838256
   * @param {} e event
   */
  const onChangePictureInput = async (e) => {
    e.preventDefault();
    loadImage(
      e.target.files[0],
      (img) => {
        img.toBlob((blob) => {
          imageToBase64(blob);
          setImageUrl(URL.createObjectURL(blob));
        });
      },
      { maxWidth: 600, canvas: true, orientation: true }
    );
  };

  /**
   * Asynchronous function for converting an image file to Base 64. Takes in an image file from the file input and stores the image data in state.
   * Creates a ObjectURL for populating the canvas element in DetectedImage component and saves it to state.
   * @param {image} image image file
   */
  const imageToBase64 = async (imageFile) => {
    let reader = new FileReader();
    if (imageFile) {
      reader.readAsDataURL(imageFile);
      reader.onload = (e) => {
        setImageData(e.target.result);
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
      };
    }
  };

  /**
   * Function for adding more manual inputs for transactions. Takes in an event from a button push, creates a new object and sends it to the addField function
   * Using code obtained from https://codesandbox.io/s/q555kp8jj
   * @param {event} e event
   */
  const handleAddInput = (e) => {
    e.preventDefault();
    let object = {
      item_id: items && items.length > 0 ? items[0]['item_id'] : undefined,
      amount: 1,
      project_id:
        projects && projects.length > 0 ? projects[0]['project_id'] : undefined,
      option: option,
    };
    addField(object);
  };

  /**
   * Function for removing manual or predicted inputs for transactions. Takes in an event from a button push, removes the InputDetections form assigned to the index.
   * @param {event} e event
   * @param {number} index index of InputDetections-form
   */
  const handleRemove = (index) => (e) => {
    e.preventDefault();
    let transaction = [...transactions];
    transaction.splice(index, 1);
    setTransactions(transaction);
  };

  /**
   * Function for adding manual inputs for transactions. Takes in an object containing data required to populate the InputDetections form and appends the object to the transactions array in state.
   * @param {object} object object containing parameters used to generate transactions
   */
  const addField = (object) => {
    let newArray = [...transactions, object];
    setTransactions(newArray);
  };

  return (
    <>
      {fetching ? (
        <Loading />
      ) : (
        <Container>
          <Row>
            <Col>
              <h1 className='h3 mb-3  font-weight-normal'>
                {option === 'add' ? 'Legg til varer' : 'Ta ut varer'}
              </h1>
              <h4>Fremgangsmåte:</h4>
              <ul>
                <li>last opp bilde</li>
                <li>
                  velg vare fra listen / registrer ny vare hvis varen ikke
                  finnes i listen
                </li>
                <li>legg til nytt felt hvis nødvendig</li>
              </ul>
            </Col>
          </Row>
          {response && (
            <>
              {response.map((res, index) =>
                res.result ? (
                  <Alert color='success' key={index}>
                    Transaksjon som inneholder {transactions[index].amount} av
                    {transactions[index].name} fikk status: {res.message} og ble
                    lastet opp til prosjekt:
                    {projects &&
                      projects.find(
                        (project) =>
                          project.project_id === transactions[index].project_id
                      ).project_name}
                    '
                  </Alert>
                ) : (
                  <Alert color='danger' key={index}>
                    {res.message} i linje nummer {index + 1}.{' '}
                  </Alert>
                )
              )}
            </>
          )}
          <Row>
            <Button
              onClick={() => setUsePicture(!usePicture)}
              color='primary'
              size='sm'
              disabled={disabled}
            >
              {!usePicture ? 'Last opp bilde' : 'Ta bort bildeopplastingen'}
            </Button>
          </Row>
          <br />
          <Row>
            {usePicture ? (
              <ImageUpload
                submitPicture={submitPicture}
                onChangePictureInput={onChangePictureInput}
                disabled={disabled}
              />
            ) : undefined}
            {predictions ? (
              <DetectedImage image={imageUrl} predictions={predictions} />
            ) : undefined}
          </Row>

          <Form>
            {transactions &&
              transactions.map((transaction, index) => {
                return (
                  <InputDetections
                    key={'input' + index}
                    index={index}
                    handleChange={handleTransactionChange}
                    projects={projects}
                    items={items}
                    handleRemove={handleRemove}
                    defaultItem={
                      (transaction && transaction.item_id) || undefined
                    }
                    score={(transaction && transaction.score) || undefined}
                    name={(transaction && transaction.name) || undefined}
                    value={(transaction && transaction.amount) || 1}
                  />
                );
              })}
            <br />
            <Row>
              <Button
                color='secondary'
                outline
                size='sm'
                onClick={handleAddInput}
              >
                Legg til felt
              </Button>
            </Row>
            <br />
            <Row>
              <Button
                type='submit'
                color='success'
                onClick={generateTransaction}
              >
                {option === 'add' ? 'Legg til' : 'Ta ut'}
              </Button>
            </Row>
          </Form>
        </Container>
      )}
    </>
  );
};

export default AddRemove;
