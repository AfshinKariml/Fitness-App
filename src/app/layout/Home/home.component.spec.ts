import { Home.component } from './home.component';

describe('Home.component', () => {
  let instance: Home.component;

  beforeEach(() => {
    instance = new Home.component();
  });

  it('should create an instance', () => {
    expect(instance).toBeTruthy();
  });
});