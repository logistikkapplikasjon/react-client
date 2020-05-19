/**
 * Switch function for selecting an entity that corresponds with the endpoint name
 */
const chooseEntity = (type) => {
  switch (type) {
    case 'user':
      return 'users';
    case 'item':
      return 'items';
    case 'item_type':
      return 'itemtypes';
    case 'project':
      return 'projects';
    default:
      return null;
  }
};
export default chooseEntity;
