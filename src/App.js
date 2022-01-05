import React from 'react';
import Basiclayout from './components/Layout/BasicLayout';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentUser:null
     }
  }
  render() { 
    return ( 
      <div>
        <Basiclayout/>
      </div>
     );
  }
}
 
export default App;