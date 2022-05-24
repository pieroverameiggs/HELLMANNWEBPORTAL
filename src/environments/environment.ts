// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //base_url_apisec: 'https://localhost:44355',
  base_url_apisec: 'http://192.168.10.153/APISECURITY',
  //base_url_apicustomer: 'https://localhost:44393',
  base_url_apicustomer: 'http://192.168.10.153/APICUSTOMERPORTAL',
  //base_url_apimaintenace: 'https://localhost:44314',
  base_url_apimaintenace: 'http://192.168.10.153/APIMAINTENANCE',
  base_url_app: ''
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
