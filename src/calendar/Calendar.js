import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { BaseLoading } from 'ui/BaseLoader'
import { BaseModal } from 'ui'
import { transparentize } from 'polished'
import styled, { withTheme } from 'styled-components'
import { Button, Subtitle } from 'elements'
import { fetchEvents, fetchDataAddEvent } from 'utilities/requests'
import { toast } from 'utilities'
import AddEventForm from './AddEventForm'


const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

class Calendar extends Component {
  state = {
    events: [],
    isLoading: true,
    activeTab: 'week',
    modalAddOpen: false,
    addStart: null,
    addEnd: null,
    currentMonth: null,
    dataAdd: null,
    selectedEvent: null,
  }

  async componentDidMount() {
    const start = moment().startOf('month').subtract(10, 'days').unix() // current begin of week timestampt
    const end = moment().endOf('month').add(10, 'days').unix() // current end of week timestampt
    const currentMonth = moment().format('M')
    let events
    let dataAdd

    try {
      const { data: { data } } = await fetchEvents({ start, end })
      events = data
      const { data: addData } = await fetchDataAddEvent()
      dataAdd = addData
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

    this.setState({
      events,
      isLoading: false,
      currentMonth,
      dataAdd,
    })
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
      this.setState({
        currentMonth,
        events,
        isLoading: false,
      })
    }
  }

  getCurrent = context => {
    const { activeTab } = this.state
    return activeTab === context ? ['primary', 'leftMargin'] : 'leftMargin'
  }

  getCustomBar = ({ label, onNavigate }) => (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Button onClick={() => onNavigate('PREV')}>Back</Button>
          <Button modifiers="leftMargin" onClick={() => onNavigate('TODAY')}>Today</Button>
          <Button modifiers="leftMargin" onClick={() => onNavigate('NEXT')}>Next</Button>
        </div>
        <Subtitle>{label}</Subtitle>
        <div>
          <Button modifiers={this.getCurrent('month')} onClick={() => this.setState({ activeTab: 'month' })}>Month</Button>
          <Button modifiers={this.getCurrent('week')} onClick={() => this.setState({ activeTab: 'week' })}>Week</Button>
          <Button modifiers={this.getCurrent('day')} onClick={() => this.setState({ activeTab: 'day' })}>Day</Button>
        </div>
      </div>
    </>
  )


  handleSelect = ({ start, end }) => {
    this.setState({ addStart: start, addEnd: end }, () => this.toggleModal())
  }

  toggleModal = (e) => {
    if (e && e.id) {
      this.setState({
        selectedEvent: e, addStart: e.start, addEnd: e.end, modalAddOpen: !this.state.modalAddOpen,
      })
    } else {
      this.setState({ selectedEvent: null, modalAddOpen: !this.state.modalAddOpen })
    }
  }

  onSubmit = ({ data }) => {
    this.toggleModal()
    this.setState({
      events: [...this.state.events, {
        ...data,
        start: new Date(data.start.date),
        end: new Date(data.end.date),
      }],
    })
  }

  render() {
    const {
      isLoading, events, activeTab, modalAddOpen, addStart, addEnd, dataAdd, selectedEvent,
    } = this.state
    return (
      <>
        <BaseModal isOn={modalAddOpen} toggle={this.toggleModal}>
          <AddEventForm

            onSubmit={this.onSubmit}
            selectedEvent={selectedEvent}
            {...{
              addStart, addEnd, onChange: this.onChange, isLoading, selectData: dataAdd,
            }}
          />
        </BaseModal>
        <div style={{ position: 'relative', height: activeTab === 'month' ? '900px' : '100%' }}>
          {isLoading && <Loader width="40%" height="40%" />}
          <BigCalendar
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
                  background: this.props.theme.color.base,
                  color: this.props.theme.color.baseInverse,
                  borderRadius: this.props.theme.value.borderRadius,
                  border: '2px solid white',
                }
                if (event.mine) {
                  newStyle.backgroundColor = this.props.theme.color.primaryDarker
                }
                if (event.allDay) {
                  newStyle.backgroundColor = this.props.theme.color.primaryDarker
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
    background-color: ${props => transparentize(0.9, props.theme.color.bgDark)};
`


export default withTheme(Calendar)
