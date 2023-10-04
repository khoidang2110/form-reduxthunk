import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { rootReducer } from "./redux/reducer/rootReducer.jsx";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const root = ReactDOM.createRoot(document.getElementById("root"));
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk))
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
