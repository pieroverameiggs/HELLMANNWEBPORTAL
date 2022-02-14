import { Component, Input, OnInit } from '@angular/core';

import { ModalHelldataService } from 'src/app/services/modal-helldata.service';

@Component({
  selector: 'app-helldata',
  templateUrl: './helldata.component.html',
  styleUrls: ['./helldata.component.scss']
})
export class HelldataComponent implements OnInit {

  constructor(
    public modalHelldataService: ModalHelldataService
  ) { }

  ngOnInit(): void {

  }

  showFile(e: any) {
    // console.log(e);
    //e.row.data.VCH_FILEROUTE
    const pathFull = e.row.data.VCH_FILEROUTE;

    window.open(pathFull, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=10,left=30,width=1300,height=700");
  }

  popup_hiding(e: any) {
    this.modalHelldataService.hideModal();
  }
}
