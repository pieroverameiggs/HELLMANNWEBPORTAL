import { Component, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { eHttpStatusCode } from 'src/app/model/enums.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  loading = false;
  formData: any = {};

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  async onSubmit(e: Event) {
    e.preventDefault();

    const { userName } = this.formData;
    this.loading = true;

    this.userService.verifyAccount(userName)
      .subscribe((resp: any) => {

        if (resp.Code == eHttpStatusCode.OK) {
          if (resp.Object.Correct) {

            const base_url = window.location.origin;
            // http://localhost:4200

            this.userService.forgotPassword({ VCH_USERNAME: userName, VCH_BASEURL: base_url })
              .subscribe((resp2: any) => {
                this.loading = false;
                if (resp2.Code == eHttpStatusCode.OK) {
                  this.showNotify('Se envió un enlace de restablecimiento de contraseña a su Correo Electrónico', 'success');
                }
                else {
                  this.showNotify(resp2.Mesage, 'error');
                }
              }, (err) => {
                this.showNotify('Servicio Suspendido Temporalmente :(', 'error');       
              });

          }
          else {
            this.loading = false;
            this.showNotify('El Nombre de Usuario no Existe', 'error');
          }
        }
        else {
          this.loading = false;
          this.showNotify(resp.Mesage, 'error');
        }

      }, (err) => {
        this.showNotify('Servicio Suspendido Temporalmente :(', 'error');       
      });
  }

  showNotify(msg: string, type: string) {
    notify({
      message: msg,
      width: 500,
      shading: true,
      position: {
        my: 'center top',
        at: 'center top',
      },
    }, type, 8000);

  }

}
