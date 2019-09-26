// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  APIEndpoint: 'http://lock-api.grupo-sim.com.ar',
  firebase: {
    apiKey: 'AIzaSyBD3xxGhgpWbNLongQN9IRPQq1L7Ir4mag',
    authDomain: 'ingreso-egreso-app-28408.firebaseapp.com',
    databaseURL: 'https://ingreso-egreso-app-28408.firebaseio.com',
    projectId: 'ingreso-egreso-app-28408',
    storageBucket: 'ingreso-egreso-app-28408.appspot.com',
    messagingSenderId: '774659686971',
    appId: '1:774659686971:web:0c3978ec5de9417910521e'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
