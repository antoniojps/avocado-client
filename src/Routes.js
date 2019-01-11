import React from 'react'
import { Route } from 'react-router-dom'
import PageTypography from 'ui/PageTypography'
import PageElements from 'ui/PageElements'
import PageComponents from 'ui/PageComponents'

const Routes = () => (
  <>
    <Route exact path="/" component={PageTypography} />
    <Route exact path="/elements" component={PageElements} />
    <Route path="/components" component={PageComponents} />
  </>
)

export default Routes
