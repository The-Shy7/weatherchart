import React, {useContext, useState} from 'react'
import './App.css'
import {Input, Button} from 'antd'
import {Bar} from 'react-chartjs-2'
import * as moment from 'moment'

const context = React.createContext()
const ButtonGroup = Button.Group

function App() {
  const [state, setState] = useState({
    searchTerm:'',
    mode:'hourly'
  })
  return <context.Provider value={{
    ...state,
    set: v=> setState({...state, ...v})
  }}>
    <div className="App">
      <Header />
      <Body />
    </div>
  </context.Provider>
}

function Header(){
  const ctx = useContext(context)
  const {loading, mode} = ctx
  return <header className="App-header">
    <Input 
      value={ctx.searchTerm} disabled={loading}
      onChange={e=> ctx.set({searchTerm: e.target.value})}
      style={{height:'3rem',fontSize:'2rem'}} 
      onKeyPress={e=>{
        if(e.key==='Enter' && ctx.searchTerm) search(ctx)
      }}
    />
    <Button style={{marginLeft:5,height:'3rem'}}
      onClick={()=> search(ctx)} type="primary"
      disabled={!ctx.searchTerm} loading={loading}>
      Search
    </Button>
    <ButtonGroup style={{marginLeft:5, display:'flex'}}>
      <Button style={{height:'3rem'}} type={mode==='hourly'?'primary':'default'} onClick={()=>ctx.set({mode:'hourly'})}>Hourly</Button>
      <Button style={{height:'3rem'}} type={mode==='daily'?'primary':'default'} onClick={()=>ctx.set({mode:'daily'})}>Daily</Button>
    </ButtonGroup>
  </header>
}

function Body(){
  const ctx = useContext(context)
  const {error, weather, mode} = ctx
  let data
  if(weather){
    console.log(weather)
    data = {
      labels: weather[mode].data.map(d=>moment(d.time*1000).format('ddd hh:mm')),
      datasets: [{
        label:'Temperature',
        data: weather[mode].data.map(d=>{
          if (mode==='hourly') return d.temperature
          else return (d.temperatureHigh+d.temperatureLow)/2
        }),
        backgroundColor: 'rgba(235,0,0,0.2)',
        borderColor: 'rgba(132,99,255,1)',
        hoverBackgroundColor: 'rgba(132,99,255,0.4)',
        hoverBorderColor: 'rgba(132,99,255,1)'
      }]
    }
  }
  console.log(data)
  return <div className="App-body">
    {error && <div className="error">{error}</div>}
    {data && <div>
      <Bar data={data}
        width={800} height={400}
      />
    </div>}
  </div>
}

async function search({searchTerm, set}){
  try {
    const term = searchTerm
    set({error:'', loading:true})

    const osmurl = `https://nominatim.openstreetmap.org/search/${term}?format=json`
    const r = await fetch(osmurl)
    const loc = await r.json()
    if(!loc[0]){
      return set({error:'No city matching that query'})
    }
    const city = loc[0]

    //const url = `/api?lat=${city.lat}&lon=${city.lon}`
    const key = 'ff44717dec09b51014ff551f271f55ed'
    const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${key}/${city.lat},${city.lon}`
    const r2 = await fetch(url)
    const weather = await r2.json()
    set({searchTerm:'', weather, loading:false})
  } catch(e) {
    set({error: e.message})
  }
}

export default App;
