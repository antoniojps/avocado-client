import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Star from './BaseRaterStar'

class BaseRater extends Component {
  constructor(props) {
    super(props)
    const { rating, max } = props
    this.state = {
      isHovering: false,
      activeRating: rating,
      setRating: rating,
      maxRating: max,
    }
  }

  setRating = (setRating) => new Promise((resolve) => {
    this.setState({ setRating }, resolve)
  })

  setHoveringAndActiveState = ({ isHovering, activeRating }) => new Promise((resolve) => {
    this.setState({ isHovering, activeRating }, resolve)
  })

  onClick = async (clickedRating) => {
    const { onRate } = this.props
    await this.setRating(clickedRating)
    if (typeof onRate === 'function') onRate(clickedRating)
  }

  onMouseEnter = async (hoveredRating) => {
    const { onMouseEnterStar } = this.props
    await this.setHoveringAndActiveState({ isHovering: true, activeRating: hoveredRating })
    if (typeof onMouseEnterStar === 'function') onMouseEnterStar(hoveredRating)
  }

  onMouseLeave = async () => {
    const { onMouseLeave: onMouseLeaveFromParent } = this.props
    const { setRating } = this.state
    await this.setHoveringAndActiveState({ isHovering: false, activeRating: setRating })
    if (typeof onMouseLeaveFromParent === 'function') onMouseLeaveFromParent(setRating)
  }

  renderActiveStars = () => {
    const { isHovering, activeRating, setRating } = this.state
    const activeStars = []
    const numberOfStarsToRender = isHovering ? activeRating : setRating
    for (
      let currentRating = 1;
      currentRating <= numberOfStarsToRender;
      currentRating += 1
    ) {
      activeStars.push((
        <Star
          onClick={() => this.onClick(currentRating)}
          onMouseEnter={() => this.onMouseEnter(currentRating)}
          key={currentRating}
          isActive
        />
      ))
    }
    return activeStars
  }

  renderDisabledStars = () => {
    const {
      maxRating,
      isHovering,
      activeRating,
      setRating,
    } = this.state
    const currentDisabledRating = isHovering ? activeRating + 1 : setRating + 1
    const disabledStars = []
    for (
      let currentRating = currentDisabledRating;
      currentRating <= maxRating;
      currentRating += 1
    ) {
      disabledStars.push((
        <Star
          onClick={() => this.onClick(currentRating)}
          onMouseEnter={() => this.onMouseEnter(currentRating)}
          key={currentRating}
          isActive={false}
        />
      ))
    }
    return disabledStars
  }

  renderStars = () => {
    const ActiveStars = this.renderActiveStars()
    const DisabledStars = this.renderDisabledStars()
    return [...ActiveStars, ...DisabledStars]
  }

  render() {
    const { className } = this.props
    return (
      <Rater className={className} onMouseLeave={this.onMouseLeave}>
        {this.renderStars()}
      </Rater>
    )
  }
}

BaseRater.propTypes = {
  rating: PropTypes.number,
  max: PropTypes.number,
  onRate: PropTypes.func,
  onMouseEnterStar: PropTypes.func,
  onMouseLeave: PropTypes.func,
}

BaseRater.defaultProps = {
  rating: 0,
  max: 5,
  onRate: null,
  onMouseEnterStar: null,
  onMouseLeave: null,
}

const Rater = styled.div`
  display: inline-flex;
`

export default styled(BaseRater)`
  display: inline-flex;
`
