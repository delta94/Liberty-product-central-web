import gql from 'graphql-tag';

export const SAVE_VENDOR = gql`
  mutation saveVendor($data: VendorInput!) {
    saveVendor(data: $data) {
      id
      name
      logo
      vendorCategories {
        id
        category
        itemClasses {
          id
          itemClass
        }
      }
    }
  }
`;
