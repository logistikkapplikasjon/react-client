/**
 * Switch-funksjon som tar inn et typenavn i string-format.
 * Dersom typenavnet eksisterer i listen returneres dette i korrekt format.
 * Dersom typenavnet ikke eksisterer returneres null.
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
