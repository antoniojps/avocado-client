
import React, { PureComponent } from 'react'
import styled, { ThemeProvider, withTheme } from 'styled-components'
import { Avatar, Icon } from 'elements';
import { BaseBreakpoints } from 'ui'
import Popover from 'react-tiny-popover'
import { theme } from 'utilities'
import { lighten } from 'polished'

class Person extends PureComponent {
  state = {
    isPopoverOpen: false,
  }


  logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }

  render() {
    const { avatar, name } = this.props;
    const { isPopoverOpen } = this.state;
    return (
      <Popover
        padding={0}
        isOpen={isPopoverOpen}
        onClickOutside={() => this.setState({ isPopoverOpen: false })}
        position="bottom" // preferred position
        content={(
          <ThemeProvider theme={theme}>
            <ListItem onClick={this.logout}>
              <Icon icon="logout" height={15} />
              <Logout>Log out</Logout>
            </ListItem>
          </ThemeProvider>
        )}
      >
        <Wrapper onClick={() => this.setState({ isPopoverOpen: !isPopoverOpen })}>
          <BaseBreakpoints render={({ md }) => (md
            && name
          )}
          />
          {avatar
            && (
              <Avatar>
                <Icon icon="avatar" height={30} color="#ffffff" />
              </Avatar>
            )
          }
          <Icon icon="arrow-down" height={16} color="#ffffff" />
        </Wrapper>
      </Popover>
    )
  }
}


const Wrapper = styled.div`
    margin-left: ${props => props.theme.spacing.xxs};
    display: flex;
    align-items: center;
    cursor: pointer;
`

const ListItem = styled.div`
    cursor:pointer;
    display: flex;
    align-items: center;
    background: ${props => props.theme.color.bg};
    padding: ${props => `${props.theme.spacing.xs} ${props.theme.spacing.xms}`};
    border-radius: ${props => props.theme.value.borderRadius};
    margin-top: ${props => props.theme.spacing.xxs};
    &:hover {
    background: ${props => lighten(0.4, props.theme.color.baseLighter)};
    }
`
const Logout = styled.div`
    margin-left: ${props => props.theme.spacing.xxxs};
`

export default withTheme(Person);
