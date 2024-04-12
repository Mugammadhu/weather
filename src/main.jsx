import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Weather } from './weather/Weather'


// const root = ReactDOM.createRoot(document.getElementById('root'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Weather />
  </React.StrictMode>,
)
