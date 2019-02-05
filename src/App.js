import React from 'react'
import { getTenant } from 'utilities';
import AppTenant from 'tenant/AppTenant';
import AppMain from 'main/AppMain';
import 'assets/toast.css';

const App = () => {
  const isTenant = getTenant()
  return isTenant ? <AppTenant /> : <AppMain />
};

export default App
