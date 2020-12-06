import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { SideMenusService } from '../side-menus/side-menus.service';
import { LoggedUserModel } from 'src/app/authentication/logged-user.model';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: [
    './styles/top-navbar.component.scss'
  ]
})
export class TopNavbarComponent implements OnInit {

  message: string = "Welcome to YAC Web Portal.";

  loggedUser: LoggedUserModel = null;
  fN = JSON.parse(localStorage.getItem('firstname'));
  lN = JSON.parse(localStorage.getItem('lastname'));
  uC = JSON.parse(localStorage.getItem('userclass'));

  // tslint:disable-next-line:variable-name
  _mode = 'expanded';

  @HostBinding('attr.mode')
  @Input()
  set mode(val: string) {
    this._mode = (val !== undefined && val !== null) ? val : 'expanded';
  }
  get mode(): string {
    return this._mode;
  }

  constructor(
    private sideMenusService: SideMenusService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.authenticationService.loggedUserSubject.subscribe({
      next: (loggedUser) => {
        this.loggedUser = loggedUser;
      }
    });
  }

  ngOnInit() {
    console.log(this.fN);
    console.log(this.lN);
    console.log(this.uC);
  }

  logout() {
    this.authenticationService.logout().subscribe(
      () => this.router.navigate(['authentication/signin'])
    );
  }

  toggleMainMenu(): void {
    this.sideMenusService.toggleMainMenuSubject.next('toggle');
  }

  toggleAltMenu(): void {
    this.sideMenusService.toggleAltMenuSubject.next('toggle');
  }

  toggleSettingsMenu(): void {
    this.sideMenusService.renderAltMenuSubject.next('settings');
    this.toggleAltMenu();
  }

  toggleNotificationsMenu(): void {
    this.sideMenusService.renderAltMenuSubject.next('notifications');
    this.toggleAltMenu();
  }
}
