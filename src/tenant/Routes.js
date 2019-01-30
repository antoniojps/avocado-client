import React from 'react'
import { Route } from 'react-router-dom'
import PageDocsElements from 'docs/PageElements'
import PageDocsComponents from 'docs/PageComponents'
import PageDocsStore from 'docs/PageStore'
import PageResources from 'resources/PageResources'
import PageGather from 'user/PageGather'
import PageIndex from './PageIndex'

export const RoutesConfig = [
  {
    exact: true,
    path: '/',
    component: PageIndex,
    key: 'index',
  },
  {
    path: '/gather',
    component: PageGather,
    key: 'gather',
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
    path: '/resources',
    component: PageResources,
    key: 'resources',
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
