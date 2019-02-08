import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  Title, Icon, Container, P,
} from 'elements'
import { above } from 'utilities'
import withAuth from 'user/withAuth'
import BasePermission from 'user/BasePermission'
import { DELETE_USERS } from 'user/permissions'

const CardTeam = (props) => {
  const { team, renderDelete, warmup: { id: idLogged } } = props
  const {
    name,
    id,
    email,
  } = team

  return (
    <Card>
      <Card.Team>
        <Card.Container>
          <Card.Section>
            <Icon icon="user" />
            <Title modifiers={['noMargin']}>
              {name}
            </Title>
            <P>
              {email}
            </P>
            <Id>
              {id}
            </Id>
          </Card.Section>
        </Card.Container>
        <Card.Actions>
          <BasePermission required={DELETE_USERS}>
            {idLogged !== id && renderDelete}
          </BasePermission>
        </Card.Actions>
      </Card.Team>
    </Card>
  )
}

const Card = styled(Container)`
  width: 100%;
  padding: 0;
`

Card.Team = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: ${props => `${props.theme.spacing.xms} ${props.theme.spacing.base}`};
  ${Title} {
    padding-left: 0;
    font-size: ${props => props.theme.size.ls};
    font-weight: 500;
  }

  ${above.md`
    ${Title} {
        padding-left: ${props => props.theme.spacing.xs};
      }
    flex-direction: row;
  `}
`

Card.Container = styled.div`
  display: flex;
`

Card.Section = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-left: 0;
  ${P} {
    padding-bottom: 0;
    padding-left: 0;
  }
  ${above.md`
    flex-direction: row;
    ${P} {
      padding-left: ${props => props.theme.spacing.xs};
    }
  `}
`

Card.Actions = styled.div`
  margin-top: ${props => props.theme.spacing.xs};
  width: 100%;
  button {
    width: 100%;
  }
  ${above.md`
    margin-top: 0;
    width: auto;
    button {
      width: auto;
    }
  `}
`

const Id = styled.div`
  color: ${props => props.theme.color.baseLighter};
  font-style: italic;
  font-size: ${props => props.theme.size.xxxs};
  padding-left: 0;
  &:before {
    content: '#';
  }
  ${above.md`
      padding-left: ${props => props.theme.spacing.xs};

  `}
`

CardTeam.propTypes = {
  team: PropTypes.shape({}).isRequired,
  renderDelete: PropTypes.node.isRequired,
}

CardTeam.defaultProps = {}


export default withAuth(CardTeam)
