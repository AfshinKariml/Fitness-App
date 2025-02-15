import { Bmi.component } from './bmi.component';

describe('Bmi.component', () => {
  let instance: Bmi.component;

  beforeEach(() => {
    instance = new Bmi.component();
  });

  it('should create an instance', () => {
    expect(instance).toBeTruthy();
  });
});