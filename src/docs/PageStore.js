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
  <BasePage>
    <Container>
      <Title>
        Stores
      </Title>
      <P>
        Redux saga usage test, open up redux dev tools!
      </P>
      <Container>
        <ExampleRequestStarship />
      </Container>
      <Title modifiers="small">
        Docs
        {' '}
        <Emoji emoji="🤓" label="nerd" />
      </Title>
      <P>
        Store created for testing and examples purposes
      </P>
      <Subtitle>
        Actions
      </Subtitle>
      <SyntaxHighlighter>
        {`export const REQUEST_STARSHIP = 'REQUEST_STARWARS'
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
    </Container>
  </BasePage>
)

export default PageIndex
