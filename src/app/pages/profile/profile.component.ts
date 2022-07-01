import { Component, OnInit } from '@angular/core';
import { eHttpStatusCode } from 'src/app/model/enums.model';
import { UserService } from 'src/app/services/user.service';
import { ThemeService } from 'src/app/services/theme.service';
import { TabService } from 'src/app/services/tab.service';

@Component({
  templateUrl: 'profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  public user: any;
  public colCountByScreen: object;
  public loading: boolean = false;
  public userCurrent: any;
  public themeSwitch: boolean = false;

  constructor(
    private userService: UserService,
    private themeService: ThemeService,
    public tabService: TabService
  ) {
    this.userCurrent = JSON.parse(localStorage.getItem('user') || '{}');

    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4
    };

    this.themeSwitch = JSON.parse(localStorage.getItem('themeDark') || 'false');
    this.switchValueChanged = this.switchValueChanged.bind(this);
  }

  ngOnInit(): void {
    this.getInfoUser(); 
  }

  getInfoUser() {
    this.userService.getInfoUser(this.userCurrent.INT_USERID)
      .subscribe((resp: any) => {
        // console.log(resp);
        if (resp.Code = eHttpStatusCode.OK) {
          this.user = resp.Object.User[0];
        }
      });
  }

  switchValueChanged(e: any) {
    // const previousValue = e.previousValue;
    const newValue = e.value;

    // console.log(previousValue);
    // console.log(newValue);

    this.themeService.changeTheme(newValue);
  }

}
