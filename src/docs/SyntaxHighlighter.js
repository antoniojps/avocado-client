import React from 'react'
import styled from 'styled-components'
import { BaseToggle } from 'ui'
import { Button } from 'elements'
import { Prism as BaseSyntaxHighlighter } from 'react-syntax-highlighter'
import { coy } from 'react-syntax-highlighter/dist/styles/prism'


const SyntaxHighlighter = ({ children, className }) => (
  <div className={className}>
    <BaseToggle>
      {({ isOn, toggle }) => (
        <>
          {isOn
            ? (
              <>
                <Button modifiers={['primary', 'small']} onClick={toggle}>
                  Hide code
                </Button>
                <BaseSyntaxHighlighter language="jsx" style={coy} customStyle={{ backgroundColor: 'white' }}>
                  {children}
                </BaseSyntaxHighlighter>
              </>
            )
            : (
              <Button modifiers="small" onClick={toggle}>
                Show code
              </Button>
            )}
        </>
      )}
    </BaseToggle>
  </div>
)

export default styled(SyntaxHighlighter)`
  width: 100%;
  overflow: scroll;
`
