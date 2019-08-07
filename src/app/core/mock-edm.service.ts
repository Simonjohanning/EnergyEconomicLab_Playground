import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {ExperimentDescription} from './data-types/ExperimentDescription';
import {Load} from './data-types/Load';
import {ControllableGenerator} from './data-types/ControllableGenerator';
import {NonControllableGenerator} from './data-types/NonControllableGenerator';
import {StorageUnit} from './data-types/StorageUnit';
import {DataProvisionService} from './data-provision.service';
import {ExperimentDescriptionService} from '../shared/experiment-description.service';
import {ExperimentInstance} from './data-types/ExperimentInstance';

@Injectable({
  providedIn: 'root'
})

/**
 * A service to act as a placeholder for the EDM platform.
 * It mocks the required functionality, and acts as placeholder for the respective requests put into the platform.
 * Since it will be deleted once the EDM platform is established, it will not be further covered in the documentation.
 */
export class MockEDMService {

  constructor(
    private data: DataProvisionService
  ) { }

  static getConfiguredLoads(): Observable<Load[]> {
    const loadsToReturn: Load[] = DataProvisionService.getLoads();
    return of(loadsToReturn);
  }

  static getConfiguredStorages(): Observable<StorageUnit[]> {
    const storagesToReturn: StorageUnit[] = DataProvisionService.getStorages();
    return of(storagesToReturn);
  }

  static getConfiguredCGs(): Observable<ControllableGenerator[]> {
    const cgsToReturn: ControllableGenerator[] = DataProvisionService.getControllableGenerators();
    return of(cgsToReturn);
  }

  static getConfiguredNCGs(): Observable<NonControllableGenerator[]> {
    const ncgsToReturn: NonControllableGenerator[] = DataProvisionService.getNonControllableGenerators();
    return of(ncgsToReturn);
  }

  // TODO do something meaningful
  addExperimentDescription(descriptionToStore: ExperimentDescription): void {
    console.log('Attempting to store ' + descriptionToStore);
  }

  addNewLoad(load: Load): void {
    console.log('Load ' + load.model + ' added as mock functionality');
    console.log('Newly added load has a load time series of ' + load.loadProfile);
  }

  addNewControllableGenerator(cg: ControllableGenerator): void {
    console.log('Controllable Generator ' + cg.model + ' added as mock functionality');
  }

  addNewNonControllableGenerator(ncg: NonControllableGenerator): void {
    console.log('NonControllableGenerator ' + ncg.model + ' added as mock functionality');
  }

  addNewStorage(storage: StorageUnit): void {
    console.log('Storage ' + storage.model + ' added as mock functionality');
  }

  getExperimentInstanceIDSet(): Observable<Set<number>> {
    const numberSet = new Set<number>();
    console.log('trying to get the experiment instance IDs, with instances ' + this.data.getMockExperimentInstances());
    this.data.getMockExperimentInstances().forEach(currentElement => {
      numberSet.add(currentElement.experimentID);
    });
    return of (numberSet);
  }

  getExperimentDescriptions(): ExperimentDescription[] {
    const mockData: ExperimentDescription[] = new Array<ExperimentDescription>();
    mockData[0] = this.data.getED();
    return mockData;
  }

  addExperimentInstance(instanceToAdd: ExperimentInstance) {
    console.log('Attempting to store ' + instanceToAdd);
  }
}

