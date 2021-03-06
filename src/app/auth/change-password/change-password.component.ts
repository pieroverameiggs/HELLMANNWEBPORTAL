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
  orderObj: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.queryParamMap
      .subscribe((params) => {
        this.orderObj = { ...params.keys, ...params };
        const { token } = this.orderObj.params;

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
      }
      );
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
          this.showNotify('Se actualiz?? la contrase??a correctamente', 'success');
        }
        else if (resp.Code == eHttpStatusCode.SECURITYPASS) {
          this.showNotify('La contrase??a ingresada no es segura', 'warning');
        }
        else {
          this.showNotify('No se pudo actualizar su contrase??a. Comunicar a Sistemas', 'error');
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
