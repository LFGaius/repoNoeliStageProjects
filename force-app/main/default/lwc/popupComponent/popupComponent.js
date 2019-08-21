import { LightningElement } from 'lwc';

export default class PopupComponent extends LightningElement {
    signalPopupClosing(){
        // eslint-disable-next-line no-console
        console.log("Yo");
        const ev=new CustomEvent('closepop');
        this.dispatchEvent(ev);
    }
}