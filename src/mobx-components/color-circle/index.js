import React, {Fragment, Component} from 'react';
import { observer } from 'mobx-react';
import menuStore from '../../stores/menuStore';

// const  ColorCircle = observer(() => {

class ColorCircle extends Component{
render(){
        // console.log('Rerender!');
        // const show = this.props.show;
        // const show = menuStore.show;
        // console.log(menuStore.show, 'color');
        console.log(this.props);
        return(
            <div style={{
             width: '100px',
             height: '100px',
                borderRadius: '50%',
             backgroundColor: this.props.isOpenLeftPanel === true ? 'green' : 'red'
            }}>
            </div>
        )
}}


export default ColorCircle;