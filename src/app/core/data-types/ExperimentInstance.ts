import {ExperimentDescription} from './ExperimentDescription';

/**
 * A concrete experiment for execution
 *
 * @param experimentID: The identificator of the respective experiment (as a number)
 * @param instanceOfExperiment The respective experiment blue print the experiment is based upon
 */
export class ExperimentInstance {
  /** The identificator of the respective experiment (as a number) */
  experimentID: number;
  /** The respective experiment blue print the experiment is based upon */
  instanceOfExperiment: ExperimentDescription;
}
