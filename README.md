# LabPlayground

The Energy Economic Lab Playground is an experimental research infrastructure development project that is meant for the project author to play around with technologies the author is not very familiar with (in particular with Angular CLI). 

Its goal is to investigate good practices, architecture and code snippets of how an energy economic lab can be developed for a subsequent project where it is actually properly implemented.
The energy economics lab is intended as a piece of research infrastructure for investigating flesh-and-blood actor interaction within use cases for blockchain-based peer-to-peer energy trading systems involving synthetic actors. 

This experiment project involves Angular CLI 7.3.0. and some mock services for the inclusion of external sources that will eventually be added 

## Architecture 

Following [Tomas Trajan](https://medium.com/@tomastrajan/6-best-practices-pro-tips-for-angular-cli-better-developer-experience-7b328bc9db81), the project separates the code in a commonly shared core module and (dependency-less) SharedModule, as well as a bunch of feature modules. The feature modules encapsulate views and functionality for the different types of actors (Prosumers, Grid Operator, Experiment Designer and Public Actor) in their respective modules, that communicate indirectly with one another, through the external data ressources (EDM layer and blockchain layer, as abstracted through the in-memory-service.ts for now). 

## User Manual

While being an experimental project / playground, and thus not intended for users other than the core developer, I can't prevent you from trying it out yourselves, so the Angular-generated readme information for the usage of the software is put in the [userManual](respective documentation).
