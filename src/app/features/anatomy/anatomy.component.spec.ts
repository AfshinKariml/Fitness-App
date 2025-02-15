import { Anatomy.component } from './anatomy.component';

describe('Anatomy.component', () => {
  let instance: Anatomy.component;

  beforeEach(() => {
    instance = new Anatomy.component();
  });

  it('should create an instance', () => {
    expect(instance).toBeTruthy();
  });
});