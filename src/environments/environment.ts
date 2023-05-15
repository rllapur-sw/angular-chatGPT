// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EnvironmentConfiguration } from "src/app/interfaces/environment-configuration.interface";

export const environment: EnvironmentConfiguration = {
  env_name: 'dev',
  production: false,
  apiKey: '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'  // Set your personal api key
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
