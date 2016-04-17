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
    this.categoryList = [];
  }

  searchBeer() {
      this.beerService.searchBeer('').subscribe(
        data => {
          self = this;
          this.beerList = data.beers;
          let categoryKeys = {}
          data.beers.forEach(function(beer) {
            beer.categories.forEach(function(category) {
              if (!categoryKeys[category]) {
                self.categoryList.push(category);
              }
              categoryKeys[category] = 1;
            });
          });
          this.beerListDisplay = data.beers;
          console.log(data);
          console.log(this.categoryList);
        },
        err => this.logError(err),
        () => console.log('Beer Search Complete')
      );
  }

  filterByCategory(event, cat) {
    console.log('filtering by ' + cat);
    this.beerListDisplay = this.beerList.filter(function (beer) {
      let result = false;
      beer.categories.forEach(function (val) {
        if (val == cat) {
          // console.log('matched');
          result = true;
        }
      });
      return result;
    });
  }

  clearFilter(event) {
    this.beerListDisplay = this.beerList;
  }

  itemTapped(event, beer) {
    console.log(beer);
    this.nav.push(InfoPage, {'beer': beer});
  }
}
