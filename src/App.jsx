import './App.css'
import DepenseForm from './component/DepenseForm'
import { useReducer } from 'react'

const initialState={
  depenses:[],
  total:0
}
const reducer=(state,action)=>{
  switch(action.type){
    case "add":
      return {
        ...state,
        depenses:[...state.depenses,action.payload],
        total:state.total + Number(action.payload.prix)
      }
      
  }
}
function App() {
  const [state,dispatch]=useReducer(reducer,initialState)

  return (
    <>
    <DepenseForm dispatch={dispatch} />
    <h1>Total {state.total}$ </h1>
    {state.depenses.map((dep)=>{
      return (<div> 
        <h1>  {dep.categorie} </h1>
        <h2> {dep.description} </h2>
        <h3> {dep.prix} </h3>
         </div>)
    }
     )}
    </>
  )
}

export default App
