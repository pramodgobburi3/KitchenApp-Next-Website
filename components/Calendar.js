import React, { useState } from 'react';
import moment from 'moment';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { message } from 'antd';

import '../assets/css/calendar.css';

import CalendarMealItem from './CalendarMealItem';
import DroppableCalendarCell from './DroppableCalendarCell';

const Calendar = ({ meals, onClick, onDrag }) => {
  const [currentDate, setCurrentDate] = useState(moment());

  const nextMonth = () => {
    setCurrentDate(moment(currentDate).add(1, 'week'));
  }
  const prevMonth = () => {
    setCurrentDate(moment(currentDate).subtract(1, 'week'));
  }

  const header = () => {
    const dateFormat = "MM";
    let startWeek = moment(currentDate).startOf('week');
    let endWeek = moment(currentDate).endOf('week');
    return (
       <div className="header row flex-middle">
          <div className="column col-start">
              <div className="icon" onClick={prevMonth}>
                chevron_left
              </div>
          </div>
          <div className="column col-center">
            <span>{startWeek.format("MMM") + " " + startWeek.format("D")}</span>
            <span> - </span>
            <span>{startWeek.get('month') != endWeek.get('month') ? (endWeek.format("MMM") + " " + endWeek.format("D")) :
            endWeek.format("Do")}</span>
          </div>
          <div className="column col-end">
              <div className="icon" onClick={nextMonth}>
                chevron_right
              </div>
          </div>
      </div>
    );
  };

  const cells = () => {
    const startDate = moment(currentDate).startOf('week');
    const endDate = moment(currentDate).endOf('week');
    const dateFormat = "D";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
       for (let i = 0; i < 7; i++) {
        formattedDate = moment(day).format("ddd") + " " + moment(day).format(dateFormat);
        const cloneDay = day;   
        days.push(
          <DroppableCalendarCell day={day} formattedDate={formattedDate} meals={meals} onClick={onClick} />
          );
        day = moment(day).add(1, 'day');
      }
      rows.push(
        <div className="row" key={day}> {days} </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;
    onDrag(source, destination, draggableId);
  }

  return (
    <div className="calendar">
      <div>{header()}</div>     
      <DragDropContext onDragEnd={onDragEnd}>
        <div>{cells()}</div>
      </DragDropContext>   
    </div>
  )
};

export default Calendar;
