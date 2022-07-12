import '../styles/App.css';
import {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {NavBar} from "./navigation/NavBar";
import {navLinks} from "../api/navConstants";
// import axiosConfig from '../api/axiosConfig.js'
import {FrontPage} from "./pages/FrontPage";

export function App() {


  useEffect(() => {
    // axiosConfig.get('/test_get/').then((response) => {
    //   setData(response.data);
    // })
  }, [])

  return (
    <Router>
      <div className="app">
        <NavBar settings={["Profile", "Logout"]}>
          <Routes>
            <Route path="" element={<FrontPage />} />
            {navLinks.map((link) => {
              return <Route path={link.url} element={link.element} key={link.url}>
                        {link.children.map((subLink) => {
                          return <Route path={link.url + subLink.url}
                                        element={subLink.element}
                                        key={subLink.url}/>
                        })}
                     </Route>
            })}
          </Routes>
        </NavBar>
      </div>
    </Router>
  );
}

export default App;
