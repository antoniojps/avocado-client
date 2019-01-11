import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'
import {
  Title, Subtitle, P, Layout,
} from 'elements'
import { theme } from 'utilities'

/* eslint-disable react/prefer-stateless-function */
class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Layout>
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
        </Layout>
      </ThemeProvider>
    );
  }
}

export default App
