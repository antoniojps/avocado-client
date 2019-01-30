import React, { Component } from 'react'
import {
  Title,
  P,
  Button,
  Container,
} from 'elements'
import { Link } from 'react-router-dom'
import {
  BasePage,
  BaseTabs,
  BaseSwitch,
  BaseToggle,
  BaseRater,
  BaseBreadcrumb,
  BaseLoader,
  BaseFormInput,
  BaseModal,
  BaseSearch,

} from 'ui'
import SyntaxHighlighter from 'docs/SyntaxHighlighter'

export default class PageComponents extends Component {
  state = {
    isChecked: false,
    ratingInfo: 'Rated 3 stars',
    arraySearch: ['o', 'avocado', 'é', 'muito', 'saboroso'],
    filteredArray: ['o', 'avocado', 'é', 'muito', 'saboroso'],
  }

  handleSwitchChange = () => {
    const { isChecked } = this.state
    this.setState({ isChecked: !isChecked })
  }

  setRatingInfo = (info) => {
    this.setState({ ratingInfo: info })
  }

  handleChange = value => {
    const { arraySearch } = this.state;
    this.setState({
      filteredArray: arraySearch.filter(val => !val.search(value)),
    })
  }

  render() {
    const { isChecked, ratingInfo, filteredArray } = this.state
    return (
      <BasePage>
        <Container>
          <Title>
            Input
          </Title>
          <BaseSearch onChange={this.handleChange} />
          {filteredArray.map((value) => <P key={value}>{value}</P>)}
          <BaseFormInput placeholder="Name" />
          <BaseFormInput placeholder="Valid" modifiers="valid" />
          <BaseFormInput placeholder="Error" modifiers="error" error="epa ocorreu um grave erro" />

          <Title>
            Modal
          </Title>
          <BaseToggle>
            {({ isOn, toggle }) => (
              <>
                <Button modifiers="danger" onClick={toggle}>
                  Click to toggle
                </Button>
                <BaseModal toggle={toggle} isOn={isOn}>
                  <div>Im a modal</div>
                </BaseModal>
              </>
            )}
          </BaseToggle>
          <Title>
            Loader
          </Title>
          <BaseLoader message="Loading something..." />
          <SyntaxHighlighter>
            {`import { BaseLoader } from 'ui'

<BaseLoader message="Loading something..." />`}
          </SyntaxHighlighter>
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
          <Title>
            Breadcrumb
          </Title>
          <P>
            <Link to="/components/tab-2">
              Click to go to Tab 2
            </Link>
            {' or '}
            <Link to="/components/tab-3">
              Click to go to Tab 3
            </Link>
          </P>
          <BaseBreadcrumb
            basePage={{
              title: 'Design',
              to: '/',
            }}
          />
          <br />
          <SyntaxHighlighter>
            {`import { BaseBreadcrumb } from 'ui'

<BaseBreadcrumb
basePage={{
  title: 'Design',
  to: '/',
}}
/>`}
          </SyntaxHighlighter>
          <BaseBreadcrumb
            basePage={{
              title: '💅 Components',
              to: '/components',
            }}
            parentVisible={false}
          />
          <br />
          <SyntaxHighlighter>
            {`import { BaseBreadcrumb } from 'ui'

<BaseBreadcrumb
  basePage={{
    title: '💅 Components',
    to: '/components',
  }}
  parentVisible={false}
/>`}
          </SyntaxHighlighter>
        </Container>
      </BasePage>
    )
  }
}
