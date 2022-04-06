import { Component, OnInit } from '@angular/core';
import { ModalWinService } from 'src/app/services/modal-win.service';

@Component({
  selector: 'app-trackingwin',
  templateUrl: './trackingwin.component.html',
  styleUrls: ['./trackingwin.component.scss']
})
export class TrackingwinComponent implements OnInit {

  constructor(
    public modalWinService: ModalWinService
  ) { }

  ngOnInit(): void {
    
  }

  popup_hiding(e: any) {
    this.modalWinService.hideModal();
  }

}
