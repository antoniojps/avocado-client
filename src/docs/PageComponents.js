import React, { Component } from 'react'
import {
  Title,
  P,
  Button,
  Container,
} from 'elements'
import {
  BaseTabs,
  BaseSwitch,
  BaseToggle,
  BaseRater,
} from 'ui'
import SyntaxHighlighter from 'docs/SyntaxHighlighter'

export default class PageComponents extends Component {
  state = {
    isChecked: false,
    ratingInfo: 'Rated 3 stars',
  }

  handleSwitchChange = () => {
    const { isChecked } = this.state
    this.setState({ isChecked: !isChecked })
  }

  setRatingInfo = (info) => {
    this.setState({ ratingInfo: info })
  }

  render() {
    const { isChecked, ratingInfo } = this.state
    return (
      <Container>
        <Title>
          Tabs
        </Title>
        <P>
          Horizontal
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

<BaseTabs orientation="vertical">
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
        <P>
          Vertical
        </P>
        <BaseTabs orientation="vertical">
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

<BaseTabs orientation="vertical">
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
          {`import { BaseToggle } from 'ui'

<BaseToggle>
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
        <Title>
          Rater
        </Title>
        <BaseRater
          rating={3}
          max={5}
          onRate={(selectedRating) => this.setRatingInfo(`Rated ${selectedRating} stars`)}
          onMouseEnterStar={(hoveredRating) => this.setRatingInfo(`Hovering ${hoveredRating} stars`)}
          onMouseLeave={(selectedRating) => this.setRatingInfo(`Rated ${selectedRating} stars`)}
        />
        <P>{ratingInfo}</P>
        <SyntaxHighlighter>
          {`import { BaseRater } from 'ui'

<BaseRater
  rating={3}
  max={5}
  onRate={(selectedRating) => this.setRatingInfo(\`Rated \${selectedRating} stars\`)}
  onMouseEnterStar={(hoveredRating) => this.setRatingInfo(\`Hovering \${hoveredRating} stars\`)}
  onMouseLeave={(selectedRating) => this.setRatingInfo(\`Rated \${selectedRating} stars\`)}
/>
<P>{ratingInfo}</P>`}
        </SyntaxHighlighter>
      </Container>
    )
  }
}
