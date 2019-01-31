import React from 'react'
import { Route } from 'react-router-dom'
import { applyPathToRoutesObj, mapRoutesObjToArray } from 'utilities/helper'
import PageDocsElements from 'docs/PageElements'
import PageDocsComponents from 'docs/PageComponents'
import PageDocsStore from 'docs/PageStore'
import PageResources from 'resources/PageResources'
import PageGather from 'user/PageGather'
import PageIndex from './PageIndex'

export const RoutesConfigOld = [
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

export const routesObj = applyPathToRoutesObj({
  index: {
    component: PageIndex,
    key: 'index',
    exact: true,
  },
  docs: {
    component: PageDocsElements,
    key: 'docs',
  },
  elements: {
    component: PageDocsElements,
    key: 'docsElements',
  },
  components: {
    component: PageDocsComponents,
    key: 'docsComponents',
  },
  store: {
    component: PageDocsStore,
    key: 'docsStore',
  },
  gather: {
    component: PageGather,
    key: 'gather',
  },
  resources: {
    component: PageResources,
    key: 'resources',
  },
})

const routesArr = mapRoutesObjToArray(routesObj)

const Routes = () => (
  <>
    {
      routesArr.map(route => (
        <Route {...route} />
      ))
    }
  </>
)

export default Routes
