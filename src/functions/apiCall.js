const apiURL = 'https://api-node-express.herokuapp.com/api/';
const fetch = require('node-fetch');

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
