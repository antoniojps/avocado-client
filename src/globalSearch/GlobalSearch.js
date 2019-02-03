import React, { Component } from 'react'
import Popover from 'react-tiny-popover'
import { BaseBreakpoints, BaseSearch, BaseLoader } from 'ui'
import { PopUp } from 'elements'
import { ThemeProvider } from 'styled-components'
import { theme, globalSearch } from 'utilities'
import SearchResults from './SearchResults';


class GlobalSearch extends Component {
  state = {
    isPopoverOpen: false,
    data: {},
    isLoading: false,
  }

  getResults = async search => {
    this.setState({ isLoading: true });
    const { data } = await globalSearch(search);
    this.setState({ isLoading: false, data: data.data });
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
      isPopoverOpen, isLoading, data, data: { users, units, resources },
    } = this.state;

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
                {!isLoading && <SearchResults data={data} />}
              </PopUp>
            </ThemeProvider>
          )}
        >
          <BaseBreakpoints render={({ md }) => (
            <>
              <BaseSearch onChange={search => this.handleSearch(search)} modifiers={['noMargin']}>
                Serch
              </BaseSearch>
            </>
          )}
          />

        </Popover>
      </div>
    )
  }
}
export default GlobalSearch
