import gql from 'graphql-tag';

export const SAVE_USER = gql`
  mutation saveUser($data: UserInput!) {
    saveUser(data: $data) {
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
      userRoles {
        id
        role
      }
    }
  }
`;
