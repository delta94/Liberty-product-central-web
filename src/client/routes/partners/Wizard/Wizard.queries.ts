import gql from 'graphql-tag';

// const UserFragment = gql`
//   fragment UserInfo on User {
//     Id
//     FirstName
//     LastName
//     FullName
//     Email
//     Active
//     Role
//     Created
//     Modified
//   }
// `;

export const GET_CATEGORIES = gql`
  query {
    vendorCategoriesForUser {
      category
    }
  }
`;

export interface GetVendorCategoriesQueryResponse {
  vendorCategoriesForUser: string[];
}

export const GET_ITEM_CLASSES_FOR_CATEGORIES = gql`
  query($categories: [String!]!) {
    getItemClassesForCategories(categories: $categories) {
      groups {
        category
        itemClasses {
          category
          itemClass
          itemClassDescription
        }
      }
    }
  }
`;

export const GET_USER_JOB_FOR_USER = gql`
  query($categories: [String!]!) {
    getItemClassesForCategories(categories: $categories) {
      groups {
        category
        itemClasses {
          category
          itemClass
          itemClassDescription
        }
      }
    }
  }
`;

export interface CategoryItemClassDescription {
  category: string;
  itemClass: string;
  itemClassDescription: string;
}

export interface GetItemClassesForCategoriesGroup {
  category: string;
  itemClasses: CategoryItemClassDescription[];
}

export interface GetItemClassesForCategoriesGroups {
  groups: GetItemClassesForCategoriesGroup[];
}

export interface GetItemClassesForCategoriesResponse {
  getItemClassesForCategories: GetItemClassesForCategoriesGroups;
}

// export const GET_VENDORS = gql`
//   query vendors(skip: 0, pageSize: 100, searchText: "") {
//     vendors {
//       id
//       Name
//     }
//   }
// `;

export const GET_USER_BY_ID = gql`
  query userByIdAndVendors($id: Int!) {
    userById(id: $id) {
      id
      firstName
      lastName
      fullName
      email
      active
      role
      vendor {
        id
        name
        logo
      }
    }
    vendors(skip: 0, pageSize: 100, searchText: "") {
      vendors {
        id
        name
      }
    }
  }
`;
