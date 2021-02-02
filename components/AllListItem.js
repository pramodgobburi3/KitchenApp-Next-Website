import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { AiOutlineMore } from 'react-icons/ai';
import { StyleSheet, css } from 'aphrodite';
import { Menu, Dropdown, Form, Input, DatePicker } from 'antd';

import { updateGroceryList, editGroceryList, deleteGroceryList } from '../helpers/api/grocery_list';
import Modal from './Modal';
const AllListItem = ({ item, index, onListClick, refetch, selected  }) => {

  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [showListOptions, setShowListOptions] = useState(false);
  const [name, setName] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setShowListOptions(true);
    }
  }, [])

  useEffect(() => {
    if (item) {
      setName(item.name);
      setStartDate(moment(item.start_date));
      setEndDate(moment(item.end_date));
    }
  }, [item])

  const styles = StyleSheet.create({
    itemContainer: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      padding: 20,
      borderBottom: '1px solid lightgray',
      backgroundColor: selected ? '#fedfe0': 'white',
      cursor: 'pointer',
    },
    dateRange: {
      marginBottom: 0,
      fontSize: 14,
      color: '#808080',
    },
    outlineMoreIcon: {
      float: 'right',
      alignSelf: 'flex-end',
      cursor: 'pointer',
      color: 'gray',
      ":hover": {
        color: 'black'
      }
    },
    menuItem: {
      ":hover": {
        backgroundColor: '#fedfe0'
      }
    }
  });

  const disabledDates = (current) => {
    const momentCurrent = moment(current);
    const today = moment().subtract(1, 'day');
    const thirtyDaysFromNow = moment().add(30, 'days');
    return !(momentCurrent.isSameOrAfter(today) && momentCurrent.isSameOrBefore(thirtyDaysFromNow))
  }

  const onUpdateListClick = () => {
    setIsUpdateModalVisible(true);
  }

  const onEditListClick = () => {
    setIsEditModalVisible(true);
  }

  const onDeleteListClick = () => {
    setIsDeleteModalVisible(true);
  }

  const onUpdateHandleOk = async () => {
    await updateGroceryList(item.grocery_list_id, startDate, endDate);
    setIsUpdateModalVisible(false);
    setStartDate(null);
    setEndDate(null);
    refetch();
  }

  const onUpdateHandleCancel = () => {
    setIsUpdateModalVisible(false);
    setStartDate(null);
    setEndDate(null);
  }

  const onEditHandleOk = async () => {
    await editGroceryList(item.grocery_list_id, name);
    setIsEditModalVisible(false);
    setName(item.name);
    refetch();
  }

  const onEditHandleCancel = () => {
    setIsEditModalVisible(false);
    setName(null);
  }

  const onDeleteHandleOk = async () => {
    await deleteGroceryList(item.grocery_list_id);
    setIsDeleteModalVisible(false);
    refetch();
  }

  const onDeleteHandleCancel = () => {
    setIsDeleteModalVisible(false);
  }

  const updateModalContent = (
    <Form>
      <Form.Item label="Start Date" >
        <DatePicker disabledDate={disabledDates} onChange={(date) => setStartDate(moment(date))} value={startDate} />
      </Form.Item>
      <Form.Item label="End Date" >
      <DatePicker disabledDate={disabledDates} onChange={(date) => setEndDate(moment(date))} value={endDate} />
      </Form.Item>
    </Form>
  );

  const editModalContent = (
    <Form 
      layout="horizontal"
    >
      <Form.Item 
        label="List Name"
        name="listName"
      >
        <Input placeholder='List Name' defaultValue={name} value={name} onChange={e => setName(e.target.value)} />
      </Form.Item>
    </Form>
  );

  const deleteModalContent = (
    <p>Are you sure you want to delete this list and it's contents?</p>
  );

  const menu = (
    <Menu>
      { item.type == 'generated' && (
        <Menu.Item className={css(styles.menuItem)} onClick={onUpdateListClick}>
          Update List Range
        </Menu.Item>
      )}
      <Menu.Item className={css(styles.menuItem)} onClick={onEditListClick}>
        Rename
      </Menu.Item>
      <Menu.Item className={css(styles.menuItem)} onClick={onDeleteListClick}>
        Delete List
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={css(styles.itemContainer)} onClick={() => onListClick(index)}>
      { showListOptions && (
        <Dropdown overlay={menu} arrow={true} placement={'topCenter'} trigger={'click'}>
          <AiOutlineMore className={css(styles.outlineMoreIcon)} size={20} />
        </Dropdown>
      )}
      <p>{item.name}</p>   
      <p className={css(styles.dateRange)}>{
        moment(item.start_date).format('MMM D') + " - " + moment(item.end_date).format('MMM D')} </p>
      <Modal title={'Update List Range'} content={updateModalContent} isVisible={isUpdateModalVisible} onOk={onUpdateHandleOk} onCancel={onUpdateHandleCancel} />
      <Modal title={'Rename List'} content={editModalContent} isVisible={isEditModalVisible} onOk={onEditHandleOk} onCancel={onEditHandleCancel} />
      <Modal title={'Delete List'} content={deleteModalContent} isVisible={isDeleteModalVisible} onOk={onDeleteHandleOk} onCancel={onDeleteHandleCancel} />
    </div>
  );
}

export default AllListItem;