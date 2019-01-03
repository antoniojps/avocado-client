import styled from 'styled-components'
import { applyStyleModifiers } from 'styled-components-modifiers'
import { above } from 'utilities'

const CARD_MODIFIERS = {
  column: () => `
    flex-direction: column;
  `,
}

export const Card = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(-135deg, #408263 0%, #42705C 100%);
    color: white;
    ${above.md`
      background-image: linear-gradient(-180deg, #FFF090 0%, #FFDD57 100%);
    `}
    ${applyStyleModifiers(CARD_MODIFIERS)};
`
