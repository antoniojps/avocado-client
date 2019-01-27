import React from 'react'
import { Route } from 'react-router-dom'
import PageIndex from './PageIndex'


export const RoutesConfig = [
  {
    exact: true,
    path: '/',
    component: PageIndex,
    key: 'index',
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
