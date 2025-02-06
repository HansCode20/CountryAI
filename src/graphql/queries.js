import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      emoji
      capital
      currency
      phone
      continent {
       name
      }
      languages {
        name
      }
    }
  }
`;
