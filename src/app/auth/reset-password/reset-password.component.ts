import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  loading = false;
  formData: any = {};

  constructor() { }

  ngOnInit(): void {
  }

  async onSubmit(e: Event){
    e.preventDefault();

    const { userName } = this.formData;
    this.loading = true;    
  }

}
