import { Component, OnInit } from '@angular/core';
import { ApiRestService } from '../api-rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	public user = JSON.parse(localStorage.getItem('userLoged'));
	totalStars = 5;
	currentStars = [];
	currentTab = 'about';
	openPopEdit = '';
	error;
	editData = {
		firstName: '',
		website: '',
		phone: '',
		city: ''
	}
	pass = {
		oldPassword: '',
		newPassword: ''
	};


	constructor(private ApiRestService: ApiRestService,
				private router: Router) 
				{ }

	ngOnInit() {
		console.log(this.user);
		if(this.user) {
			for (var _i = 0; _i < this.totalStars; _i++) {
				this.currentStars.push({status: false});
			}

			for (var _i = 0; _i < this.user.stars; _i++) {
				this.currentStars[_i].status = true;
			}
		}
	}

	openTab(type) {
		this.currentTab = type;
	}

	openEdit(type) {
		this.openPopEdit = type;
		this.editData = {
			firstName: this.user.firstName,
			website: this.user.website,
			phone: this.user.phone,
			city: this.user.address.city
		}
	}

	putPassword() {
		this.ApiRestService.putPassword(this.user.token, this.pass).subscribe(
			(response) => {
				this.error = 'Password successfully changed.';				
			},(error) => {
				if (Object.keys(error).length === 0) {
					this.error = 'Password successfully changed.';
				} else {
					const errorResponse = JSON.parse(error._body);
					this.error = errorResponse.error_description;
				}
			}
		);
	}

	editProfile() {
		let newData = {
			"firstName": this.editData.firstName,
			"lastName": this.user.lastName,
			"website": this.editData.website,
			"address": {
				"city": this.editData.city,
				"state": this.user.address.state,
				"zip": this.user.address.zip
			},
			"phone": this.editData.phone
		}

		this.user.firstName = this.editData.firstName;
		this.user.website = this.editData.website;
		this.user.phone =this.editData.phone;
		this.user.address.city = this.editData.city;

		localStorage.setItem('userLoged', JSON.stringify(this.user));
		this.openPopEdit = '';
		this.ApiRestService.patchProfile(this.user.token, newData).subscribe(
			(response) => {
				console.log(response, ' response');			
			},(error) => {
				console.log(error, ' error');		
			}
		);
	}

	logOut() {
		localStorage.setItem('userLoged', null);
		this.router.navigate(['/login']);
	}

	logIn() {
		this.router.navigate(['/login']);
	}

}
