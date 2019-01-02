import React, { Component } from "react";
import ColorCircle from "./color-circle/index";
import Clicker from "./clicker/index";
import ClickerL from "./clickerLeft";
import ClickerR from "./clickerRight";

import { observer, inject } from 'mobx-react';
@inject("leftMenuStore")
@observer class App extends Component {
    render() {
        return (
            <div>
                <ColorCircle isOpenLeftPanel={this.props.leftMenuStore.isOpenLeftPanel}/>
                <Clicker toggleMenu={() => this.props.leftMenuStore.toggleLeftPanel()}/>
                <ClickerL/>
                <ClickerR/>
            </div>
        );
    }
}

export default App;
