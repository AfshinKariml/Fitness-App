import { Login.component } from './login.component';

describe('Login.component', () => {
  let instance: Login.component;

  beforeEach(() => {
    instance = new Login.component();
  });

  it('should create an instance', () => {
    expect(instance).toBeTruthy();
  });
});