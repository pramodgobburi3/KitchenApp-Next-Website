import { gql } from "@apollo/client";

export const MEALS_QUERY = gql`
  query {
    meals {
      meal_id
      date
      name
    }
  }
`;

export const FULL_MEAL_QUERY = (meal_id) => gql`
  query {
    meal(id:"${meal_id}") {
      meal_id
      user_id
      date
      tags
      name
      total_calories
      total_time
      total_time_units
      created_by
      updated_by
      created_at
      updated_at
      recipes {
        recipe_id
        name
        description
        prep_time
        cook_time
        serving_size
        difficulty
        author
        tags
        media {
          url
        }
        ingredients {
          name
          quantity
        }
        steps {
          description
        }
        nutrition {
          calories
          total_fat
          trans_fat
          saturated_fat
          total_carbohydrates
          fiber
          sodium
          sugar
          cholesterol
          vitamins {
            name
            value
          }
        }
      }
    }
  }
`;