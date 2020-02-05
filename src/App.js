import React, {useContext} from 'react';
import './App.css';
import {Input, Button} from 'antd'

const context = React.createContext()

function App() {
  return (
    <div className="App">
      <Header/>
    </div>
  );
}

function Header() {
  return <header className="App-header">
    <Input 
      style={{height:'3rem',fontSize:'2rem'}}
    />
    <Button style={{marginLeft:5,height:'3rem'}}>
      Search
    </Button>
  </header>
}

export default App;
