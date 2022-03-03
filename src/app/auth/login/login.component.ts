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
    this.formData.userName = localStorage.getItem('userName') || '';
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    const { userName, password, rememberMe } = this.formData;
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

          if (rememberMe) {
            localStorage.setItem('userName', userName);
          }
          else {
            localStorage.removeItem('userName');
          }

          if (!resp.Object.Entity) {
            this.showNotify('Usuario o constraseña incorrecta y/o entidad no asignada', 'error');
          }
          else {
            localStorage.setItem('entity', JSON.stringify(resp.Object.Entity));
            localStorage.setItem('groupEntity', JSON.stringify(resp.Object.GroupEntity));

            // Navegar al DashBoard                    
            this.router.navigateByUrl('/');
          }          
        }
        else {
          this.showNotify(resp.Message, 'error');
        }
      }, (err) => {
        this.loading = false;
        this.showNotify('Servicio Suspendido Temporalmente :(', 'error');
      });
  }

  onCreateAccountClick = () => {
    this.router.navigate(['/create-account']);
  }

  showNotify(msg: string, type: string) {
    notify({
      message: msg,
      width: 500,
      // shading: true,
      position: {
        my: 'center top',
        at: 'center top',
      },
    }, type, 8000);

  }

}
