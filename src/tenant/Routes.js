import React from 'react'
import { Route } from 'react-router-dom'
import { applyPathToRoutesObj, mapRoutesObjToArray } from 'utilities/helper'
import PageDocsIndex from 'docs/PageIndex'
import PageDocsElements from 'docs/PageElements'
import PageDocsComponents from 'docs/PageComponents'
import PageDocsStore from 'docs/PageStore'
import PageResources from 'resources/PageResources'
import PageGather from 'user/PageGather'
import PageLogin from 'user/PageLogin'
import PageIndex from './PageIndex'

const routesConfig = {
  index: {
    component: PageIndex,
    key: 'index',
    exact: true,
    name: 'index',
  },
  documentation: {
    index: {
      component: PageDocsIndex,
      key: 'docs',
      exact: true,
      name: 'Documentation',
    },
    elements: {
      component: PageDocsElements,
      key: 'docsElements',
      name: 'Elements',
    },
    components: {
      component: PageDocsComponents,
      key: 'docsComponents',
      name: 'Components',
    },
    store: {
      component: PageDocsStore,
      key: 'docsStore',
      name: 'Store',
    },
  },
  gather: {
    component: PageGather,
    key: 'gather',
    name: 'Gather',
  },
  resources: {
    component: PageResources,
    key: 'resources',
    name: 'Resources',
  },
  login: {
    component: PageLogin,
    key: 'login',
    name: 'Login',
  },
}

const routesObj = applyPathToRoutesObj(routesConfig)
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

export const routes = routesObj

export default Routes
