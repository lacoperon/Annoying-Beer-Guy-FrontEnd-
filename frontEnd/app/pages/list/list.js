import {Page, NavController, NavParams} from 'ionic-angular';
import {Modal, ViewController} from 'ionic-angular';
import {BeerService} from '../services/BeerService';
import {InfoPage} from '../info/info';

@Page({
  templateUrl: 'build/pages/list/list.html',
  providers: [BeerService]
})
export class ListPage {
  static get parameters() {
    return [[NavController], [BeerService]];
  }

  constructor(nav, beerService) {
    this.nav = nav;
    this.beerService = beerService;
  }

  searchBeer() {
      this.beerService.searchBeer('dead').subscribe(
        data => {this.beerList = data.beers; console.log(data);},
        err => this.logError(err),
        () => console.log('Beer Search Complete')
      );
  }

  itemTapped(event, item) {
    console.log(item);
    this.nav.push(InfoPage, {'item': item});
  }
}
