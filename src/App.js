import React, { Component } from 'react';
import { Emoji, Card } from 'elements'

class App extends Component {
  render() {
    return (
      <>
        <Card>
          <Emoji emoji="🥑" label="avocado" />
        </Card>
      </>
    );
  }
}

export default App
