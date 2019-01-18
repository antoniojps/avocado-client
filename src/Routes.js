import React from 'react'
import { Route } from 'react-router-dom'
import PageTypography from 'docs/PageTypography'
import PageElements from 'docs/PageElements'
import PageComponents from 'docs/PageComponents'

const Routes = () => (
  <>
    <Route exact path="/" component={PageTypography} />
    <Route exact path="/elements" component={PageElements} />
    <Route path="/components" component={PageComponents} />
  </>
)

export default Routes
