import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import ProductNew from '../pages/ProductNew';
import ProductEdit from '../pages/ProductEdit';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/products" component={Home} />
        <Route exact path="/products/new" component={ProductNew} />
        <Route exact path="/products/:productId/edit" component={ProductEdit} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;