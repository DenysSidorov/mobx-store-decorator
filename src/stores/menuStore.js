import {observable, computed, action} from 'mobx';

class MenuStore {

    @observable show;

    constructor() {
        this.show = false;
    }

    @computed
    get isOpenLeftPanel() {
        return this.show
    }


    @action('toggle left panel')
    toggleLeftPanel() {
        // console.log('toggle in store', this.show);
        this.show = !this.show;
        // console.log('toggle in store', this.show);
    }


    @action('show left panel')
    openLeftPanel() {
        this.show = true;
    }

    @action('hide left panel')
    closeLeftPanel() {
        this.show = false;
    }
}

const menuStore = new MenuStore();

export default menuStore;