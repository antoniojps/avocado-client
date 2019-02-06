import React from 'react'
import DateTimePicker from 'react-datetime-picker';
import styled from 'styled-components'
import { BaseFormInput, BaseFormSelect } from 'ui'
import { P, Title, Button } from 'elements'

const AddEventForm = ({ addStart, addEnd, onChange }) => {
  console.log('aqui', addStart)

  return (
    <div>
      <Title>Insert new event</Title>

      <P>Name</P>
      <BaseFormInput placeholder="Event name" />

      <P>Date start</P>
      <DateTimePicker
        onChange={onChange}
        value={addStart}
      />
      <P>Date end</P>
      <DateTimePicker
        onChange={onChange}
        value={addEnd}
      />
      <P>Person</P>
      <BaseFormSelect options={[{ id: 0, value: 'Select theme', disabled: true },
        { id: 1, value: 'Default' },
        { id: 2, value: 'Dark' }]}
      />
      <P>Unit</P>
      <BaseFormSelect options={[{ id: 0, value: 'Select theme', disabled: true },
        { id: 1, value: 'Default' },
        { id: 2, value: 'Dark' }]}
      />

      <P>Resources</P>
      <BaseFormSelect options={[{ id: 0, value: 'Select theme', disabled: true },
        { id: 1, value: 'Default' },
        { id: 2, value: 'Dark' }]}
      />
      <Button modifiers="primary">
        Click to toggle
      </Button>

    </div>
  )
}

export default AddEventForm
