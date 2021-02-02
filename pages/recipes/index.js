import React, { useEffect, useState } from "react";
import { StyleSheet, css } from 'aphrodite';
import { message, Pagination, Steps } from 'antd';
import { Container } from 'reactstrap';
import { HiOutlineSearch } from 'react-icons/hi';
import Loader from "../../components/Loader";

import '../../assets/css/override_pagination.css';
import RecipeData from "../../components/RecipeData";

const { Step } = Steps;

const Recipes = props => {
  const [search, setSearch] = useState('');

  return (
    <Container>
      <div className={css(styles.titleContainer)}>
        <h3 className={css(styles.title)}>All Recipes</h3>
        <div className={css(styles.titleRightContainer)}>
          <span style={{marginRight: 10}}><HiOutlineSearch color={search != '' ? 'red' : 'gray'} /></span>
          <input type="text" placeholder="Search recipes..." className={css(styles.searchContainer)} value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      {/* <hr style={{marginBottom: 30}}/> */}
      <RecipeData search={search} />
    </Container>
  );
}


const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  title: {
    marginBottom: 40,
    marginTop: 30
  },
  titleRightContainer: {
    marginLeft: 'auto',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  searchContainer: {
    width: 250,
    border: 'none',
    borderBottom: '1px lightgray solid',
    outline: 'none',
    ":focus": {
      borderBottom: '1px red solid'
    }
  },
  
})

export default Recipes;