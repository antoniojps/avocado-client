import React from 'react'
import { Route } from 'react-router-dom'
import PageDocsElements from 'docs/PageElements'
import PageDocsComponents from 'docs/PageComponents'
import PageDocsStore from 'docs/PageStore'
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
    path: '/elements',
    component: PageDocsElements,
    key: 'docsElements',
  },
  {
    path: '/components',
    component: PageDocsComponents,
    key: 'docsComponents',
  },
  {
    path: '/store',
    component: PageDocsStore,
    key: 'docsStore',
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
