import React, {useContext, useState} from 'react';
import './App.css';
import {Input, Button} from 'antd'

const context = React.createContext()

function App() {
  const [state, setState] = useState({
    searchTerm:''
  })

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
      value={ctx.searchTerm}
      onChange={e => ctx.set({searchTerm: e.target.value})}
      style={{height:'3rem',fontSize:'2rem'}}
      onKeyPress={e=>{
        if (e.key === 'Enter' && ctx.searchTerm) search(ctx)
      }}
    />
    <Button style={{marginLeft:5,height:'3rem'}}
      onClick={() => search(ctx)} type="primary"
      disabled={!ctx.searchTerm}>
      Search
    </Button>
  </header>
}

function search({searchTerm, setSearchTerm}) {

}

export default App;
