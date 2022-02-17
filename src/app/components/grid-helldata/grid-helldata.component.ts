import { Component, Input, OnInit } from '@angular/core';
import { FileHellData } from 'src/app/interfaces/file-helldata.interface';

@Component({
  selector: 'app-grid-helldata',
  templateUrl: './grid-helldata.component.html',
  styleUrls: ['./grid-helldata.component.scss']
})
export class GridHelldataComponent implements OnInit {

  @Input()
  files: FileHellData[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  showFile(e: any) {
    // console.log(e);
    //e.row.data.VCH_FILEROUTE
    const pathFull = e.row.data.VCH_FILEROUTE;

    window.open(pathFull, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=10,left=30,width=1300,height=700");
  }

}
