import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'webApp';

  constructor(private router: Router) { }
  ngOnInit(): void {
    if (!(window.location.href.includes('/user-list'))) {
      this.router.navigate(['/user-list']);
    }
  }
}
