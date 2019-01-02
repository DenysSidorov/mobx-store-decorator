import React, { Component } from "react";
import ColorCircle from "./color-circle/index";
import Clicker from "./clicker/index";
import ClickerL from "./clickerLeft";
import ClickerR from "./clickerRight";

class App extends Component {
    render() {
        return (
            <div>
                <ColorCircle/>
                <Clicker/>
                <ClickerL/>
                <ClickerR/>
            </div>
        );
    }
}

export default App;
