import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import { BaseLoading } from 'ui/BaseLoader'
import { BaseModal } from 'ui'
import styled, { withTheme } from 'styled-components'
import {
  Button, Subtitle, Tag, Icon,
} from 'elements'
import { fetchEvents, fetchDataAddEvent } from 'utilities/requests'
import { toast, above } from 'utilities'
import withSizes from 'react-sizes'
import { transparentize } from 'polished'
import AddEventForm from './AddEventForm'

const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

class Calendar extends Component {
  isComponentMounted = false

  state = {
    events: [],
    isLoading: true,
    activeTab: !this.props.isMobile ? 'week' : 'day',
    modalAddOpen: false,
    addStart: null,
    addEnd: null,
    currentMonth: null,
    dataAdd: null,
    selectedEvent: null,
  }

  async componentDidMount() {
    this.isComponentMounted = true
    const start = moment().startOf('month').subtract(10, 'days').unix() // current begin of week timestampt
    const end = moment().endOf('month').add(10, 'days').unix() // current end of week timestampt
    const currentMonth = moment().format('M')
    let events = []
    let dataAdd

    try {
      const { data: { data } } = await fetchEvents({ start, end })
      events = data
      const { data: addData } = await fetchDataAddEvent()
      dataAdd = addData

      events = events.map(event => (
        {
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }
      ))
    } catch (e) {
      toast.error('Error fetching events')
    }
    if (this.isComponentMounted) {
      this.setState({
        events,
        isLoading: false,
        currentMonth,
        dataAdd,
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isMobile !== this.props.isMobile) {
      if (nextProps.isMobile) {
        this.setState({ activeTab: 'day' })
      }
    }
  }

  componentWillUnmount = () => {
    this.isComponentMounted = false
  }


  onNavigate = async (e) => {
    const { currentMonth } = this.state
    if (moment(e).format('M') !== currentMonth) {
      const start = moment(e).startOf('month').subtract(10, 'days').unix() // current begin of week timestampt
      const end = moment(e).endOf('month').add(10, 'days').unix()
      this.setState({ isLoading: true })
      let events
      try {
        const { data: { data } } = await fetchEvents({ start, end })
        events = data
      } catch (e) {
        toast.error('Error fetching events')
      }

      events = events.map(event => (
        {
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }
      ))
      if (this.isComponentMounted) {
        this.setState({
          currentMonth,
          events,
          isLoading: false,
        })
      }
    }
  }

  getCurrent = context => {
    const { activeTab } = this.state
    return activeTab === context ? ['primary', 'leftMargin'] : 'leftMargin'
  }

  getCustomBar = ({ label, onNavigate }) => (
    <>
      <Header>
        {!this.props.isMobile && (
          <div>
            <Button modifiers={this.getCurrent('month')} onClick={() => this.setState({ activeTab: 'month' })}>Month</Button>
            <Button modifiers={this.getCurrent('week')} onClick={() => this.setState({ activeTab: 'week' })}>Week</Button>
            <Button modifiers={this.getCurrent('day')} onClick={() => this.setState({ activeTab: 'day' })}>Day</Button>
          </div>
        )}
        <Subtitle>{label}</Subtitle>
        <div>
          <Button onClick={() => onNavigate('PREV')}>
            <Icon icon="baselineArrowBack" height={12} />
            {' '}
            Back
          </Button>
          <Button modifiers="leftMargin" onClick={() => onNavigate('TODAY')}>
            Today
          </Button>
          <Button modifiers="leftMargin" onClick={() => onNavigate('NEXT')}>
            Next
            {' '}
            <Icon icon="baselineArrowForward" height={12} />
          </Button>
        </div>
      </Header>
    </>
  )


  handleSelect = ({ start, end }) => {
    this.setState({ addStart: start, addEnd: end }, () => this.toggleModal())
  }

  toggleModal = (e) => {
    const { modalAddOpen } = this.state;
    if (e && e.id) {
      this.setState({
        selectedEvent: e, addStart: e.start, addEnd: e.end, modalAddOpen: !modalAddOpen,
      })
    } else {
      this.setState({ selectedEvent: null, modalAddOpen: !modalAddOpen })
    }
  }

  onSubmit = ({ data }, isEdit) => {
    this.toggleModal()
    const { events } = this.state
    if (isEdit) {
      this.setState({
        events: events.map(ev => (ev.id === data.id ? {
          ...data,
          start: new Date(data.start.date),
          end: new Date(data.end.date),
        } : ev)),
      })
    } else {
      this.setState({
        events: [...events, {
          ...data,
          start: new Date(data.start.date),
          end: new Date(data.end.date),
        }],
      })
    }
  }

  onDelete = eventId => {
    const { events } = this.state
    this.setState({
      events: events.filter(({ id }) => eventId !== id),
    })
    this.toggleModal()
  }

  renderTags = () => {
    const { theme } = this.props
    return (
      <Legend>
        <Tag color={theme.color.bgPrimary}>Yours</Tag>
        <Tag color={theme.color.bg} modifiers="calendar">Team</Tag>
        <Tag>Today</Tag>
      </Legend>
    )
  }

  render() {
    const {
      isLoading, events, activeTab, modalAddOpen, addStart, addEnd, dataAdd, selectedEvent,
    } = this.state
    const { theme, className } = this.props
    return (
      <>
        <BaseModal isOn={modalAddOpen} toggle={this.toggleModal}>
          <AddEventForm
            onDelete={this.onDelete}
            onSubmit={this.onSubmit}
            selectedEvent={selectedEvent}
            {...{
              addStart, addEnd, onChange: this.onChange, isLoading, selectData: dataAdd,
            }}
          />
        </BaseModal>
        {this.renderTags()}
        <div style={{ position: 'relative', height: activeTab === 'month' ? '900px' : '100%' }}>
          {isLoading && <Loader width="50%" height="50%" color={theme.color.primary} />}
          <BigCalendar
            className={className}
            selectable
            localizer={localizer}
            events={events}
            tooltipAccessor={() => null}
            defaultView={activeTab}
            onNavigate={this.onNavigate}
            view={activeTab}
            scrollToTime={new Date(1970, 1, 1, 6)}
            onSelectEvent={this.toggleModal}
            step={30}
            onSelectSlot={this.handleSelect}
            components={{
              toolbar: this.getCustomBar,
            }}
            eventPropGetter={
              (event) => {
                const newStyle = {
                  background: this.props.theme.color.bg,
                  color: this.props.theme.calendar.eventColor,
                  borderRadius: this.props.theme.value.borderRadius,
                  border: `2px solid ${this.props.theme.color.bgLighter}`,
                }
                if (event.mine) {
                  newStyle.color = this.props.theme.calendar.eventOwnColor
                  newStyle.backgroundColor = this.props.theme.color.bgPrimary
                }
                return {
                  className: '',
                  style: newStyle,
                }
              }
            }
          />
        </div>
      </>

    )
  }
}

const Loader = styled(BaseLoading)`
    z-index: 9999;
    position: absolute;
`
const mapSizesToProps = ({ width }) => ({
  isMobile: width < 710,
})

const Legend = styled.div`
  width: 100%;
  display: flex;
  justify-content: initial;
  margin-bottom: ${props => props.theme.spacing.xs};
  ${above.md`
   justify-content: flex-end;
  `}
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  ${above.md`
    flex-direction: row;
  `}
`

const StyledCalendar = styled(Calendar)`
  color: ${props => props.theme.color.base};
  .rbc-btn {
  color: inherit;
  font: inherit;
  margin: 0;
}
button.rbc-btn {
  overflow: visible;
  text-transform: none;
  -webkit-appearance: button;
  cursor: pointer;
}
button[disabled].rbc-btn {
  cursor: not-allowed;
}
button.rbc-input::-moz-focus-inner {
  border: 0;
  padding: 0;
}
.rbc-calendar {
  box-sizing: border-box;
  height: 100%;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-align-items: stretch;
      -ms-flex-align: stretch;
          align-items: stretch;
}
.rbc-calendar *,
.rbc-calendar *:before,
.rbc-calendar *:after {
  box-sizing: inherit;
}
.rbc-abs-full,
.rbc-row-bg {
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.rbc-ellipsis,
.rbc-event-label,
.rbc-row-segment .rbc-event-content,
.rbc-show-more {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rbc-rtl {
  direction: rtl;
}
.rbc-off-range {
  color: ${props => props.theme.calendar.offRangeColor};
}
.rbc-off-range-bg {
  background: ${props => props.theme.calendar.offRangeBg};
}
.rbc-header {
  overflow: hidden;
  -webkit-flex: 1 0 0%;
      -ms-flex: 1 0 0%;
          flex: 1 0 0%;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 3px;
  text-align: center;
  vertical-align: middle;
  font-weight: bold !important;
  font-size: 90%;
  min-height: 0;
  border-bottom: 1px solid ${props => props.theme.color.border};
}
.rbc-header + .rbc-header {
  border-left: 1px solid ${props => props.theme.color.border};
}
.rbc-rtl .rbc-header + .rbc-header {
  border-left-width: 0;
  border-right: 1px solid ${props => props.theme.color.border};
}
.rbc-header > a,
.rbc-header > a:active,
.rbc-header > a:visited {
  text-decoration: none;
}
.rbc-row-content {
  position: relative;
  -moz-user-select: none;
   -ms-user-select: none;
       user-select: none;
  -webkit-user-select: none;
  z-index: 4;
}
.rbc-today {
  background-color: ${props => transparentize(0.9, props.theme.color.blue)};
}
.rbc-toolbar {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-wrap: wrap;
      -ms-flex-wrap: wrap;
          flex-wrap: wrap;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  margin-bottom: 10px;
  font-size: 16px;
}
.rbc-toolbar .rbc-toolbar-label {
  -webkit-flex-grow: 1;
      -ms-flex-positive: 1;
          flex-grow: 1;
  padding: 0 10px;
  text-align: center;
}
.rbc-toolbar button {
  color: ${props => props.theme.color.base};
  display: inline-block;
  margin: 0;
  text-align: center;
  vertical-align: middle;
  background: none;
  background-image: none;
  border: 1px solid ${props => props.theme.color.border};
  padding: .375rem 1rem;
  border-radius: 4px;
  line-height: normal;
  white-space: nowrap;
}
.rbc-toolbar button:active,
.rbc-toolbar button.rbc-active {
  background-image: none;
  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  background-color: #e6e6e6;
  border-color: ${props => props.theme.color.border};
}
.rbc-toolbar button:active:hover,
.rbc-toolbar button.rbc-active:hover,
.rbc-toolbar button:active:focus,
.rbc-toolbar button.rbc-active:focus {
  color: ${props => props.theme.color.base};
  background-color: #d4d4d4;
  border-color: #8c8c8c;
}
.rbc-toolbar button:focus {
  color: ${props => props.theme.color.base};
  background-color: #e6e6e6;
  border-color: #adadad;
}
.rbc-toolbar button:hover {
  color: ${props => props.theme.color.base};
  background-color: #e6e6e6;
  border-color: #adadad;
}
.rbc-btn-group {
  display: inline-block;
  white-space: nowrap;
}
.rbc-btn-group > button:first-child:not(:last-child) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.rbc-btn-group > button:last-child:not(:first-child) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.rbc-rtl .rbc-btn-group > button:first-child:not(:last-child) {
  border-radius: 4px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.rbc-rtl .rbc-btn-group > button:last-child:not(:first-child) {
  border-radius: 4px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.rbc-btn-group > button:not(:first-child):not(:last-child) {
  border-radius: 0;
}
.rbc-btn-group button + button {
  margin-left: -1px;
}
.rbc-rtl .rbc-btn-group button + button {
  margin-left: 0;
  margin-right: -1px;
}
.rbc-btn-group + .rbc-btn-group,
.rbc-btn-group + button {
  margin-left: 10px;
}
.rbc-event {
  border: none;
  box-shadow: none;
  margin: 0;
  padding: 2px 5px;
  background-color: #3174ad;
  border-radius: 5px;
  color: ${props => props.theme.baseInverse};
  cursor: pointer;
  width: 100%;
  text-align: left;
}
.rbc-slot-selecting .rbc-event {
  cursor: inherit;
  pointer-events: none;
}
.rbc-event.rbc-selected {
  background-color: ${props => props.theme.color.bgPrimary};
}
.rbc-event:focus {
  outline: 5px auto ${props => props.theme.color.primary};
}
.rbc-event-label {
  font-size: 80%;
}
.rbc-event-overlaps {
  box-shadow: -1px 1px 5px 0px rgba(51, 51, 51, 0.5);
}
.rbc-event-continues-prior {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.rbc-event-continues-after {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.rbc-event-continues-earlier {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.rbc-event-continues-later {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.rbc-row {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: row;
      -ms-flex-direction: row;
          flex-direction: row;
}
.rbc-row-segment {
  padding: 0 1px 1px 1px;
}
.rbc-selected-cell {
  background-color: rgba(0, 0, 0, 0.1);
}
.rbc-show-more {
  background-color: rgba(255, 255, 255, 0.3);
  z-index: 4;
  font-weight: bold;
  font-size: 85%;
  height: auto;
  line-height: normal;
  white-space: nowrap;
}
.rbc-month-view {
  position: relative;
  border: 1px solid ${props => props.theme.color.border};
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-flex: 1 0 0;
      -ms-flex: 1 0 0px;
          flex: 1 0 0;
  width: 100%;
  -moz-user-select: none;
   -ms-user-select: none;
       user-select: none;
  -webkit-user-select: none;
  height: 100%;
}
.rbc-month-header {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: row;
      -ms-flex-direction: row;
          flex-direction: row;
}
.rbc-month-row {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  position: relative;
  -webkit-flex-direction: column;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-flex: 1 0 0;
      -ms-flex: 1 0 0px;
          flex: 1 0 0;
  -webkit-flex-basis: 0px;
      -ms-flex-preferred-size: 0px;
          flex-basis: 0px;
  overflow: hidden;
  height: 100%;
}
.rbc-month-row + .rbc-month-row {
  border-top: 1px solid ${props => props.theme.color.border};
}
.rbc-date-cell {
  -webkit-flex: 1 1 0;
      -ms-flex: 1 1 0px;
          flex: 1 1 0;
  min-width: 0;
  padding-right: 5px;
  text-align: right;
}
.rbc-date-cell.rbc-now {
  font-weight: bold;
}
.rbc-date-cell > a,
.rbc-date-cell > a:active,
.rbc-date-cell > a:visited {
  color: inherit;
  text-decoration: none;
}
.rbc-row-bg {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: row;
      -ms-flex-direction: row;
          flex-direction: row;
  -webkit-flex: 1 0 0;
      -ms-flex: 1 0 0px;
          flex: 1 0 0;
  overflow: hidden;
}
.rbc-day-bg {
  -webkit-flex: 1 0 0%;
      -ms-flex: 1 0 0%;
          flex: 1 0 0%;
}
.rbc-day-bg + .rbc-day-bg {
  border-left: 1px solid ${props => props.theme.color.border};
}
.rbc-rtl .rbc-day-bg + .rbc-day-bg {
  border-left-width: 0;
  border-right: 1px solid ${props => props.theme.color.border};
}
.rbc-overlay {
  position: absolute;
  z-index: 5;
  border: 1px solid #e5e5e5;
  background-color: #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25);
  padding: 10px;
}
.rbc-overlay > * + * {
  margin-top: 1px;
}
.rbc-overlay-header {
  border-bottom: 1px solid #e5e5e5;
  margin: -10px -10px 5px -10px;
  padding: 2px 10px;
}
.rbc-agenda-view {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-flex: 1 0 0;
      -ms-flex: 1 0 0px;
          flex: 1 0 0;
  overflow: auto;
}
.rbc-agenda-view table.rbc-agenda-table {
  width: 100%;
  border: 1px solid ${props => props.theme.color.border};
  border-spacing: 0;
  border-collapse: collapse;
}
.rbc-agenda-view table.rbc-agenda-table tbody > tr > td {
  padding: 5px 10px;
  vertical-align: top;
}
.rbc-agenda-view table.rbc-agenda-table .rbc-agenda-time-cell {
  padding-left: 15px;
  padding-right: 15px;
  text-transform: lowercase;
}
.rbc-agenda-view table.rbc-agenda-table tbody > tr > td + td {
  border-left: 1px solid ${props => props.theme.color.border};
}
.rbc-rtl .rbc-agenda-view table.rbc-agenda-table tbody > tr > td + td {
  border-left-width: 0;
  border-right: 1px solid ${props => props.theme.color.border};
}
.rbc-agenda-view table.rbc-agenda-table tbody > tr + tr {
  border-top: 1px solid ${props => props.theme.color.border};
}
.rbc-agenda-view table.rbc-agenda-table thead > tr > th {
  padding: 3px 5px;
  text-align: left;
  border-bottom: 1px solid ${props => props.theme.color.border};
}
.rbc-rtl .rbc-agenda-view table.rbc-agenda-table thead > tr > th {
  text-align: right;
}
.rbc-agenda-time-cell {
  text-transform: lowercase;
}
.rbc-agenda-time-cell .rbc-continues-after:after {
  content: ' »';
}
.rbc-agenda-time-cell .rbc-continues-prior:before {
  content: '« ';
}
.rbc-agenda-date-cell,
.rbc-agenda-time-cell {
  white-space: nowrap;
}
.rbc-agenda-event-cell {
  width: 100%;
}
.rbc-time-column {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
      -ms-flex-direction: column;
          flex-direction: column;
  min-height: 100%;
}
.rbc-time-column .rbc-timeslot-group {
  -webkit-flex: 1;
      -ms-flex: 1;
          flex: 1;
}
.rbc-timeslot-group {
  border-bottom: 1px solid ${props => props.theme.color.border};
  min-height: 40px;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-flow: column nowrap;
      -ms-flex-flow: column nowrap;
          flex-flow: column nowrap;
}
.rbc-time-gutter,
.rbc-header-gutter {
  -webkit-flex: none;
      -ms-flex: none;
          flex: none;
}
.rbc-label {
  padding: 0 5px;
}
.rbc-day-slot {
  position: relative;
}
.rbc-day-slot .rbc-events-container {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  margin-right: 10px;
  top: 0;
}
.rbc-day-slot .rbc-events-container.rbc-is-rtl {
  left: 10px;
  right: 0;
}
.rbc-day-slot .rbc-event {
  border: 1px solid #265985;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  max-height: 100%;
  min-height: 20px;
  -webkit-flex-flow: column wrap;
      -ms-flex-flow: column wrap;
          flex-flow: column wrap;
  -webkit-align-items: flex-start;
      -ms-flex-align: start;
          align-items: flex-start;
  overflow: hidden;
  position: absolute;
}
.rbc-day-slot .rbc-event-label {
  -webkit-flex: none;
      -ms-flex: none;
          flex: none;
  padding-right: 5px;
  width: auto;
}
.rbc-day-slot .rbc-event-content {
  width: 100%;
  -webkit-flex: 1 1 0;
      -ms-flex: 1 1 0px;
          flex: 1 1 0;
  word-wrap: break-word;
  height: 100%;
  min-height: 1em;
  font-size: ${props => props.theme.size.base};
  font-weight: 400;
  margin: 0;
  padding-bottom: ${props => props.theme.spacing.xs};
  line-height: ${props => props.theme.size.sm};
}
.rbc-day-slot .rbc-time-slot {
  border-top: 1px solid ${props => props.theme.color.border};
}
.rbc-time-view-resources .rbc-time-gutter,
.rbc-time-view-resources .rbc-time-header-gutter {
  position: -webkit-sticky;
  position: sticky;
  left: 0;
  background-color: white;
  border-right: 1px solid ${props => props.theme.color.border};
  z-index: 10;
  margin-right: -1px;
}
.rbc-time-view-resources .rbc-time-header {
  overflow: hidden;
}
.rbc-time-view-resources .rbc-time-header-content {
  min-width: auto;
  -webkit-flex: 1 0 0;
      -ms-flex: 1 0 0px;
          flex: 1 0 0;
  -webkit-flex-basis: 0px;
      -ms-flex-preferred-size: 0px;
          flex-basis: 0px;
}
.rbc-time-view-resources .rbc-time-header-cell-single-day {
  display: none;
}
.rbc-time-view-resources .rbc-day-slot {
  min-width: 140px;
}
.rbc-time-view-resources .rbc-header,
.rbc-time-view-resources .rbc-day-bg {
  width: 140px;
  -webkit-flex: 1 1 0;
      -ms-flex: 1 1 0px;
          flex: 1 1 0;
  -webkit-flex-basis: 0 px;
      -ms-flex-preferred-size: 0 px;
          flex-basis: 0 px;
}
.rbc-time-header-content + .rbc-time-header-content {
  margin-left: -1px;
}
.rbc-time-slot {
  -webkit-flex: 1 0 0;
      -ms-flex: 1 0 0px;
          flex: 1 0 0;
}
.rbc-time-slot.rbc-now {
  font-weight: bold;
}
.rbc-day-header {
  text-align: center;
}
.rbc-slot-selection {
  z-index: 10;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 75%;
  width: 100%;
  padding: 3px;
}
.rbc-slot-selecting {
  cursor: move;
}
.rbc-time-view {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-flex: 1;
      -ms-flex: 1;
          flex: 1;
  width: 100%;
  border: 1px solid ${props => props.theme.color.border};
  background-color: ${props => props.theme.calendar.bg};
  border-radius: ${props => props.theme.value.borderRadius};
  min-height: 0;
}
.rbc-time-view .rbc-time-gutter {
  white-space: nowrap;
}
.rbc-time-view .rbc-allday-cell {
  box-sizing: content-box;
  width: 100%;
  height: 100%;
  position: relative;
}
.rbc-time-view .rbc-allday-cell + .rbc-allday-cell {
  border-left: 1px solid ${props => props.theme.color.border};
}
.rbc-time-view .rbc-allday-events {
  position: relative;
  z-index: 4;
}
.rbc-time-view .rbc-row {
  box-sizing: border-box;
  min-height: 20px;
}
.rbc-time-header {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex: 0 0 auto;
      -ms-flex: 0 0 auto;
          flex: 0 0 auto;
  -webkit-flex-direction: row;
      -ms-flex-direction: row;
          flex-direction: row;
}
.rbc-time-header.rbc-overflowing {
  border-right: 1px solid ${props => props.theme.color.border};
}
.rbc-rtl .rbc-time-header.rbc-overflowing {
  border-right-width: 0;
  border-left: 1px solid ${props => props.theme.color.border};
}
.rbc-time-header > .rbc-row:first-child {
  border-bottom: 1px solid ${props => props.theme.color.border};
}
.rbc-time-header > .rbc-row.rbc-row-resource {
  border-bottom: 1px solid ${props => props.theme.color.border};
}
.rbc-time-header-cell-single-day {
  display: none;
}
.rbc-time-header-content {
  -webkit-flex: 1;
      -ms-flex: 1;
          flex: 1;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  min-width: 0;
  -webkit-flex-direction: column;
      -ms-flex-direction: column;
          flex-direction: column;
  border-left: 1px solid ${props => props.theme.color.border};
}
.rbc-rtl .rbc-time-header-content {
  border-left-width: 0;
  border-right: 1px solid ${props => props.theme.color.border};
}
.rbc-time-content {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex: 1 0 0%;
      -ms-flex: 1 0 0%;
          flex: 1 0 0%;
  -webkit-align-items: flex-start;
      -ms-flex-align: start;
          align-items: flex-start;
  width: 100%;
  border-top: 2px solid ${props => props.theme.color.border};
  overflow-y: auto;
  position: relative;
}
.rbc-time-content > .rbc-time-gutter {
  -webkit-flex: none;
      -ms-flex: none;
          flex: none;
}
.rbc-time-content > * + * > * {
  border-left: 1px solid ${props => props.theme.color.border};
}
.rbc-rtl .rbc-time-content > * + * > * {
  border-left-width: 0;
  border-right: 1px solid ${props => props.theme.color.border};
}
.rbc-time-content > .rbc-day-slot {
  width: 100%;
  -moz-user-select: none;
   -ms-user-select: none;
       user-select: none;
  -webkit-user-select: none;
}
.rbc-current-time-indicator {
  position: absolute;
  z-index: 3;
  left: 0;
  right: 0;
  height: 2px;
  background-color: ${props => props.theme.color.blue};
  pointer-events: none;
}
`

const ThemCalendar = withTheme(StyledCalendar)
export default withSizes(mapSizesToProps)(ThemCalendar)
