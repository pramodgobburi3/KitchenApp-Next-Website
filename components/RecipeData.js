import React, { useEffect, useState } from "react";
import { StyleSheet, css } from 'aphrodite';
import { message, Pagination, Steps } from 'antd';

import RecipeCard from "./RecipeCard";
import { useQuery } from "@apollo/client";

import {RECIPES_QUERY} from '../gql/queries/recipes';
import Loader from "./Loader";

import '../assets/css/override_pagination.css';

const { Step } = Steps;

const RecipeData = (props) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const { loading, error, data, refetch } = useQuery(RECIPES_QUERY(page, limit, props.search));

  const getTotalPages = () => {
    if (data) {
      return data.recipes.total;
    } else {
      return 0;
    }
  }

  const setPagination = (p, s) => {
    setPage(p);
    setLimit(s);
  }

  useEffect(() => {
    refetch();
  }, [page, limit]);

  if (!loading) {
    if (error) {
      message.error("Unable to fetch recipes");
    }
    return (
      <>
        <div className={css(styles.cardContainer)}>
          {data && 
            data.recipes.recipes.map((recipe, index) => (
              <RecipeCard recipe={recipe} index={index} length={data.recipes.length} {...props} />
            ))
          }
        </div>
        <div className={css(styles.paginationContainer)}>
          <Pagination current={page} total={getTotalPages()} onChange={(p,s) => setPagination(p,s)} pageSize={limit} pageSizeOptions={[20, 60, 100]} showQuickJumper={true} />
        </div>
      </>
    );
  } else {
    return (
      <Loader overlay={false} hasHeader={true} />
    )
  }
}


const styles = StyleSheet.create({
  cardContainer: {
    display: 'grid',
    justifyContent: 'center',
    gridTemplateColumns: 'repeat( auto-fit, minmax(250px, max-content) )',
    rowGap: '10px',
    columnGap: '30px'
  },
  paginationContainer: {
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }
})

export default RecipeData;