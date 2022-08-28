import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import 'antd/dist/antd.min.css';
import { Provider } from "react-redux";
import Chart from 'chart.js/auto';

import store from "./app/store";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
