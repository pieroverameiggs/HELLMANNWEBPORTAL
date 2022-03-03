import { Component } from '@angular/core';

// Config Devextreme
import { loadMessages, locale } from 'devextreme/localization';
import * as esMessages from "devextreme/localization/messages/es.json";  
import config from 'devextreme/core/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'portal'

  constructor(){
    // const esMessages = require('devextreme/localization/messages/es.json');
    loadMessages(esMessages);
    locale(navigator.language);

    // Specifying a currency globally
    config({ defaultCurrency: 'USD' });  
  }
}
