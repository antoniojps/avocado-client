import React from 'react'
import {
  Title,
  Button,
} from 'elements'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coy } from 'react-syntax-highlighter/dist/styles/prism'

const PageElements = () => (
  <>
    <Title>
      Buttons
    </Title>
    <Button>
      Base
    </Button>
    <br />
    <Button modifiers="primary">
      Primary
    </Button>
    <br />
    <Button modifiers="danger">
      Danger
    </Button>
    <br />
    <Button modifiers="small">
      Small
    </Button>
    <br />
    <Button modifiers={['primary', 'small']}>
      Primary Small
    </Button>
    <br />
    <Button modifiers={['danger', 'small']}>
      Danger Small
    </Button>

    <SyntaxHighlighter language="jsx" style={coy} customStyle={{ backgroundColor: 'white' }}>
      {`import { Button } from 'elements'

<Button>
  Base
</Button>

<Button modifiers="primary">
  Base
</Button>

<Button modifiers={['primary', 'small']}>
  Primary Small
</Button>`}
    </SyntaxHighlighter>
  </>
)

export default PageElements
