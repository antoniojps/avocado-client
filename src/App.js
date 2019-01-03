import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'
import { Emoji, Card } from 'elements'
import { theme } from 'utilities'

/* eslint-disable react/prefer-stateless-function */
class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Card modifiers="column">
          <Emoji emoji="🥑" label="avocado" />
        </Card>
      </ThemeProvider>
    );
  }
}

export default App
