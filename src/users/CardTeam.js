import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  Title, Icon, Container, P,
} from 'elements'
import { above } from 'utilities'

const CardTeam = (props) => {
  const { team, renderDelete } = props
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
            <Icon icon="resources" />
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
          {renderDelete}
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

  ${above.sm`
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
  ${above.sm`
    flex-direction: row;
    ${P} {
      padding-left: ${props => props.theme.spacing.xs};
    }
  `}
`

Card.Actions = styled.div`
  padding: ${props => props.theme.spacing.xs};
  ${above.sm`
    padding: 0;
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
  ${above.sm`
      padding-left: ${props => props.theme.spacing.xs};

  `}
`

CardTeam.propTypes = {
  team: PropTypes.shape({}).isRequired,
  renderDelete: PropTypes.node.isRequired,
}

CardTeam.defaultProps = {}


export default CardTeam
