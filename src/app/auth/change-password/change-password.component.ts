import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { eHttpStatusCode } from 'src/app/model/enums.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  @ViewChild(DxFormComponent, { static: false }) form: any;

  loading = false;
  formData: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(({ token }) => {
        //console.log(token);
        this.formData.token = token;

        this.userService.verifyToken(token)
          .subscribe((resp: any) => {
            if (resp.Code == eHttpStatusCode.OK) {
              if (!resp.Object.Correct) { // Token Invalid
                this.router.navigate(['/no-page-found']);
              }
            }
            else {
              this.router.navigate(['/no-page-found']);
            }
          }, (err) => {
            this.showNotify('Servicio Suspendido Temporalmente :(', 'error');
          });

      });
  }

  passwordComparison = () => this.form.instance.option('formData').password;

  async onSubmit(e: Event) {
    e.preventDefault();

    const { token, password, confirmPassword } = this.formData;
    this.loading = true;

    const requestReset = {
      VCH_TOKEN: token,
      VCH_PASSWORD: password,
      VCH_PASSWORDCONFIRM: confirmPassword
    }

    this.userService.resetPassword(requestReset)
      .subscribe((resp: any) => {
        this.loading = false;

        if (resp.Code == eHttpStatusCode.OK) {
          notify('Se actualizó la contraseña correctamente', 'success', 10000);
        }
        else if (resp.Code == eHttpStatusCode.SECURITYPASS) {
          notify('La contraseña ingresada no es segura', 'warning', 10000);
        }
        else {
          notify('No se pudo actualizar su contraseña. Comunicar a Sistemas', 'error', 5000);
        }
      }, (err) => {
        this.showNotify('Servicio Suspendido Temporalmente :(', 'error');
      });

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
