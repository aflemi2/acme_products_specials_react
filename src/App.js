import React, {Component} from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

const H2 = ()=> <h2>This week we have special products.</h2>;

class App extends Component {
  render(){
  return (
    <Router>
      <div>
        <Route component= { H2 } />
      </div>
    </Router>
  )
  }
}

export default App;
