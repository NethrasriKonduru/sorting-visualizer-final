import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loginpage from './pages/Loginpage';
import SortingVisualizer from './SortingVisualizer';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Loginpage} />
        <Route path="/sorting-visualizer" component={SortingVisualizer} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;