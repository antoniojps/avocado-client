import React, { Component } from 'react'
import { BasePage } from 'ui'
import Calendar from './Calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'

export default class PageCalendar extends Component {
  render() {
    return (
      <BasePage
        page={{ title: 'Calendar' }}
      >
        <>
          <Calendar events={[
            {
              id: 0,
              title: 'All Day Event very long title',
              allDay: false,
              start: new Date(2019, 2, 5),
              end: new Date(2019, 2, 7),
              tooltipAccessor: <div>Hello world</div>,
              allDayAccessor: false,
            },
            {
              id: 1,
              title: 'Long Event',
              start: new Date(2019, 3, 7),
              end: new Date(2019, 3, 10),
              tooltipAccessor: <div>Hello world</div>,
              allDayAccessor: false,
            },

            {
              id: 2,
              title: 'DTS STARTS',
              start: new Date(2019, 2, 13, 0, 0, 0),
              end: new Date(2019, 2, 20, 0, 0, 0),
              tooltipAccessor: <div>Hello world</div>,
              allDayAccessor: false,
            },

            {
              id: 3,
              title: 'DTS ENDS',
              start: new Date(2019, 10, 6, 0, 0, 0),
              end: new Date(2019, 10, 13, 0, 0, 0),
              tooltipAccessor: <div>Hello world</div>,
              allDayAccessor: false,
            },
          ]}
          />
        </>
      </BasePage>
    )
  }
}
