// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    // service url backend
    serviceUrl: 'http://68.183.191.126:8443/emeetingClient/',
    // serviceUrl: 'http://68.183.191.126:8446/cphr/', /* PHASE2 */

    // prefixUrl: null, /* Dev With Local */
    // frontendUrl: "http://128.199.220.148/cp-love",
    // frontendUrl: "http://128.199.220.148/cp-love-phase2",  /* PHASE2 */
    frontendUrl: "http://localhost:8100",
    homepageUrl: '/point-deal',
    loginUrl: '/auth',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
