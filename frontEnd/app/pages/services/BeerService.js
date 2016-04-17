import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

export class BeerService {
	static get parameters() {
		return [[Http]];
	}

	constructor(http) {
		this.http = http
	}

	searchBeer(beerName) {
		var url = 'http://annoying-beer-guy.mybluemix.net/beer?address=1129%2014th%20St%20New%20York%20NY&' + 'abv=4';
		this.response = this.http.get(url).map(res => res.json());
	  return this.response;
	}
}
