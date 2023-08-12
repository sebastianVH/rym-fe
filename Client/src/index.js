import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import {store } from './redux/store'
import axios from 'axios'

axios.defaults.baseURL = "https://rym-be-production.up.railway.app" //proyecto deploy
// axios.defaults.baseURL = "https://localhost:3001" //proyecto local


ReactDOM.render(
  <Provider store = {store}> 
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </Provider>,
    document.getElementById('root')
)
