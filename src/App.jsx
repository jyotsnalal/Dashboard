import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Dashboard from './Components/Dashboard'
import store from './Redux/Store'
import './App.css'; 


function App() {
 
  return (
    <>
      <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </Provider>
    </>
  )
}

export default App
