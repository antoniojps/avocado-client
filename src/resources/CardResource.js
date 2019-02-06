import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { BaseToggleAnimated } from 'ui'
import {
  Title, Icon, Container, P, TagIcon,
} from 'elements'
import { above } from 'utilities'

class CardResource extends Component {
  state = {
    isExpanded: false,
    collapseIcon: 'expandMore',
  }

  onCollapse = () => {
    const { isExpanded } = this.state
    const collapseIcon = isExpanded ? 'expandMore' : 'expandLess'
    this.setState(({ isExpanded }) => ({ isExpanded: !isExpanded, collapseIcon }))
  }

  render() {
    const { resource, renderEdit, renderDelete } = this.props
    const { isExpanded, collapseIcon } = this.state

    const {
      name,
      id,
      description,
      type,
    } = resource

    return (
      <Card>
        <Card.Resource onClick={this.onCollapse}>
          <Card.Container>
            <Card.Section>
              <Icon icon="resources" />
              <Title modifiers={['noMargin']}>
                {name}
              </Title>
            </Card.Section>
          </Card.Container>
          <Card.CollapseIcon>
            <Icon icon={collapseIcon} />
          </Card.CollapseIcon>
        </Card.Resource>
        <BaseToggleAnimated isOn={isExpanded}>
          <Card.Expanded>
            {description
              && (<P>{description}</P>)}
            {type
            && (<TagIcon icon="risk" name="Risk factor" value="tipo" color="red" />
            )}
            <Footer>
              <Footer.Id>
                {id}
              </Footer.Id>
              <Footer.Actions>
                {renderDelete}
                {renderEdit}
              </Footer.Actions>
            </Footer>
          </Card.Expanded>
        </BaseToggleAnimated>
      </Card>
    )
  }
}


const Card = styled(Container)`
  width: 100%;
  padding: 0;
`

Card.Resource = styled.div`
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

Card.CollapseIcon = styled.div`
  cursor: pointer;
`

Card.Expanded = styled.div`
  width: 100%;
  padding: ${props => `${props.theme.spacing.xms} ${props.theme.spacing.base}`};
  padding-right: 0;
  padding-top: 0;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

Footer.Id = styled.div`
  color: ${props => props.theme.color.baseLighter};
  font-style: italic;
  &:before {
    content: '#';
  }
`

Footer.Actions = styled.div`
  display: flex;
  text-align: right;
  button {
    margin-right: ${props => props.theme.spacing.xs};
  }
`

CardResource.propTypes = {
  resource: PropTypes.shape({}).isRequired,
  renderEdit: PropTypes.node.isRequired,
  renderDelete: PropTypes.node.isRequired,
}

CardResource.defaultProps = {}


export default CardResource
