import React, { useEffect, useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Input, Popover, DatePicker } from 'antd';
import { HiOutlineSearch } from 'react-icons/hi';
import { BsPlus } from 'react-icons/bs';
import moment from 'moment';
import AllListItem from './AllListItem';

import { createGroceryList, generateGroceryList } from '../helpers/api/grocery_list';

const AllLists = ({ lists, selectedList, onListClick, refetch }) => {
  const [shownLists, setShownLists] = useState(lists);
  const [search, setSearch] = useState('');
  const [listName, setListName] = useState(null);
  const [showCreatePopover, setShowCreatePopover] = useState(false);
  const [showGeneratePopover, setShowGeneratePopover] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      // TODO: show/hide based on accessToken
    }
  })

  useEffect(() => {
    setShownLists(lists)
  }, [lists])

  useEffect(() => {
    if (search != '') {
      let matchingList = [];
      matchingList.push(lists[selectedList]);
      lists.map(item => {
        if (item.name.toLowerCase().includes(search.toLowerCase())) {
          matchingList.push(item);
        }
      });
      setShownLists(matchingList);
    } else {
      setShownLists(lists);
    }
  }, [search]);

  const disabledDates = (current) => {
    const momentCurrent = moment(current);
    const today = moment().subtract(1, 'day');
    const thirtyDaysFromNow = moment().add(30, 'days');
    return !(momentCurrent.isSameOrAfter(today) && momentCurrent.isSameOrBefore(thirtyDaysFromNow))
  }

  const createCustomList = async () => {
    console.log('createCustomList');
    await createGroceryList(listName, []);
    setListName(null);
    setShowCreatePopover(false);
    refetch();
  }

  const createGeneratedList = async() => {
    console.log('createGeneratedList');
    await generateGroceryList(startDate, endDate);
    setStartDate(null);
    setEndDate(null);
    setShowGeneratePopover(false);
    refetch();
  }

  const createListContent = () => (    
    <div getPopupContainer={trigger => trigger.parentElement} style={{display: 'flex', flexDirection: 'column'}}>
      <p class={css(styles.popoverFromHeading)}>Name*</p>
      <Input placeholder="Blank List" style={{marginBottom: 10}} value={listName} onChange={e => setListName(e.target.value)} />
      <input className={css(styles.popoverCreateBtn)} type="submit" value="Create" onClick={createCustomList}/>
    </div>
  );

  const generateListContent = () => (
    <div getPopupContainer={trigger => trigger.parentElement} style={{display: 'flex', flexDirection: 'column'}}>
      <p class={css(styles.popoverFromHeading)}>Start Date*</p>
      <DatePicker disabledDate={disabledDates} style={{marginBottom: 10}} getPopupContainer={trigger => trigger.parentElement} onChange={(date) => setStartDate(moment(date))} value={startDate} />
      <p class={css(styles.popoverFromHeading)}>End Date*</p>
      <DatePicker disabledDate={disabledDates} style={{marginBottom: 10}} getPopupContainer={trigger => trigger.parentElement} onChange={(date) => setEndDate(moment(date))} value={endDate} />
      <input className={css(styles.popoverCreateBtn)} type="submit" value="Create" onClick={createGeneratedList}/>
    </div>
  )

  return (
    <div className={css(styles.mainContainer)}>
      <div className={css(styles.header)}>
        <div className={css(styles.searchContainer)}>
            <span style={{marginRight: 10}}><HiOutlineSearch /></span>
            <form>
              <input type="text" placeholder="Search Lists" style={{border: 'none', outline: 'none', width: '100%'}} onChange={e => setSearch(e.target.value)} />
            </form>
          </div>
      </div>
      <div className={css(styles.allListContainer)}>
        {
          shownLists.map((list, index) => (
            <AllListItem key={'all_list_item_' + index} item={list} index={index} selected={index === selectedList} onListClick={onListClick} refetch={refetch} />
          ))
        }
      </div>
      <div className={css(styles.footer)}>
          <Popover visible={showCreatePopover} placement="topRight" content={createListContent()} title={"Create Blank List"} getPopupContainer={trigger => trigger.parentElement}>
            <div className={css(styles.footerContainer)} onClick={() => setShowCreatePopover(!showCreatePopover)} > 
              <span style={{display: 'flex', alignItems: 'center'}}>
                <BsPlus size={25} style={{marginRight: 5}} /> Blank List
              </span>
            </div>
          </Popover>
          <Popover visible={showGeneratePopover} placement="topRight" content={generateListContent()} title={"Generate List"} getPopupContainer={trigger => trigger.parentElement}>
            <div className={css(styles.footerContainer)} onClick={() => setShowGeneratePopover(!showGeneratePopover)}>
              <span style={{display: 'flex', alignItems: 'center'}}>
                <BsPlus size={25} style={{marginRight: 5}} /> Generated List
              </span>
            </div>
          </Popover>
      </div>
    </div>
  )
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
      padding: 15,
      // borderBottom: '1px solid lightgray'
    },
    searchContainer: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: 'white',
      width: '100%',
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 15,
      border: '1px solid lightgray',
      ":focus-within": {
        border: '1px solid red',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
      }
    },
    allListContainer: {
      height: '100%',
      overflow: 'auto'
    },
    footer: {
      display: 'flex',
      height: 50,
      flexDirection: 'row',
    },
    footerContainer: {
      display: 'flex',
      flex: 1,
      color: 'red',
      alignItems: 'center',
      cursor: 'pointer',
      justifyContent: 'center',
      ":hover": {
        backgroundColor: 'red',
        color: 'white'
      }
    },
    popoverFromHeading: {
      fontSize: 14,
      marginBottom: 5,
    },
    popoverCreateBtn: {
      backgroundColor: '#F43445',
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 20,
      paddingRight: 20,
      borderRadius: 20,
      border: 'none',
      outline: 'none',
      marginTop: 10,
      color: 'white',
      fontWeight: 'bold',
      boxShadow: '0 0 25px rgba(0, 0, 0, 0.1)',
    }
  });

export default AllLists;