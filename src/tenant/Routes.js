import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { applyPathToRoutesObj, mapRoutesObjToArray } from 'utilities/helper'
import PageDocsIndex from 'docs/PageIndex'
import PageDocsElements from 'docs/PageElements'
import PageDocsComponents from 'docs/PageComponents'
import PageDocsStore from 'docs/PageStore'
import PageDocsPermissions from 'docs/PagePermissions'
import PageResources from 'resources/PageResources'
import PageGather from 'user/PageGather'
import PageLogin from 'user/PageLogin'
import PageSettings from 'settings/PageSettings'
import PageRoles from 'settings/PageRoles'
import PageUnits from 'units/PageUnits';
import PageUsers from 'users/PageUsers';
import PageInvite from 'users/PageInvite';
import PageCalendar from 'calendar/PageCalendar';
import PageRegister from 'user/PageRegister';
import PageNotFound from 'tenant/PageNotFound';
import PageIndex from './PageIndex'

const routesConfig = {
  index: {
    component: PageIndex,
    key: 'index',
    exact: true,
    name: 'index',
  },
  gather: {
    index: {
      component: PageGather,
      key: 'gather',
      name: 'Gather',
      exact: true,
    },
    register: {
      component: PageGather,
      key: 'gather',
      name: 'Gather',
      exact: true,
    },
  },
  calendar: {
    component: PageCalendar,
    key: 'calendar',
    name: 'Calendar',
  },
  team: {
    index: {
      component: PageUsers,
      key: 'team',
      exact: true,
      name: 'Team',
    },
    invite: {
      component: PageInvite,
      key: 'teamInvite',
      exact: true,
      name: 'Invite',
    },
  },
  login: {
    component: PageLogin,
    key: 'login',
    name: 'Login',
  },
  register: {
    index: {
      component: PageRegister,
      key: 'register',
      name: 'register',
      exact: true,
    },
    ':token': {
      component: PageRegister,
      key: 'registerToken',
      name: 'registerToken',
    },
  },
  units: {
    index: {
      component: PageUnits,
      key: 'units',
      exact: true,
      name: 'Units',
    },
  },
  resources: {
    index: {
      component: PageResources,
      key: 'resources',
      name: 'Resources',
      exact: true,
    },

  },
  settings: {
    index: {
      component: PageSettings,
      key: 'settings',
      exact: true,
      name: 'Settings',
    },
    roles: {
      component: PageRoles,
      key: 'roles',
      name: 'Roles',
    },
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
    permissions: {
      component: PageDocsPermissions,
      key: 'docsPermissions',
      name: 'Permissions',
    },
    store: {
      component: PageDocsStore,
      key: 'docsStore',
      name: 'Store',
    },
  },
}

const routesObj = applyPathToRoutesObj(routesConfig)
const routesArr = [
  ...mapRoutesObjToArray(routesObj),
  {
    component: PageNotFound,
    key: 'NotFound',
  },
]

const Routes = () => (
  <Switch>
    {
      routesArr.map(route => (
        <Route {...route} />
      ))
    }
  </Switch>
)

export const routes = routesObj

export default Routes
