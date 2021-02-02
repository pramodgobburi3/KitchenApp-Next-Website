import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Draggable } from 'react-beautiful-dnd';
import {AiOutlineInfoCircle} from 'react-icons/ai';
import { message } from 'antd';

const CalendarMealItem = ({ meal, color, index, onClick }) => {
  const styles = StyleSheet.create({
    meal: {
      paddingTop: 20,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 20,
      margin: 10,
      cursor: 'grab',
      borderRadius: 20,
      zIndex: 200,
      display: 'flex',
      backgroundColor: color,
      ":hover": {
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)'
      }
    },
    topRight: {
      justifyContent: 'center',
      alignSelf: 'center',
      marginRight: 10,
      cursor: 'pointer'
    }
  })

  return (
    <Draggable draggableId={meal.meal_id} index={index} disableInteractiveElementBlocking={false}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps} 
          className={css(styles.meal)}>
          <div className={css(styles.topRight)} onClick={() => onClick(meal)}>
            <AiOutlineInfoCircle size={25}/>
          </div>
          {meal.name}
        </div>
      )}
    </Draggable>
  )
};



export default CalendarMealItem;