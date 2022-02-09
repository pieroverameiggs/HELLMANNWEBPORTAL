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
                  notify('Se envió un enlace de restablecimiento de contraseña a su Correo Electrónico', 'success', 10000);
                }
                else {
                  notify(resp2.Message, 'error', 5000);
                }
              });

          }
          else {
            this.loading = false;
            notify('El Nombre de Usuario no Existe', 'error', 5000);
          }
        }
        else{
          this.loading = false;
          notify(resp.Message, 'error', 5000);
        }

      });
  }

}
