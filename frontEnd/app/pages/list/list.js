import {Page, NavController, NavParams} from 'ionic-angular';
import {BeerService} from '../services/BeerService';

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
    console.log('itemTapped');
  }
}
