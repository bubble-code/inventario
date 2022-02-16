import {routerMiddleware} from 'react-router-redux';
import {applyMiddleware,compose,createStore} from 'redux';
import thunk from 'redux-thunk';



export default()=>{
  const store = createStore(reducer)
  return store
}