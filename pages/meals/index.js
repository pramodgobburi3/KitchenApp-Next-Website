import React, { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";
import { Container } from 'reactstrap';
import { BsCalendar, BsViewList } from 'react-icons/bs'
import Calendar from "../../components/Calendar";
import { message } from "antd";
import { useRouter } from "next/router";
import { getTokenType } from '../../helpers/auth';
import Loader from "../../components/Loader";
import { Form, Input } from 'antd';

import { MEALS_QUERY } from '../../gql/queries/meals';
import { useQuery } from "@apollo/client";

import { moveMeal, editMeal } from '../../helpers/api/meal';
import Modal from '../../components/Modal';

const Meals = props => {
  const router = useRouter();

  const { loading, error, data, refetch:refetchMeals } = useQuery(MEALS_QUERY);
  const [ isEditModalVisible, setIsEditModalVisible ] = useState(null);
  const [ meal, setMeal ] = useState(null);
  const [ mealName, setMealName ] = useState(null);

  useEffect(() => {
    refetchMeals()
  }, [])

  useEffect(() => {
    if (!localStorage.getItem('accessToken') || getTokenType() === 'client') {
      localStorage.setItem('redirectUr', '/meals');
      router.push('/login');
    }
  })

  const onEditHandleOk = async () => {
    await editMeal(meal.meal_id, mealName);
    setIsEditModalVisible(false);
    setMealName(null);
    setMeal(null);
    refetchMeals();
  }

  const onEditHandleCancel = () => {
    setIsEditModalVisible(false);
    setMealName(null);
    setMeal(null);
  }

  const onMealClick = m => {
    setMealName(m.name);
    setMeal(m);
    setIsEditModalVisible(true);
  }

  const onMealDragged = async (source, destination, mealId) => {
    if (destination != null && source != null) {
      if (destination.droppableId != source.droppableId) {
        await moveMeal(mealId, destination.droppableId);
      }
    }
    refetchMeals()
  }

  const editModalContent = (
    <Form layout="horizontal">
      <Form.Item 
        label="Meal Name"
        name="mealName"
      >
        <Input placeholder='Meal Name' defaultValue={mealName} value={mealName} onChange={e => setMealName(e.target.value)} />
      </Form.Item>
    </Form>
  );

  if (!loading) {
    if (error) {
      message.error("Unable to fetch meals");
    }
    return (
      <Container>
        <div className={css(styles.titleContainer)}>
          <h3>Meal Planner</h3>
          {/* <div className={css(styles.rightContainer)}>
            <div onClick={() => setActiveTab('calendar')} className={activeTab === 'calendar' ? css(styles.roundedIconActive) : css(styles.roundedIcon)}>
              <BsCalendar size={20} />
            </div>
            <div onClick={() => setActiveTab('list')} className={activeTab === 'list' ? css(styles.roundedIconActive) : css(styles.roundedIcon)}>
              <BsViewList size={22} />
            </div>
          </div> */}
        </div>
        {/* <hr style={{marginBottom: 30}}/> */}
        <Calendar meals={data.meals} onClick={onMealClick} onDrag={onMealDragged} />
        <Modal title={'Rename Meal'} content={editModalContent} isVisible={isEditModalVisible} onOk={onEditHandleOk} onCancel={onEditHandleCancel} />
      </Container>
    )
  } else {
    return (
      <Loader overlay={false} hasHeader={true} />
    )
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 30
  },
  cardContainer: {
    display: 'grid',
    justifyContent: 'center',
    gridTemplateColumns: 'repeat( auto-fit, minmax(250px, max-content) )',
    rowGap: '10px',
    columnGap: '30px'
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  },
  roundedIcon: {
    padding: 10,
    backgroundColor: 'white',
    marginRight: 10,
    borderRadius: 40,
    color: 'pink',
    cursor: 'pointer',
    ":hover": {
      backgroundColor: 'red',
      color: 'white',
      boxShadow: '0 0 25px rgba(0, 0, 0, 0.2)',
    }
  },
  roundedIconActive: {
    padding: 10,
    backgroundColor: 'white',
    marginRight: 10,
    borderRadius: 40,
    color: 'red',
    cursor: 'pointer',
    // ":hover": {
    //   backgroundColor: 'red',
    //   color: 'white',
    //   boxShadow: '0 0 25px rgba(0, 0, 0, 0.2)',
    // }
  }
});

export default Meals;