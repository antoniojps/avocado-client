import React, { Component } from 'react'
import {
  Title,
  P,
  Button,
  Container,
} from 'elements'
import { BaseTabs, BaseSwitch, BaseToggle } from 'ui'
import SyntaxHighlighter from 'docs/SyntaxHighlighter'

export default class PageComponents extends Component {
  state = {
    isChecked: false,
  }

  handleSwitchChange = () => {
    const { isChecked } = this.state
    this.setState({ isChecked: !isChecked })
    console.log(`switch is ${!isChecked}`)
  }

  render() {
    const { isChecked } = this.state
    return (
      <Container>
        <Title>
          BaseTabs
        </Title>
        <P>
          Tabs to control current route
        </P>
        <BaseTabs>
          <BaseTabs.Tab to="/components">
            Components
          </BaseTabs.Tab>
          <BaseTabs.Tab to="/components/tab-2">
            Tab 2
          </BaseTabs.Tab>
          <BaseTabs.Tab to="/components/tab-3">
            Tab 3
          </BaseTabs.Tab>
        </BaseTabs>
        <br />
        <SyntaxHighlighter>
          {`import { BaseTabs } from 'ui'

  <BaseTabs>
    <BaseTabs.Tab to="/components">
      Components
    </BaseTabs.Tab>
    <BaseTabs.Tab to="/components/tab-2">
      Tab 2
    </BaseTabs.Tab>
    <BaseTabs.Tab to="/components/tab-3">
      Tab 3
    </BaseTabs.Tab>
  </BaseTabs>`}
        </SyntaxHighlighter>
        <Title>
          Switch
        </Title>
        <BaseSwitch isChecked={isChecked} onChange={this.handleSwitchChange}>
          Switch is
          {' '}
          {isChecked ? 'on' : 'off'}
        </BaseSwitch>
        <SyntaxHighlighter>
          {`import { BaseSwitch } from 'ui'

class Example extends Component {
  state = {
    isChecked: false,
  }

  handleSwitchChange = () => {
    const { isChecked } = this.state
    this.setState({ isChecked: !isChecked })
  }

  render() {
    const { isChecked } = this.state
    return (
      <BaseSwitch isChecked={isChecked} onChange={this.handleSwitchChange}>
        Switch is
        {' '}
        {isChecked ? 'on' : 'off'}
      </BaseSwitch>
    )
  }
}`}
        </SyntaxHighlighter>
        <Title>Toggle</Title>
        <BaseToggle>
          {({ isOn, toggle }) => (
            <>
              {isOn && <P>Toggle is on!</P>}
              <Button modifiers="danger" onClick={toggle}>
                Click to toggle
              </Button>
            </>
          )}
        </BaseToggle>
        <SyntaxHighlighter>
          {`<BaseToggle>
  {({ isOn, toggle }) => (
    <>
      {isOn && <P>Show me</P>}
      <Button modifiers="small" onClick={toggle}>
        Show / Hide
      </Button>
    </>
  )}
</BaseToggle>`}
        </SyntaxHighlighter>
      </Container>
    )
  }
}
