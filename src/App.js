import React, {useContext, useState} from 'react';
import './App.css';
import {Input, Button} from 'antd'

const context = React.createContext()

function App() {
  const [state, setState] = useState({})

  return <context.Provider value={{
    ...state,
    set: v=>setState({...state, ...v})
  }}>
  
    <div className="App">
      <Header/>
    </div>
  </context.Provider>
}

function Header() {
  const ctx = useContext(context)

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
