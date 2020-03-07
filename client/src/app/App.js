import React, {useState} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MenuBar from './MenuBar';
import About from './About';
import Tickets from './Tickets';
import Order from './Order';
import Performance from 'performance/Performance';
import Shows from './Shows';
import Visit from './Visit';
import Home from './Home';
import Login from './Login';

const App = () => {
  const [user, setUser] = useState({});
  return (
    <Router>
      <div className="app">
        <MenuBar user={user} />
        <div className="app-content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/shows" component={Shows} />
            <Route exact path="/tickets" component={Tickets} />
            <Route path="/tickets/:performanceId" children={<Performance user={user} />} />
            <Route path="/order/:orderId" component={Order} />
            <Route path="/visit" component={Visit} />
            <Route path="/about" component={About} />
            <Route path="/login" children={<Login user={user} setUser={setUser} />} />
            <Route path="*" component={Home} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
