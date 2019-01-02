import React, {Fragment, Component} from 'react';
import { observer } from 'mobx-react';
import menuStore from '../../store/menuStore';

// const  ColorCircle = observer(() => {

@observer class ColorCircle extends Component{
render(){
        console.log('Rerender!');
        // const show = this.props.show;
        // const show = menuStore.show;
        console.log(menuStore.show, 'color');
        return(
            <div style={{
             width: '100px',
             height: '100px',
                borderRadius: '50%',
             backgroundColor: menuStore.show === true ? 'green' : 'red'
            }}>
            </div>
        )
}}


export default ColorCircle;