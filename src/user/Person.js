
import React, { PureComponent } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Avatar, Icon } from 'elements';
import Popover from 'react-tiny-popover'
import { theme } from 'utilities'


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
              <Icon icon="logout" height={15} color="#000000" />
              <Logout>Log out</Logout>
            </ListItem>
          </ThemeProvider>
        )}
      >
        <Wrapper onClick={() => this.setState({ isPopoverOpen: !isPopoverOpen })}>
          {name}
          {avatar
            && (
              <Avatar>
                <Icon icon="avatar" height={30} color="#ffffff" />
              </Avatar>
            )
          }
          <Icon icon="arrow-down" height={15} color="#ffffff" />
        </Wrapper>
      </Popover>
    )
  }
}


const Wrapper = styled.div`
    margin-left: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
`

const ListItem = styled.div`
    cursor:pointer;
    display: flex;
    align-items: center;
    background: #fff;   
    padding: .8rem 1.2rem;
    border-radius: 8px;
    margin-top: 8px;
    &:hover {
    background: #e8e8e8
    }
`
const Logout = styled.div`
    margin-left: 4px;
`

export default Person;
