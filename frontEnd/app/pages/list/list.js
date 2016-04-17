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
    this.beerList = [];
    this.beerListDisplay = [];
    this.categoryList = [];
    this.showSearchBox = true;
    this.searchBtnText = "Search";
    this.currentCategory = "";
  }

  searchBeer() {
      this.searchBtnText = "Searching..."
      this.beerService.searchBeer('').subscribe(
        data => {
          console.log(data);
          self = this;
          this.showSearchBox = false;
          this.beerList = data.beers;
          let categoryKeys = {}
          data.beers.forEach(function(beer) {
            if (beer.categories) {
              beer.categories.forEach(function(category) {
                if (!categoryKeys[category]) {
                  self.categoryList.push(category);
                }
                categoryKeys[category] = 1;
              });
            }
          });
          this.beerListDisplay = data.beers;
          console.log(this.categoryList);
        },
        err => this.logError(err),
        () => {
          this.searchBtnText = "Search";
          console.log('Beer Search Complete');
        }
      );
  }

  filterByCategory(event, cat) {
    console.log('filtering by ' + cat);
    this.currentCategory = cat;
    this.beerListDisplay = this.beerList.filter(function (beer) {
      var result = false;
      if (beer.categories) {
        beer.categories.forEach(function (val) {
          if (val == cat) {
            result = true;
          }
        });
      }
      return result;
    });
  }

  clearFilter(event) {
    this.beerListDisplay = this.beerList;
  }

  clearSearch(event) {
    this.beerList = [];
    this.beerListDisplay = [];
    this.showSearchBox = true;
    this.categoryList = [];
    this.currentCategory = '';
  }

  selectBeer(beer) {
    beer.selected = true;
  }

  itemTapped(event, beer) {
    console.log(beer);
    this.nav.push(InfoPage, {'beer': beer});
  }
}
