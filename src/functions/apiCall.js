const apiURL = 'https://api-node-express.herokuapp.com/api/';
const fetch = require('node-fetch');

/**
 * Asynchronous function for sending api calls.
 *
 * @param {string} endpoint name of endpoint
 * @param {string} method HTTP method for endpoint GET/POST/PUT/DEL
 * @param {object} object Object to send to the API
 */
async function apiCall(endpoint, method, object) {
  try {
    const response = await fetch(apiURL + endpoint, {
      method: method,
      headers: {
        Authorization: localStorage.getItem('usertoken')
          ? `Basic ${localStorage.getItem('usertoken')}`
          : undefined,
        'Content-Type': 'application/json',
      },
      body: object ? JSON.stringify(object) : undefined,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

export default apiCall;
