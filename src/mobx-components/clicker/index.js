import React, {Fragment, Component} from 'react';
import menuStore from '../../stores/menuStore';

class Clicker extends Component {
    render(){
        // const show = this.props.show;
        return(
            <div style={{
                width: '50px',
                height: '50px',
                backgroundColor: 'yellow'
            }}
            onClick={()=>{
                console.log('toggle');
                this.props.toggleMenu();
            }}
            >
                clicker

            </div>
        )
    }
}

export default Clicker;;