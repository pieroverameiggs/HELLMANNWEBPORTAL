import { Component, NgModule, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService, IUser } from '../../services';
import { UserPanelModule } from '../user-panel/user-panel.component';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';

import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user.interface';
@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @Output()
  menuToggle = new EventEmitter<boolean>();

  @Input()
  menuToggleEnabled = false;

  @Input()
  title!: string;

  @Input()
  entity!: string;

  public user: User | any;

  userMenuItems = [
    {
      text: 'Perfil',
      icon: 'user',
      onClick: () => {
        //const payload = this.parseJwt(localStorage.getItem('token'));
        // console.log(payload);
        this.router.navigate(['/dashboard/profile']);
      }
    },
    {
      text: 'Documentación',
      icon: 'help',
      onClick: () => {
        //const payload = this.parseJwt(localStorage.getItem('token'));
        // console.log(payload);
        var url = 'assets/docs/index.html';
        window.open(url, "_blank" ,"toolbar=yes,scrollbars=yes,resizable=yes,top=10,left=30,width=1300,height=700");
      }
    },
    {
      text: 'Cerrar Sesión',
      icon: 'runner',
      onClick: () => {
        this.userService.logout();
      }
    }
  ];

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('user') || '');
  }

  ngOnInit() {

  }

  toggleMenu = () => {
    this.menuToggle.emit();
  }

  parseJwt(token: any) {
    const objPayLoad = JSON.parse(atob(token.split('.')[1]));

    return objPayLoad;
  }
}

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    UserPanelModule,
    DxToolbarModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderModule { }
