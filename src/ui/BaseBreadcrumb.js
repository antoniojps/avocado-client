import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { withRouter, NavLink } from 'react-router-dom'
import { takeRight } from 'lodash'
import { Icon } from 'elements'
import { applyStyleModifiers } from 'styled-components-modifiers'
import { hyphenToSpace } from 'utilities'

class BaseBreadcrumb extends Component {
  getPathFromTitle = (title) => {
    const { location: { pathname } } = this.props
    const basePath = pathname.split('/').slice(1)
    const indexOfTitle = basePath.indexOf(title)
    const toPath = `/${basePath.slice(0, indexOfTitle + 1).join('/')}`
    return toPath
  }

  getTitles = () => {
    const { location: { pathname } } = this.props
    const [parentTitle, childTitle] = takeRight(pathname.split('/').slice(1), 2)
    return {
      parent: (parentTitle && {
        title: hyphenToSpace(parentTitle),
        to: this.getPathFromTitle(parentTitle),
      }) || null,
      child: (childTitle && {
        title: hyphenToSpace(childTitle),
        to: this.getPathFromTitle(childTitle),
      }) || null,
    }
  }

  render() {
    const titles = this.getTitles()
    const { parent, child } = titles
    const { modifiers, parentVisible, basePage } = this.props

    return (
      <Breadcrumb modifiers={modifiers}>
        {
          basePage
          && (
            <>
              <Breadcrumb.Title>
                <NavLink to={basePage.to} exact>
                  {basePage.title}
                </NavLink>
              </Breadcrumb.Title>
            </>
          )
        }
        {
          (parentVisible && parent)
          && (
            <>
              <Breadcrumb.Arrow>
                <Icon icon="chevron-right" height={12} modifiers={modifiers} />
              </Breadcrumb.Arrow>
              <Breadcrumb.Title>
                <NavLink to={parent.to} exact>
                  {parent.title}
                </NavLink>
              </Breadcrumb.Title>
            </>
          )
        }
        {child
          && (
            <>
              <Breadcrumb.Arrow>
                <Icon icon="chevron-right" height={12} modifiers={modifiers} />
              </Breadcrumb.Arrow>
              <Breadcrumb.Title>
                <NavLink to={child.to} exact>
                  {child.title}
                </NavLink>
              </Breadcrumb.Title>
            </>
          )}
      </Breadcrumb>
    )
  }
}

const BREADCRUMB_MODIFIERS = {
  inverse: ({ theme }) => `
    ${Breadcrumb.Title} {
      a {
        color: ${theme.color.baseInverse};
      }
    }
  `,
}

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  ${applyStyleModifiers(BREADCRUMB_MODIFIERS)};
`

const TITLE_MODIFIERS = {
  inverse: ({ theme }) => `
    color: ${theme.color.baseInverse};
  `,
}

Breadcrumb.Title = styled.div`
  text-transform: capitalize;
  padding: 0;
  font-size: ${props => props.theme.size.sm};
  font-weight: bold;
  a {
    text-decoration: none;
    color: ${props => props.theme.color.base};
    opacity: 0.4;
    transition: opacity ${props => props.theme.value.transition};
    &:hover {
      opacity: 1;
    }
    &.active {
      opacity: 1;
    }
  }
  ${applyStyleModifiers(TITLE_MODIFIERS)};
`

Breadcrumb.Arrow = styled.div`
  margin-right: ${props => props.theme.spacing.xms};
  margin-left: ${props => props.theme.spacing.xms};
  opacity: 0.4;
`

BaseBreadcrumb.propTypes = {
  modifiers: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  parentVisible: PropTypes.bool,
  basePage: PropTypes.shape({
    title: PropTypes.string,
    to: PropTypes.string,
  }),
}

BaseBreadcrumb.defaultProps = {
  modifiers: [],
  parentVisible: true,
  basePage: null,
}

export default withRouter(BaseBreadcrumb)
