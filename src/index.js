import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore} from "redux";
import {Provider} from "react-redux";





let defaultState = []

function reducer(state=defaultState,action){
switch(action.type){
    case 'FETCHVALUTES': {

        return {...action.payload}


    }
    default:return state
}
}


const store = createStore(reducer)

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>,
  document.getElementById('root')
);

reportWebVitals();
