import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ApiRestService {

	private urlApi = 'https://express-api-test.herokuapp.com/api/v1/';
	  
	constructor(private http:Http) { }

	getToken(email, password) {
	    let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    let url = this.urlApi + 'auth/token?grant_type=password&client_id=a823jkas87y3kjakjhsd&&client_secret=dksu287aokjfaouiusdia7127a5skd&username=' + email + '&password=' + password;
	    return this.http.post(url, headers).map((res: Response) => res.json());
	}

	getUser(token) {
	    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
	    let options = new RequestOptions({ headers: headers });
	    let url = this.urlApi + 'profile';
	    return this.http.get(url, options).map((res: Response) => res.json());
	}

	putPassword(token, data) {
	    let url = this.urlApi + 'profile/changepassword';
	    let bodyString = JSON.stringify(data); 
        let headers = new Headers({ 'Authorization': 'Bearer ' + token });
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
	    return this.http.put(url, bodyString, options).map((res: Response) => res.json());
	}

	patchProfile(token, data) {
	    let url = this.urlApi + 'profile';
	    let bodyString = JSON.stringify(data); 
        let headers = new Headers({ 'Authorization': 'Bearer ' + token });
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
	    return this.http.patch(url, bodyString, options).map((res: Response) => res.json());
	}


}
