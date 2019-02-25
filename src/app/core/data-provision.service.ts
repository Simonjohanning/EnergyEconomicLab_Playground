import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataProvisionService {

  public storage: any;
  public experimentId: number;
  constructor() { }
}
