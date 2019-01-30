import React from "react";
import ReactDOM from "react-dom";
import App from "./components/index";
import registerServiceWorker from "./registerServiceWorker";
// import "./index.css";
import st from './styles/convertedFromSCSS.css';

import { useStrict } from 'mobx';
import zipCodeStore from './stores/zipCodeStore';
import { Provider } from "mobx-react";
useStrict(true);

const stores = { zipCodeStore };

const Root = (
  <Provider {...stores}>
    <App/>
  </Provider>
);

ReactDOM.render(Root, document.getElementById("root"));
registerServiceWorker();
