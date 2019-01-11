import React from 'react'
import {
  Title,
  P,
} from 'elements'
import { BaseTabs } from 'ui'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coy } from 'react-syntax-highlighter/dist/styles/prism'

const PageComponents = () => (
  <>
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
    <SyntaxHighlighter language="jsx" style={coy} customStyle={{ backgroundColor: 'white' }}>
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
  </>
)

export default PageComponents
