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

const BasicUserFragment = gql`
  fragment BasicUserInfo on User {
    id
    fullName
    email
    active
    vendor {
      id
      name
      logo
    }
    userRoles {
      id
      role
    }
  }
`;

export const GET_USERS = gql`
  query users($skip: Int!, $pageSize: Int!, $searchText: String) {
    users(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
      users {
        ...BasicUserInfo
      }
      totalRows
    }
  }
  ${BasicUserFragment}
`;

// export const GET_VENDORS = gql`
//   query vendors(skip: 0, pageSize: 100, searchText: "") {
//     vendors {
//       id
//       Name
//     }
//   }
// `;

export const GET_USER_BY_ID = gql`
  query userById($id: Int!) {
    userById(id: $id) {
      id
      firstName
      lastName
      email
      active
      alertProductAdded
      alertProductDiscontinued
      alertProductUpdated
      alertEmail
      vendor {
        id
        name
      }
      userRoles
    }
    vendors(skip: 0, pageSize: 100, searchText: "") {
      vendors {
        id
        name
      }
    }
  }
`;
