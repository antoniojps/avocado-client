import React from 'react'
import {
  Title,
  Subtitle,
  P,
  Button,
  Tag,
  Container,
} from 'elements'
import SyntaxHighlighter from 'docs/SyntaxHighlighter'

const PageElements = () => (
  <Container>
    <Title>
      Title
    </Title>
    <Subtitle>
      Subtitle
    </Subtitle>
    <P>
      Lorem ipsum dolor amet fam vinyl vegan synth. Prism chartreuse
      90s waistcoat kombucha knausgaard. Gastropub locavore YOLO af.
      Put a bird on it tattooed seitan, roof party raclette meggings
      tumeric try-hard bicycle rights venmo fam. Retro hoodie blue bottle
      butcher tilde, vegan selvage skateboard cornhole quinoa vape hexagon lomo
      direct trade. Slow-carb photo booth lomo narwhal glossier hell of, gochujang
      farm-to-table next level four loko distillery trust fund microdosing.
      Post-ironic meggings raclette, ennui hella asymmetrical dreamcatcher
      chillwave af celiac.
    </P>

    <SyntaxHighlighter>
      {`import { Title, Subtitle, P } from 'elements'

<Title>
  Title
</Title>
<Subtitle>
  Subtitle
</Subtitle>
<P>
  Lorem ipsum dolor amet fam vinyl vegan synth. Prism chartreuse...
</P>`}
    </SyntaxHighlighter>
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
