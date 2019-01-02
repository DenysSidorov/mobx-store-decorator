import { observable} from 'mobx';

class MenuStore {
    @observable show;

    constructor() {
        this.show = false;
    }

    toggleShow(){
        console.log('toggle in store', this.show);
        this.show = !this.show;
        console.log('toggle in store', this.show);
    }
}

const menuStore = new MenuStore();

export default menuStore;