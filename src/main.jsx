// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )


// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import { AuthProvider } from './contexts/AuthContext.jsx'
// import { BrowserRouter } from 'react-router-dom'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AuthProvider>
//         <App />
//       </AuthProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// )

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { ShipsProvider } from './contexts/ShipsContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ShipsProvider>
          <App />
          <ToastContainer position="top-right" autoClose={3000} />
        </ShipsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
