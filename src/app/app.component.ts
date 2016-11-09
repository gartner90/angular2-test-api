import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras} from '@angular/router';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	title = 'app works!';
	

	constructor(private route: ActivatedRoute,
                private router: Router) {}
}
