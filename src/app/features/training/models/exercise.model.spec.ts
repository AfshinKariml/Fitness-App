import { Exercise.model } from './exercise.model';

describe('Exercise.model', () => {
  let instance: Exercise.model;

  beforeEach(() => {
    instance = new Exercise.model();
  });

  it('should create an instance', () => {
    expect(instance).toBeTruthy();
  });
});