import {GridOperatorComponent} from './grid-operator.component';

let gridOperator: GridOperatorComponent;

beforeEach( () => {
  gridOperator = new GridOperatorComponent();
});

describe('Comp: GridOperator', () => {
  it('check whether the gridOperator exists', () => {
    expect(gridOperator).toBeTruthy();
  });
});
