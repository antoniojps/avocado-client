import uniqueID from 'lodash.uniqueid'

export const generateKey = (prefix) => `${uniqueID(prefix)}_${new Date().getTime()}`
