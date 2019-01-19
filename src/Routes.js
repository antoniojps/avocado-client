import React from 'react'
import { Route } from 'react-router-dom'
import PageElements from 'docs/PageElements'
import PageComponents from 'docs/PageComponents'

const Routes = () => (
  <>
    <Route exact path="/" component={PageElements} />
    <Route path="/components" component={PageComponents} />
  </>
)

export default Routes
