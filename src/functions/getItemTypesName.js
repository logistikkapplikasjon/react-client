import apiCall from './apiCall';

/**
 * Asynkron fetch-funksjon som henter varetyper fra APIet
 */

const getItemTypesName = async () => {
  try {
    return await apiCall('itemtypes', 'GET');
  } catch (error) {
    return error;
  }
};
export default getItemTypesName;
