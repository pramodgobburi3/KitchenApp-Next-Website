import { gql } from "@apollo/client";

export const GROCERY_LIST_QUERY = gql`
  query {
    grocery_lists {
      grocery_list_id
      name
      type
      start_date
      end_date
      items {
        list_item_id
        name
        is_fulfilled
        unit
        quantity
        note
      }
    }
  }
`;