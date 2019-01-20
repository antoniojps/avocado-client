import React from 'react'
import styled from 'styled-components'
import { BaseToggle } from 'ui'
import { Button } from 'elements'
import { Prism as BaseSyntaxHighlighter } from 'react-syntax-highlighter'
import { coy } from 'react-syntax-highlighter/dist/styles/prism'
import { Transition } from 'react-spring'

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
              </>
            )
            : (
              <Button modifiers="small" onClick={toggle}>
                Show code
              </Button>
            )}

          <Transition
            items={isOn}
            from={{ display: 'flex', opacity: 0, height: 0 }}
            enter={{ opacity: 1, height: 'auto' }}
            leave={{ opacity: 0, height: 0 }}
          >
            {isOn => (isOn
              && (props => (
                <div style={props}>
                  <BaseSyntaxHighlighter language="jsx" style={coy} customStyle={{ backgroundColor: 'white' }}>
                    {children}
                  </BaseSyntaxHighlighter>
                </div>
              )))
            }
          </Transition>
        </>
      )}
    </BaseToggle>
  </div>
)

export default styled(SyntaxHighlighter)`
  width: 100%;
  overflow: scroll;
`
