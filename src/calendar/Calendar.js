import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { BaseLoading } from 'ui/BaseLoader'
import { BaseModal } from 'ui'
import { transparentize } from 'polished'
import styled, { withTheme } from 'styled-components'
import { Button, Subtitle } from 'elements'
import events from './events'

const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer


class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      isLoading: true,
      activeTab: 'week',
      modalAddOpen: false,
      addStart: null,
      addEnd: null,
    }
  }

  async componentDidMount() {
    await new Promise((res) => setTimeout(() => {
      res();
    }, 1000))
    this.setState({
      events,
      isLoading: false,
    })
  }

  onNavigate = (e, b) => console.log('initial day', e, 'context', b)

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
          <Button modifiers="leftMargin" onClick={() => this.setState({ activeTab: 'month' })}>Month</Button>
          <Button modifiers="leftMargin" onClick={() => this.setState({ activeTab: 'week' })}>Week</Button>
          <Button modifiers="leftMargin" onClick={() => this.setState({ activeTab: 'day' })}>Day</Button>
        </div>
      </div>
    </>
  )

  handleSelect = ({ start, end }) => {
    this.setState({ addStart: start, addEnd: end }, () => this.toggleModal())
  }

  toggleModal = () => this.setState({ modalAddOpen: !this.state.modalAddOpen })

  render() {
    const {
      isLoading, events, activeTab, modalAddOpen, addStart, addEnd,
    } = this.state
    return (
      <>
        <BaseModal isOn={modalAddOpen} toggle={this.toggleModal}>
          <div>{addStart && addStart.toString()}</div>
          <div>{addEnd && addEnd.toString()}</div>
        </BaseModal>
        <div style={{ position: 'relative', height: activeTab === 'month' ? '900px' : '100%' }}>
          {isLoading && <Loader width="40%" height="40%" />}
          <BigCalendar
            selectable
            localizer={localizer}
            events={events}
            tooltipAccessor={() => null}
            defaultView={activeTab}
            view={activeTab}
            scrollToTime={new Date(1970, 1, 1, 6)}
            onSelectEvent={event => alert(event.title)}
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
                };
              }
            }
            defaultDate={new Date(2015, 3, 12)}
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
