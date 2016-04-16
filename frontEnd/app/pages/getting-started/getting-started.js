import {Page, NavController} from 'ionic-angular';
import {ListPage} from '../list/list';

@Page({
  templateUrl: 'build/pages/getting-started/getting-started.html'
})
export class GettingStartedPage {
  static get parameters() {
    return [[NavController]];
  }	
  constructor(nav) {
    this.nav = nav;
  }

  doSearchBtnClick(event) {
    this.nav.push(ListPage);
  }  

}
