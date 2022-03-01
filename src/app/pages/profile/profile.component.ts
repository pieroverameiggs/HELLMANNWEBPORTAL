import { Component, OnInit } from '@angular/core';
import { eHttpStatusCode } from 'src/app/model/enums.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: 'profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  public user: any;
  public colCountByScreen: object;
  public loading: boolean = false;
  public userCurrent: any;

  constructor(
    private userService: UserService
  ) {
    this.userCurrent = JSON.parse(localStorage.getItem('user') || '{}');

    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4
    };
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
    console.log(newValue);
  }

}
