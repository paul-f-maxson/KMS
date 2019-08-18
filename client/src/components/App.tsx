import React from 'react';

import ThemeWrapper from './ThemeWrapper';
import Layout from './Layout';

/** Render the large scale application componenets
 *
 */
const App: React.FC = () => (
  <ThemeWrapper>
    <Layout />
  </ThemeWrapper>
);

export default App;
