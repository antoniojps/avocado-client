import React from 'react'
import {
  Title,
  P,
  Container,
  Subtitle,
  Emoji,
} from 'elements'
import {
  BasePage,
} from 'ui'
import ExampleRequestStarship from 'docs/ExampleRequestStarship'
import SyntaxHighlighter from 'docs/SyntaxHighlighter'

const PageIndex = () => (
  <BasePage page={{
    title: 'Documentation',
    subtitle: 'Store',
    description: 'Redux saga usage test, open up redux dev tools!',
  }}
  >
    <Title>
        Saga example
    </Title>
    <Container>
      <ExampleRequestStarship />
    </Container>
    <Title>
        Docs
      {' '}
      {/*
          children prop used to prevent eslint error
          jsx-a11y/accessible-emoji rule doesnt recogniza styled component as a span element
          this rule can only be disabled by ejecting
        */}
      <Emoji children="🤓" label="nerd" />
    </Title>
    <P>
        Store created for testing and examples purposes
    </P>
    <Subtitle>
        Actions
    </Subtitle>
    <SyntaxHighlighter>
      {`export const REQUEST_STARSHIP = 'REQUEST_STARSHIP'
export const REQUEST_STARSHIP_LOADING = 'REQUEST_STARSHIP_LOADING'
export const REQUEST_STARSHIP_SUCCESS = 'REQUEST_STARSHIP_SUCCESS'
export const REQUEST_STARSHIP_FAILURE = 'REQUEST_STARSHIP_FAILURE'

export const getStarship = () => ({
  type: REQUEST_STARSHIP,
})
`}
    </SyntaxHighlighter>
    <Subtitle>
        Reducer
    </Subtitle>
    <SyntaxHighlighter>
      {`...
const initialState = {
  starship: null,
  starshipLoading: false,
  starshipError: false,
}

export default function (state = initialState, action) {
  const { type, data } = action
  switch (type) {
    case REQUEST_STARSHIP_LOADING:
      return {
        ...state,
        starship: null,
        starshipLoading: true,
        starshipError: false,
      }
    case REQUEST_STARSHIP_SUCCESS:
      return {
        ...state,
        starship: data,
        starshipLoading: false,
        starshipError: false,
      }
    case REQUEST_STARSHIP_FAILURE:
      return {
        ...state,
        starship: null,
        starshipLoading: false,
        starshipError: true,
      }
    default:
      return state
  }
}
`}
    </SyntaxHighlighter>
    <Subtitle>
        Sagas
    </Subtitle>
    <SyntaxHighlighter>
      {`...
import { takeEvery, put, call } from 'redux-saga/effects'

...

const requestStarship = async () => axios.get('api/starships/9/')

// worker
function* getStarship() {
  yield put({ type: REQUEST_STARSHIP_LOADING })
  try {
    const { data } = yield call(requestStarship, 9)
    yield put({ type: REQUEST_STARSHIP_SUCCESS, data })
  } catch (err) {
    yield put({ type: REQUEST_STARSHIP_FAILURE, data: err })
  }
}

// watcher
const watchRequestStarship = function* () {
  yield takeEvery(REQUEST_STARSHIP, getStarship)
}

// export watcher iterators
export default [
  watchRequestStarship(),
]`}
    </SyntaxHighlighter>
  </BasePage>
)

export default PageIndex
