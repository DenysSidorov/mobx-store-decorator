import React from "react";
import ReactDOM from "react-dom";
import App from "./mobx-components/index";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

import { useStrict } from 'mobx';
import leftMenuStore from './stores/menuStore';
import { Provider } from "mobx-react";
useStrict(true);

const stores = { leftMenuStore: leftMenuStore };

const Root = (
  <Provider {...stores}>
    <App/>
  </Provider>
);

ReactDOM.render(Root, document.getElementById("root"));
registerServiceWorker();
