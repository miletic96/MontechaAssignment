import './App.css';
import {BrowserRouter as  Router, Route, Routes } from 'react-router-dom';
import SearchUsers from "./SearchUsers";
import Home from "./Home";
import Assignment from './Assignment';
import 'semantic-ui-css/semantic.min.css';



function App() {
  return (
    <Router>
      <div className="App">
          <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/search" element={<SearchUsers/>} />
          <Route exact path="/assignment" element={<Assignment/>} />

            </Routes>
         

      

      </div>
    </Router>
  );
}

export default App;
