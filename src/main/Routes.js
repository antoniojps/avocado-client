import React from 'react'
import { Route } from 'react-router-dom'
import PageIndex from './PageIndex'
import PageTenantCreate from './PageTenantCreate'

export const RoutesConfig = [
  {
    exact: true,
    path: '/',
    component: PageIndex,
    key: 'Index',
  },
  {
    path: '/create',
    component: PageTenantCreate,
    key: 'create',
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
