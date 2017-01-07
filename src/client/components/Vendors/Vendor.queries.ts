import gql from 'graphql-tag';

// const VendorFragment = gql`
//   fragment VendorInfo on Vendor {
//     id
//     Name
//     Logo
//     VendorCategories {
//       Id
//       Category
//     }
//     Created
//     Modified
//   }
// `;

const BasicVendorFragment = gql`
  fragment BasicVendorInfo on Vendor {
    id
    name
    logo
    vendorCategories {
      id
      category
    }
  }
`;

export const GET_VENDORS = gql`
  query vendors($skip: Int!, $pageSize: Int!, $searchText: String) {
    vendors(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
      vendors {
        ...BasicVendorInfo
      }
      totalRows
    }
  }
  ${BasicVendorFragment}
`;

export const GET_VENDOR_BY_ID = gql`
  query vendorById($id: Int!) {
    vendorById(id: $id) {
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
