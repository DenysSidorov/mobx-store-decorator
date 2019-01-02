import React, { Component } from "react";
import ColorCircle from "./color-circle/index";
import Clicker from "./clicker/index";

class App extends Component {
    render() {
        return (
            <div>
                <ColorCircle/>
                <Clicker/>
            </div>
        );
    }
}

export default App;
