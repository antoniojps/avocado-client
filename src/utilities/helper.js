

import { HTTP_PROTOCOL, API_URL_BASE, ENDPOINT } from 'config';

export const getTenant = () => {
  const splittedDomain = window.location.hostname.split('.')
  return splittedDomain.length === 3 && `${splittedDomain[0]}`
}

export const getMainUrl = () => {
  const { hostname, protocol, port } = window.location
  const splittedHost = hostname.split('.')
  const splittedMainHost = splittedHost.length === 3 ? splittedHost.slice(1) : splittedHost
  const mainHost = splittedMainHost.join('.')
  const mainPort = (port === '') ? '' : `:${port}`
  const mainUrl = `${protocol}//${mainHost}${mainPort}`
  return mainUrl
}

export const getApiUrl = () => {
  const tenant = getTenant()
  if (!tenant) {
    return ENDPOINT
  }
  return `${HTTP_PROTOCOL}${tenant}.${API_URL_BASE}`
}

export const callPropFunc = (func) => {
  if (typeof func === 'function') func()
}

/*
    adds path based on object keys tree position
    example:
    {
      index: {
        component: PageIndex,
        key: 'index',
      },
      docs: {
        elements: {
          component: PageDocsElements,
          key: 'docsElements',
        }
      }
    }
    Converts to
    {
      index: {
        component: PageIndex,
        key: 'index',
        path: '/',
      },
      docs: {
        elements: {
          component: PageDocsElements,
          key: 'docsElements',
          path: '/docs/elements'
        }
      }
    }
  */
export const applyPathToRoutesObj = routesObj => {
  let resultKeys = []
  function iterate(obj, previousKeys) { // eslint-disable-line consistent-return
    const keys = Object.keys(obj)
    if (keys.length > 0 && typeof obj === 'object') {
      return keys.forEach(key => {
        if (typeof obj[key] !== 'object') {
          return iterate(obj[key], [...previousKeys], obj)
        }
        return iterate(obj[key], [...previousKeys, key])
      })
    }
    resultKeys = [...resultKeys, previousKeys]
  }
  iterate(routesObj, [])

  // there are duplicates because it returns all possible keys trees including
  // the last children of keys
  // for example ['docs', 'elements'] happears twice because
  // there is docs.elements.key and docs.elements.component
  // this last keys are not included because they arent an object type
  function removeDuplicates(keysArr) {
    const set = new Set(keysArr.map(JSON.stringify))
    const uniqueArr = Array.from(set, JSON.parse)
    return uniqueArr
  }

  const cleanedUpKeys = removeDuplicates(resultKeys)

  const getValueFromKeysArr = (obj, keys) => keys.reduce((acc, key) => acc[key], obj)

  const getPathFromKeysArr = keysArr => {
    // adds slash to first element and joins
    const passedArr = [...keysArr]
    const firstElement = passedArr[0]
    const lastElement = passedArr[passedArr.length - 1]
    const isIndex = lastElement === 'index'

    // index handling
    if (isIndex) passedArr.pop()
    const isRootIndex = passedArr.length === 0
    if (isRootIndex) return '/'

    passedArr[0] = `/${firstElement}`
    return passedArr.join('/')
  }

  function applyPathToObj(keysArr) {
    keysArr.forEach(keys => {
      const route = getValueFromKeysArr(routesObj, keys)
      const path = getPathFromKeysArr(keys)
      route.path = path
    })
    return routesObj
  }

  return applyPathToObj(cleanedUpKeys)
}

/*
  converts routes obj into array of routes
  reserved key index for the parents index
  example:
    {
      index: {
        component: PageIndex,
        key: 'index',
        path: '/',
      },
      docs: {
        index: {
          component: PageDocsIndex,
          key: 'docs',
          path: '/docs',
        },
        elements: {
          component: PageDocsElements,
          key: 'docsElements',
          path: '/docs/elements'
        }
      }
    }
    get mapped into:
    [
      {
        path: '/',
        component: PageIndex,
        key: 'index'
      },
      {
        path: '/docs',
        component: PageDocsIndex,
        key: 'docs',
      },
      {
        path: '/docs/elements',
        component: PageDocsElements,
        key: 'docsElements',
      },
    ]
*/
export const mapRoutesObjToArray = routesObj => {
  let result = []
  function iterate(obj, previous, value) { // eslint-disable-line consistent-return
    const keys = Object.keys(obj)
    if (keys.length > 0 && typeof obj === 'object') {
      return keys.forEach(key => {
        if (typeof obj[key] !== 'object') {
          return iterate(obj[key], [...previous], obj)
        }
        return iterate(obj[key], [...previous, key])
      });
    }
    const routeObj = { ...value }
    result = [...result, routeObj]
  }
  iterate(routesObj, [])

  function removeDuplicatesBy(keyName, array) {
    const mySet = new Set()
    const filteredArr = array.filter(obj => {
      const value = obj[keyName]
      const isNew = !mySet.has(value)
      if (isNew) mySet.add(value)
      return isNew
    });
    return filteredArr
  }

  const cleanedUpResult = removeDuplicatesBy('key', result)
  return cleanedUpResult
}
