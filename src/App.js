import React from 'react'
import { getTenant } from 'utilities';
import AppTenant from 'tenant/AppTenant';
import AppMain from 'main/AppMain';

const App = () => {
  const isTenant = getTenant()
  return isTenant ? <AppTenant /> : <AppMain />
};

export default App
