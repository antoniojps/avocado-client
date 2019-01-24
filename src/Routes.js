import React from 'react'
import { Route } from 'react-router-dom'
import PageElements from 'docs/PageElements'
import PageComponents from 'docs/PageComponents'
import PageIndex from 'docs/PageIndex'
import PageStore from 'docs/PageStore'

export const RoutesConfig = [
  {
    exact: true,
    path: '/',
    component: PageIndex,
    key: 'index',
  },
  {
    path: '/elements',
    component: PageElements,
    key: 'elements',
  },
  {
    path: '/components',
    component: PageComponents,
    key: 'components',
  },
  {
    path: '/store',
    component: PageStore,
    key: 'store',
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
