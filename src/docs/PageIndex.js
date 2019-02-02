import React from 'react'
import {
  P,
} from 'elements'
import {
  BasePage,
} from 'ui'
import { Link } from 'react-router-dom'

const PageIndex = () => (
  <BasePage page={{
    title: 'Documentation',
  }}
  >
    <P>
      <Link to="/documentation/elements">
        Elements
      </Link>
      - html elements styled with styled components (paragraphs, titles, buttons, ...)
    </P>
    <P>
      <Link to="/documentation/components">
        Components
      </Link>
    - components that require more logic (Tabs, Loader, Switch, Rater, ...)
    </P>
    <P>
      <Link to="/documentation/store">
        Store
      </Link>
    - redux store example with saga request
    </P>
  </BasePage>
)

export default PageIndex
