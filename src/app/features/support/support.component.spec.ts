import { Support.component } from './support.component';

describe('Support.component', () => {
  let instance: Support.component;

  beforeEach(() => {
    instance = new Support.component();
  });

  it('should create an instance', () => {
    expect(instance).toBeTruthy();
  });
});