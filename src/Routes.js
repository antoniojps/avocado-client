import React from 'react'
import { Route } from 'react-router-dom'
import PageElements from 'docs/PageElements'
import PageComponents from 'docs/PageComponents'
import PageIndex from 'docs/PageIndex'

export const RoutesConfig = [
  {
    exact: true,
    path: '/',
    component: PageIndex,
  },
  {
    path: '/elements',
    component: PageElements,
  },
  {
    path: '/components',
    component: PageComponents,
  },
]

const Routes = () => (
  <>
    {
      RoutesConfig.map(route => (
        <Route {...route} />
      ))
    }
  </>
)

export default Routes
