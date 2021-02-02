import React from "react";
import { Droppable } from "react-beautiful-dnd";
import moment from 'moment';

import '../assets/css/calendar.css';
import CalendarMealItem from "./CalendarMealItem";

const DroppableCalendarCell = ({formattedDate, day, meals, onClick}) => {
  return (
    <Droppable droppableId={moment(day).utc().toISOString()} key={moment(day).utc().toISOString()}>
      {(provided, snapshot) => {
        return (
          <div 
            className={`column cell ${moment(day).isSame(moment(), 'day')
            ? "selected" : "" }`} 
            key={day}
            ref={provided.innerRef} 
            {...provided.droppableProps}
            > 
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', marginTop: 20, paddingBottom: 20}}>
              {
                meals.map((meal, index) => {
                  if (moment(meal.date).utc().isSame(moment(day).utc(), 'date')) {
                    return <CalendarMealItem meal={meal} color="pink" index={index} onClick={onClick} />;
                  }
                })
              }
            </div>
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  )
};

export default DroppableCalendarCell;