import React from 'react'
import {
  Title,
  Button,
  Tag,
  Container,
} from 'elements'
import SyntaxHighlighter from 'docs/SyntaxHighlighter'

const PageElements = () => (
  <Container>
    <Title>
      Buttons
    </Title>
    <Container>
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
    </Container>
    <SyntaxHighlighter>
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
    <Title>
      Tags
    </Title>
    <Tag>
      Auditoria
    </Tag>
    <Tag modifiers="purple">
      Relatório
    </Tag>
    <Tag color="tomato">
      Reunião
    </Tag>
    <SyntaxHighlighter>
      {`import { Tag } from 'elements'

<Tag>
Auditoria
</Tag>
<Tag modifiers="purple">
Relatório
</Tag>
<Tag color="tomato">
Reunião
</Tag>`}
    </SyntaxHighlighter>
  </Container>
)

export default PageElements
