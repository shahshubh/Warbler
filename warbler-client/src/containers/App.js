import React from 'react';
import { Provider } from "react-redux";
import { configureStore } from "../store/index";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./Navbar";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="onboarding" >
          <Navbar />
        </div>
      </Router>
    </Provider>

  );
}

export default App;
