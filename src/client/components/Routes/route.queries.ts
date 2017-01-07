import gql from 'graphql-tag';

export const GET_ME = gql`
  query {
    me {
      id
      firstName
      lastName
      email
      userRoles
    }
  }
`;
