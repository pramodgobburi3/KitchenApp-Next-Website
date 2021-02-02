import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import GroceryListItem from './GroceryListItem';
import { BsPlus } from 'react-icons/bs';
import { Form, Input, InputNumber } from 'antd';

import Modal from './Modal';
import { createListItem } from '../helpers/api/list_items';


const GroceryList = ({ list, onListItemCheck, refetch }) => {

  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [itemName, setItemName] = useState(null);
  const [itemQuantity, setItemQuantity] = useState(null);
  const [itemUnit, setItemUnit] = useState(null);
  const [itemNote, setItemNote] = useState(null);

  useEffect(() => {
    console.log('list', list);
  }, [list])
  
  const createItemForm = (
    <Form>
      <Form.Item label="Name">
        <Input placeholder='Item Name' value={itemName} onChange={ e => setItemName(e.target.value)} />
      </Form.Item>
      <Form.Item label="Quantity">
        <InputNumber defaultValue='1' min='.1' step={'.1'} value={itemQuantity} onChange={ qty => setItemQuantity(qty)} />
      </Form.Item>
      <Form.Item label="Unit">
        <Input placeholder='Unit' value={itemUnit} onChange={ e => setItemUnit(e.target.value)} />
      </Form.Item>
      <Form.Item label="Note">
        <Input placeholder='Note' value={itemNote} onChange={ e => setItemNote(e.target.value)} />
      </Form.Item>
    </Form>
  );

  const onCreateItemClick = () => {
    setIsCreateModalVisible(true);
  }

  const onCreateItemHandleOk = async () => {
    await createListItem(list.grocery_list_id, itemQuantity, itemUnit, itemName, itemNote);
    setIsCreateModalVisible(false);
    setItemName(null);
    setItemQuantity(null);
    setItemUnit(null);
    setItemNote(null);
    refetch();    
  }

  const onCreateItemHandleCancel = () => {
    setIsCreateModalVisible(false);
    setItemName(null);
    setItemQuantity(null);
    setItemUnit(null);
    setItemNote(null);
  }
  
  const styles = StyleSheet.create({
    mainContainer: {
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
    },
    header: {
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'white',
      padding: 20,
      borderBottom: '1px solid lightgray'
    },
    listNameTxt: {
      marginBottom: 0,
      color: 'red',
      fontSize: 18,
    },
    listContainer: {
      height: 'calc(100%-40px)',
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: 40,
      paddingRight: 40,
      paddingTop: 20,
      // marginBottom: 20
    },
    roundedIcon: {
      width: 35,
      height: 35,
      backgroundColor: 'white',
      marginRight: 10,
      borderRadius: 40,
      color: 'red',
      display:'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      ":hover": {
        backgroundColor: 'red',
        color: 'white',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
      }
    }
  });

  return (
    (list ? <div className={css(styles.mainContainer)}>
      <div className={css(styles.header)}>
        <p className={css(styles.listNameTxt)}>{list.name}</p>
        <div>
          <div className={css(styles.roundedIcon)} onClick={onCreateItemClick}>
            <BsPlus size={30} />
          </div>
        </div>
      </div>
      <div className={css(styles.listContainer)}>
        {
          list.items.map((item, i) => (
            <GroceryListItem key={'list_item_' + i} listId={list.grocery_list_id} item={item} onCheck={onListItemCheck} />
          ))
        }
      </div>
      <Modal title={'Create Item'} content={createItemForm} isVisible={isCreateModalVisible} onOk={onCreateItemHandleOk} onCancel={onCreateItemHandleCancel} />
    </div>: null)
  )
}

export default GroceryList;