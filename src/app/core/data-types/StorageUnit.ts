export class StorageUnit {
  constructor(
    readonly  model: string,
    readonly  storageCapacity: number,
    readonly feedinPower: number,
    readonly feedoutPower: number,
    readonly cycleEfficiency: number,
    private currentSOC: number
  ) {}

  public changeStorage(currentTime: number, chargeChange: number) {

  }
}
