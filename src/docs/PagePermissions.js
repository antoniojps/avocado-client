import React from 'react'
import {
  Title,
  P,
  Subtitle,
  List,
} from 'elements'
import { BasePage } from 'ui'
import SyntaxHighlighter from 'docs/SyntaxHighlighter'
import BasePermission from 'user/BasePermission'

const PageElements = () => (
  <BasePage page={{
    title: 'Documentation',
    subtitle: 'Permissions',
  }}
  >
    <Title>BasePermission</Title>
    <P>This component is used to manage permissions in the frontend.</P>
    <Subtitle>Props:</Subtitle>
    <List>
      <li>required - string or array of permissions required - isRequired</li>
      <li>
        needs - string of
        {' '}
        {'"one" or "all"'}
      </li>
      <li>
        redirect - users without permissions will be redirected to this path
      </li>
      <li>
        children - can be function ((hasPermissions)
        {' '}
        {'=> '}
        {' '}
        ... ) or react node - isRequired
      </li>
    </List>
    <BasePermission required="invite users">
      <P modifiers="primary">User has invite-users permission</P>
      <P modifiers="small">
        {'Props: required="invite users"'}
      </P>
    </BasePermission>
    {/* <BasePermission required="eat avocados" redirect="/settings" /> */}

    <BasePermission required={['invite users', 'create units', 'make avocados']} needs="one">
      <P modifiers="primary">One of the permissions</P>
      <P modifiers="small">
        {'Props: required={[\'invite users\', \'create units\', \'make avocados\']} needs="one"'}
      </P>
    </BasePermission>


    <BasePermission required={['invite users', 'create units', 'ban antonio']} needs="all">
      {({ hasPermissions }) => (
        <>
          {hasPermissions ? <P>Has all permissions</P> : <P modifiers="primary">Doesnt have all permissions</P>}
        </>
      )}
    </BasePermission>

    <SyntaxHighlighter>
      {`import BasePermission from 'user/BasePermission'

<BasePermission required="invite users">
  <P>User has invite-users permission</P>
</BasePermission>

// <BasePermission required="eat avocados" redirect="/settings" />

<BasePermission required={['invite users', 'create units', 'make avocados']} needs="one">
  <P>One of the permissions</P>
</BasePermission>

<BasePermission required={['invite users', 'create units', 'ban antonio']} needs="all">
  {({ hasPermissions }) => (
    <>
      {hasPermissions ? <P>Has all permissions</P> : <P>Doesnt have all permissions</P>}
    </>
  )}
</BasePermission>`}
    </SyntaxHighlighter>
  </BasePage>
)

export default PageElements
