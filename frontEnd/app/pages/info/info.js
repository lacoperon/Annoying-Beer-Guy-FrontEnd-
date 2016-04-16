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
    this.params = navParams.get('item'));
  }

  searchBeer(event, key) {
    if(event.target.value.length > 2) {
      this.beerService.searchBeer(event.target.value).subscribe(
        data => {this.beerList = data.results; console.log(data);},
        err => this.logError(err),
        () => console.log('Beer Search Complete')
      );
    }
  }

  itemTapped(event, item) {
    console.log(item);
  }
}
