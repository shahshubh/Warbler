import React from 'react';
import { Provider } from "react-redux";
import { configureStore } from "../store/index";
import { BrowserRouter as Router, Route } from "react-router-dom";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          Hello World !!
        </div>
      </Router>
    </Provider>

  );
}

export default App;
