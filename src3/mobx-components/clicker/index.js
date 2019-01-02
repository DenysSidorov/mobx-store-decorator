import React, {Fragment, Component} from 'react';
import menuStore from '../../store/menuStore';

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
                menuStore.toggleShow();
            }}
            >


            </div>
        )
    }
}

export default Clicker;;