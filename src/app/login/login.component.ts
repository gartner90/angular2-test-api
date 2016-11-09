import { Component, OnInit } from '@angular/core';
import { ApiRestService } from '../api-rest.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
	public user = JSON.parse(localStorage.getItem('userLoged'));
	email;
	password;
	loginForm;
	errorMessage;

	constructor(
		private ApiRestService: ApiRestService,
		private router: Router,
		fb: FormBuilder
		) { 
		this.loginForm = fb.group({
			email: ["", Validators.required],
			password: ["", Validators.required]
		});
	}

	ngOnInit() : void {
		//Init Function;
		
	}

	sumbitLogin() {
		this.ApiRestService.getToken(this.email, this.password).subscribe(
			(response) => {
				this.getLogin(response.access_token);
				return response;

			},(error) => {
				console.error(error, " Error");
				this.errorMessage = error.statusText;
				return error;
			}
		);
	}

	getLogin(token) {
		this.ApiRestService.getUser(token).subscribe(
			(response) => {
				response.token = token;
				localStorage.setItem('userLoged', JSON.stringify(response));
				this.router.navigate(['/profile']);				
			},(response) => {
				console.log(response.error, "Error");
			}
		);
	}

	goToApp() {
		this.router.navigate(['/profile']);
	}

}
