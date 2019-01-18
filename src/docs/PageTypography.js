import React from 'react'
import {
  Title, Subtitle, P, Container
} from 'elements'
import SyntaxHighlighter from 'docs/SyntaxHighlighter'

const PageTypography = () => (
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
  </Container>
)

export default PageTypography
