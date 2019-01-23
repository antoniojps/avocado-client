import { uniqueId } from 'lodash'

export const generateKey = (prefix) => `${uniqueId(prefix)}_${new Date().getTime()}`
export const hyphenToSpace = (str) => str.replace(/-/g, ' ')
