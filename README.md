# LabPlayground

The Energy Economic Lab Playground is an experimental research infrastructure development project that is meant for the project author to play around with technologies the author is not very familiar with (in particular with Angular CLI). 

Its goal is to investigate good practices, architecture and code snippets of how an energy economic lab can be developed for a subsequent project where it is actually properly implemented.
The energy economics lab is intended as a piece of research infrastructure for investigating flesh-and-blood actor interaction within use cases for blockchain-based peer-to-peer energy trading systems involving synthetic actors. 

This experiment project involves Angular CLI 7.3.0. and some mock services for the inclusion of external sources that will eventually be added 

## Architecture 

Following [Tomas Trajan](https://medium.com/@tomastrajan/6-best-practices-pro-tips-for-angular-cli-better-developer-experience-7b328bc9db81), the project separates the code in a commonly shared core module and (dependency-less) SharedModule, as well as a bunch of feature modules. The feature modules encapsulate views and functionality for the different types of actors (Prosumers, Grid Operator, Experiment Designer and Public Actor) in their respective modules, that communicate indirectly with one another, through the external data ressources (EDM layer and blockchain layer, as abstracted through the in-memory-service.ts for now).

Since the view of the lab is (for now) conceptualized as a single-page application with dynamic components, no routing is necessary. For this reason, no routing modules were included with the respective feature (role) modules. This might well be changed (and can be easily added) in later versions, staying consistent with [the Angular CLI documentation](https://angular.io/guide/lazy-loading-ngmodules).
This would particularly be the case if the modules for the different actors should be loaded lazyly, which would probably be a good idea, since every type of user has exactly one type of feature module they use once they are logged in through the welcome page.
Due to the authors lack of experience with Angular CLI, it is however not clear which would be the best solution for this matter.

## User Manual

While being an experimental project / playground, and thus not intended for users other than the core developer, I can't prevent you from trying it out yourselves, so the Angular-generated readme information for the usage of the software is put in the [user manual](docs/userManual.md).

## Application State

Since the application also serves as a learning environment for Angular CLI for the author, no consistent style exists when several options are available.
Instead, different solutions or concepts are used to help evaluate which one is most appropriate for use.

The application is furthermore not yet connected to external APIs, so much data is test data from static, hard-coded data structures.
