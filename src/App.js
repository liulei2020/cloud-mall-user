import React from 'react';
//import logo from './logo.svg';
import { HashRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import './App.css';
import '../node_modules/antd/dist/antd.css';
import Login from './pages/login';
import alipay from './pages/alipay';
import cart from './pages/cart';
import detail from './pages/detail';
import footer from './pages/footer';
import header from './pages/header';
import index from './pages/index';
import my_orders from './pages/my-orders';
import order_detail from './pages/order-detail';
import order_settle from './pages/order-settle';
import persona_sidebar from './pages/personal-sidebar';
import personal from './pages/personal';
import register from './pages/register';
import search from './pages/search';




function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/index" />} />
            <Route key={'alipay'} path={'/alipay'} component={alipay} />
            <Route key={'cart'} path={'/cart'} component={cart} />
            <Route key={'detail'} path={'/detail'} component={detail} />
            <Route key={'login'} path={'/login'} component={Login} />
            <Route key={'footer'} path={'/footer'} component={footer} />
            <Route key={'header'} path={'/header'} component={header} />
            <Route key={'index'} path={'/index'} component={index} />
            <Route key={'orders'} path={'/orders'} component={my_orders} />
            <Route key={'order_detail'} path={'/order_detail'} component={order_detail} />
            <Route key={'order_settle'} path={'/order_settle'} component={order_settle} />
            <Route key={'persona_sidebar'} path={'/persona_sidebar'} component={persona_sidebar} />
            <Route key={'personal'} path={'/personal'} component={personal} />
            <Route key={'register'} path={'/register'} component={register} />
            <Route key={'search'} path={'/search'} component={search} />
 
          </Switch>
        </Router>
    </div>
  );
}

export default App;
