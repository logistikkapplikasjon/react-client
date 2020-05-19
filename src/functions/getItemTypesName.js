import apiCall from './apiCall';

/**
 * Asynchronous function for fetching itemtypes from the API
 */

const getItemTypesName = async () => {
  try {
    return await apiCall('itemtypes', 'GET');
  } catch (error) {
    return error;
  }
};
export default getItemTypesName;
