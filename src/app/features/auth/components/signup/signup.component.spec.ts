import { Signup.component } from './signup.component';

describe('Signup.component', () => {
  let instance: Signup.component;

  beforeEach(() => {
    instance = new Signup.component();
  });

  it('should create an instance', () => {
    expect(instance).toBeTruthy();
  });
});