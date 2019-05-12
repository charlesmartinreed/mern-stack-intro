import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import "./App.css";

import { Provider } from "react-redux";
import store from "./store";

// Provider provides a means of sharing state, kept in the store, across the entire App
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <ShoppingList />
      </div>
    </Provider>
  );
}

export default App;
