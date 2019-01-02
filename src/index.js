import React from "react";
import ReactDOM from "react-dom";
import { useStrict } from 'mobx';
import "./index.css";
import App from "./mobx-components/index";
import registerServiceWorker from "./registerServiceWorker";
import leftMenuStore from './stores/menuStore';

import { Provider } from "mobx-react";
import UiStore from "./stores/UiStore";

useStrict(true);
const stores = { leftMenuStore };


const Root = (
  <Provider UiStore={UiStore} {...stores}>
    <App/>
  </Provider>
);

ReactDOM.render(Root, document.getElementById("root"));
registerServiceWorker();
