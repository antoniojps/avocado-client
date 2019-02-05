import React from 'react'
import styled, { withTheme } from 'styled-components'
import { applyStyleModifiers } from 'styled-components-modifiers'
import { Icon } from 'elements'
import PropTypes from 'prop-types'
import { theme } from 'utilities'

const TAG_MODIFIERS = {
  purple: ({ theme }) => `
    background-color: ${theme.color.purple};
  `,
  gray: ({ theme }) => `
    background-color: ${theme.color.gray};
    color: ${theme.color.bgDark};
    font-weight: 400
    text-transform: none;
  `,
}

export const Tag = styled.div`
  display: inline-flex;
  padding: ${props => props.theme.spacing.xxxs} ${props => props.theme.spacing.xxms};
  border-radius: ${props => props.theme.value.borderRadius};
  background-color: ${({ theme, color }) => color || theme.color.blue};
  font-size: ${props => props.theme.size.xxxs};
  color: ${props => props.theme.color.baseInverse};
  text-transform: uppercase;
  margin-right: ${props => props.theme.spacing.xxs};
  margin-bottom: ${props => props.theme.spacing.xs};
  ${applyStyleModifiers(TAG_MODIFIERS)};
`

const TagWithData = ({
  icon, value, name, theme, color,
}) => (
  <TagIcon.Wrapper color={color}>
    <TagIcon.Left>
      <TagIcon.Icon>
        <Icon icon={icon} height={16} color={theme.color.baseInverse} />
      </TagIcon.Icon>
      {name}
    </TagIcon.Left>
    <TagIcon.Value>
      {value}
    </TagIcon.Value>
  </TagIcon.Wrapper>
)

TagWithData.propTypes = {
  icon: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
}

TagWithData.defaultProps = {
  icon: 'star',
  value: '100%',
  color: theme.color.danger,
}


TagWithData.Wrapper = styled(Tag)`
  display: flex;
  justify-content: space-between;
`

TagWithData.Left = styled.div`
  display: flex;
`

TagWithData.Icon = styled.div`
  display: flex;
  padding-right: ${props => props.theme.spacing.xxs};
`

TagWithData.Value = styled.div`

`

export const TagIcon = withTheme(TagWithData)
