import { App.component } from './app.component';

describe('App.component', () => {
  let instance: App.component;

  beforeEach(() => {
    instance = new App.component();
  });

  it('should create an instance', () => {
    expect(instance).toBeTruthy();
  });
});