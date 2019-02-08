import { theme, themeDark } from 'utilities'

const themesDatabase = [
  {
    id: 1,
    theme,
  },
  {
    id: 2,
    theme: themeDark,
  },
]

export const themeFromId = (id) => {
  const themeFound = themesDatabase.find(theme => id === theme.id)
  if (themeFound) return themeFound.theme
  return theme
}

export default themesDatabase
