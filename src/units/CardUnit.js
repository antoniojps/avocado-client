import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { BaseToggleAnimated } from 'ui'
import {
  Title, Icon, Container, P,
} from 'elements'
import { above } from 'utilities'
import CardUnitRiskFactor from './CardUnitRiskFactor'

class CardUnit extends Component {
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
    const { unit, renderEdit, renderDelete } = this.props
    const { isExpanded, collapseIcon } = this.state

    const {
      name,
      description,
      address,
      id,
      factor,
    } = unit

    return (
      <Card>
        <Card.Unit onClick={this.onCollapse}>
          <Card.Container>
            <Card.Section>
              <Icon icon="unit" />
              <Title modifiers={['noMargin']}>
                {name}
              </Title>
              {address
                && (
                  <P>
                    {address}
                  </P>
                )
              }
            </Card.Section>
          </Card.Container>
          <Card.CollapseIcon>
            <Icon icon={collapseIcon} />
          </Card.CollapseIcon>
        </Card.Unit>
        <BaseToggleAnimated isOn={isExpanded}>
          <Card.Expanded>
            {(factor && factor.percent) && (
              <CardUnitRiskFactor percent={factor.percent} />
            )}
            <P>
              {description}
            </P>
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

Card.Unit = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => `${props.theme.spacing.xms} ${props.theme.spacing.base}`};
  ${Title} {
    padding-left: ${props => props.theme.spacing.xs};
    font-size: ${props => props.theme.size.ls};
    font-weight: 500;
  }
`

Card.Container = styled.div`
  display: flex;
`

Card.Section = styled.div`
  display: flex;
  align-items: center;
  margin-left: ${props => props.theme.spacing.xs};
  ${P} {
    padding-bottom: 0;
    padding-left: ${props => props.theme.spacing.xs};
  }
`

Card.CollapseIcon = styled.div`
  cursor: pointer;
`

Card.Expanded = styled.div`
  width: 100%;
  padding: ${props => `${props.theme.spacing.xms} ${props.theme.spacing.base}`};
  padding-right: 0;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

Footer.Id = styled.div`
  width: 100px;
  color: ${props => props.theme.color.baseLighter};
  font-style: italic;
  &:before {
    content: '#';
  }
`

Footer.Actions = styled.div`
  width: 200px;
  text-align: right;
  button {
    margin-right: ${props => props.theme.spacing.xs};
  }
`

CardUnit.propTypes = {
  unit: PropTypes.shape({}).isRequired,
  renderEdit: PropTypes.node.isRequired,
  renderDelete: PropTypes.node.isRequired,
}

CardUnit.defaultProps = {}


export default CardUnit
