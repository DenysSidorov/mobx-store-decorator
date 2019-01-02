import { observable, decorate} from 'mobx';

class MenuStore {
    // @observable show;

    constructor() {
        this.show = false;
    }

    toggleShow(){
        console.log('toggle in store');
        this.show = !this.show;
    }
}
decorate(MenuStore, {
    show: observable
})
const menuStore = new MenuStore();

export default menuStore;