import React, { Component } from 'react'
import Popover from 'react-tiny-popover'
import { BaseSearch, BaseLoader } from 'ui'
import { PopUp } from 'elements'
import { ThemeProvider } from 'styled-components'
import { theme, globalSearch } from 'utilities'
import SearchResults from './SearchResults';


class GlobalSearch extends Component {
  state = {
    isPopoverOpen: false,
    data: {
      users: null,
      resources: null,
      units: null,
    },
    currentSearch: null,
    isLoading: false,
    error: null,
  }

  getResults = async search => {
    this.setState(() => ({ isLoading: true, currentSearch: search }));
    try {
      const { data } = await globalSearch(search);
      console.log(data)
      if (typeof data !== 'object') throw new Error('Data is not valid type')
      this.setState(() => ({ isLoading: false, data: data.data, error: null }));
    } catch (error) {
      this.setState(() => ({ isLoading: false, data: {}, error }))
    }
  }

  handleSearch = search => {
    if (search) {
      this.setState({ isPopoverOpen: true })
      this.getResults(search)
    } else {
      this.setState({ isPopoverOpen: false })
    }
  }

  checkData = (users, units, resources) => {
    if (users && units && resources) {
      if (users.length > 0 || units.length > 0 || resources.length > 0) {
        return true
      }
    }
    return false
  }

  render() {
    const {
      isPopoverOpen, isLoading, data, error, currentSearch,
    } = this.state;
    const users = data && (data.users || null)
    const units = data && (data.units || null)
    const resources = data && (data.resources || null)
    return (
      <div>
        <Popover
          padding={1}
          isOpen={isPopoverOpen}
          onClickOutside={() => this.setState({ isPopoverOpen: false })}
          position="bottom" // preferred position
          content={(
            <ThemeProvider theme={theme}>
              <PopUp>
                {isLoading && <BaseLoader message="Loading results..." />}
                {(!isLoading && !this.checkData(users, units, resources)) && <div>No results found</div>}
                {(!isLoading && !error) && <SearchResults data={data} currentSearch={currentSearch} />}
              </PopUp>
            </ThemeProvider>
          )}
        >
          <BaseSearch onChange={search => this.handleSearch(search)} modifiers={['noMargin']}>
            Serch
          </BaseSearch>

        </Popover>
      </div>
    )
  }
}
export default GlobalSearch
