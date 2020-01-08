import {GridOperatorComponent} from './grid-operator.component';
import {ExperimentStateService} from '../core/experiment-state.service';

let gridOperator: GridOperatorComponent;
let mockExperimentService: MockExperimentStateService;

class MockExperimentStateService extends ExperimentStateService {
  experimentID = 123456;
}

describe('Comp: GridOperator', () => {

  beforeEach( () => {
    mockExperimentService = new MockExperimentStateService();
    gridOperator = new GridOperatorComponent(this.mockExperimentService);
  });

  it('check whether the gridOperator exists', () => {
    expect(gridOperator).toBeTruthy();
  });
});
