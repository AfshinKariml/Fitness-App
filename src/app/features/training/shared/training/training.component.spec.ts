import { Training.component } from './training.component';

describe('Training.component', () => {
  let instance: Training.component;

  beforeEach(() => {
    instance = new Training.component();
  });

  it('should create an instance', () => {
    expect(instance).toBeTruthy();
  });
});