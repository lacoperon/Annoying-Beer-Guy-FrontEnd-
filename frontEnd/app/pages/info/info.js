import {Page, NavController, NavParams} from 'ionic-angular';
import {BeerService} from '../services/BeerService';
@Page({
  templateUrl: 'build/pages/info/info.html',
  providers: [BeerService]
})
export class InfoPage {
  static get parameters() {
    return [[NavController], [BeerService], [NavParams]];
  }

  constructor(nav, beerService, navParams) {
    this.nav = nav;
    this.beerService = beerService;
    this.beer = navParams.get('beer');
  }

}
