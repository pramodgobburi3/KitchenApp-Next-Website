import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Container } from 'reactstrap';
import GroceryList from '../../components/GroceryList';
import AllLists from '../../components/AllLists';
import Loader from "../../components/Loader";

import { GROCERY_LIST_QUERY } from '../../gql/queries/grocery_lists';
import { useQuery } from "@apollo/client";
import { message } from 'antd';
import { toggleListItem } from '../../helpers/api/list_items';

const Lists = props => {
  
  const { loading, error, data, refetch } = useQuery(GROCERY_LIST_QUERY);
  
  const [selectedIndex, setSelectedIndex] = useState(0);

  const styles = StyleSheet.create({
    titleContainer: {
      marginBottom: 40,
      marginTop: 30
    },
    splitContainer: {
      width: '100%',
      height: '70vh',
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      border: '1px solid #d5d5d5',
    },
    leftContainer:{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid #d5d5d5'
    },
    rightContainer: {
      flex: 2,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#fbfafa'
    }
  });

  useEffect(() => {
    refetch();
  }, [])

  useEffect(() => {
    console.log('Sindex', selectedIndex)
    if (data && selectedIndex >= data.grocery_lists.length) {
      console.log("data.lists.length", data.grocery_lists.length);
      console.log("calculated index", data.grocery_lists.length - 1);
      setSelectedIndex(data.grocery_lists.length - 1);
      console.log('sIndex', selectedIndex);
    }
  }, [data])

  const onListClick = index => {
    setSelectedIndex(index);
  }

  const onListItemCheck = async (item, checked) => {
    await toggleListItem(data.grocery_lists[selectedIndex].grocery_list_id, item.list_item_id);
    refetch();
  }

  if (!loading) {
    if (error) {
      message.error("Unable to fetch meals");
    }
    return (
      <Container>
        <div className={css(styles.titleContainer)}>
          <h3>Grocery Lists</h3>
        </div>
        {/* <hr style={{marginBottom: 30}}/> */}
        <div className={css(styles.splitContainer)}>
          <div className={css(styles.leftContainer)}>
            <AllLists lists={data.grocery_lists} selectedList={selectedIndex} onListClick={onListClick} refetch={refetch}/>
          </div>
          <div className={css(styles.rightContainer)}>
            {
              data.grocery_lists.length > 0 && (
                <GroceryList list={data.grocery_lists[selectedIndex]} />
              )
            }
          </div>
        </div>
      </Container>
    );
  } else {
    return (
      <Loader overlay={false} hasHeader={true} />
    )
  }
}

export default Lists;