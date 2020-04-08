import React from 'react';
import { Provider } from "react-redux";
import { configureStore } from "../store/index";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";

import Navbar from "./Navbar";
import Main from "./Main";
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';

const store = configureStore();

if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);
  try{
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch (err){
    store.dispatch(setCurrentUser({}));
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="onboarding" >
          <Navbar />
          <Main />
        </div>
      </Router>
    </Provider>

  );
}

export default App;
