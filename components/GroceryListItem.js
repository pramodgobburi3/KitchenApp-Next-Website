import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { BsPencil } from 'react-icons/bs';
import { Form, Input, InputNumber } from 'antd';
import Modal from './Modal';

import { updateListItem } from '../helpers/api/list_items';

const GroceryListItem = ({listId, item,  onCheck}) => {

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [itemName, setItemName] = useState(null);
  const [itemQuantity, setItemQuantity] = useState(null);
  const [itemUnit, setItemUnit] = useState(null);
  const [itemNote, setItemNote] = useState(null);

  useEffect(() => {
    if (item) {
      setItemName(item.name);
      setItemQuantity(item.quantity);
      setItemUnit(item.unit);
      setItemNote(item.note);
    }
  }, [item])

  const styles = StyleSheet.create({
    itemContainer: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: 'white',
      alignItems: 'center',
      width: 'calc(100%-20px)',
      padding: 20,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 10,
      borderRadius: 10,
    },
    itemTxt: {
      marginBottom: 0,
      marginLeft: 10,
      textDecoration: item.is_fulfilled ? 'line-through' : 'none'
    }
  });

  const editItemForm = (
    <Form>
      <Form.Item label="Name">
        <Input placeholder='Item Name' value={itemName} onChange={ e => setItemName(e.target.value)} />
      </Form.Item>
      <Form.Item label="Quantity">
        <InputNumber defaultValue='1' min='.1' step={'.1'} value={itemQuantity} onChange={ qty => setItemQuantity(wty)} />
      </Form.Item>
      <Form.Item label="Unit">
        <Input placeholder='Unit' value={itemUnit} onChange={ e => setItemUnit(e.target.value)} />
      </Form.Item>
      <Form.Item label="Note">
        <Input placeholder='Note' value={itemNote} onChange={ e => setItemNote(e.target.value)} />
      </Form.Item>
    </Form>
  );

  const onEditItemClick = () => {
    setIsEditModalVisible(true);
  }

  const onEditItemHandleOk = async () => {
    await updateListItem(listId, item.list_item_id, itemQuantity, itemUnit, itemName, itemNote);
    setIsEditModalVisible(false);
    // TODO: refetch();
  }

  const onEditItemHandleCancel = () => {
    setIsEditModalVisible(false);
    setItemName(item.name);
    setItemQuantity(item.quantity);
    setItemUnit(item.unit);
    setItemNote(item.note);
  }

  return (
    <div className={css(styles.itemContainer)}>
      <Checkbox defaultChecked={item.is_fulfilled} onChange={(e) => onCheck(item, e.target.checked)} />
      <p className={css(styles.itemTxt)}>{item.quantity}</p>
      <p className={css(styles.itemTxt)}>{item.unit}</p>
      <p className={css(styles.itemTxt)}>{item.name}</p>
      <div style={{marginLeft: 20}}>
        <BsPencil style={{marginRight: 20, cursor: 'pointer'}} onClick={onEditItemClick}/>
      </div>
      <Modal title={'Edit Item'} content={editItemForm} isVisible={isEditModalVisible} onOk={onEditItemHandleOk} onCancel={onEditItemHandleCancel} />
    </div>
  )
}

export default GroceryListItem;