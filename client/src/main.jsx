import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './App'
import { Routing } from './Application'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
)
