import {DispatchableAsset} from './DispatchableAsset';

export class StorageUnit extends DispatchableAsset{
  constructor(
    readonly model: string,
    readonly storageCapacity: number,
    readonly feedinPower: number,
    readonly feedoutPower: number,
    readonly cycleEfficiency: number,
    readonly currentSOC: number
  ) {
    super(model);
  }

  public changeStorage(currentTime: number, chargeChange: number) {

  }
}
