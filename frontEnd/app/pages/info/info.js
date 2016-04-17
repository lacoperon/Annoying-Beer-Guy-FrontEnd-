import {Page, Platform, NavController, NavParams} from 'ionic-angular';
import {BeerService} from '../services/BeerService';
@Page({
  templateUrl: 'build/pages/info/info.html',
  providers: [BeerService]
})
export class InfoPage {
  static get parameters() {
    return [[NavController], [BeerService], [NavParams], [Platform]];
  }

  constructor(nav, beerService, navParams, platform) {
    this.nav = nav;
    this.beerService = beerService;
    this.beer = navParams.get('beer');
    this.platform = platform
  }

  launch(url) {
      this.platform.ready().then(() => {
          cordova.InAppBrowser.open(url, "_system", "location=true");
      });
  }

}
