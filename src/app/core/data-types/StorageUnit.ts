import {DER} from './DER';

export class StorageUnit extends DER {
  model: string;
  storageCapacity: number;
  feedinPower: number;
  feedoutPower: number;
  cycleEfficiency: number;
  currentSOC: number;
}
