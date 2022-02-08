import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { eHttpStatusCode } from 'src/app/model/enums.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading = false;
  formData: any = {};

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    const { userName, password, remember } = this.formData;
    this.loading = true;

    // console.log(this.formData);

    const loginRequest = {
      VCH_USERNAME: userName,
      VCH_PASSWORD: password
    };

    this.userService.login(loginRequest)
      .subscribe((resp: any) => {
        this.loading = false;

        if (resp.Code == eHttpStatusCode.OK) {
          // Navegar al DashBoard          
          // console.log(resp);
          this.router.navigateByUrl('/');
        }
        else {
          notify(resp.Message, 'error', 5000);
        }
      });
  }

  onCreateAccountClick = () => {
    this.router.navigate(['/create-account']);
  }

}
