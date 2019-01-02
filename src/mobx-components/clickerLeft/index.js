import React, {Fragment, Component} from 'react';
import menuStore from '../../stores/menuStore';

class Clicker extends Component {
    render(){
        // const show = this.props.show;
        return(
            <div style={{
                width: '50px',
                height: '50px',
                backgroundColor: 'blue'
            }}
            onClick={()=>{
                console.log('toggle');
                menuStore.closeLeftPanel();
            }}
            >
                LEFT

            </div>
        )
    }
}

export default Clicker;;