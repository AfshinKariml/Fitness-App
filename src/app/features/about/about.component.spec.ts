import { About.component } from './about.component';

describe('About.component', () => {
  let instance: About.component;

  beforeEach(() => {
    instance = new About.component();
  });

  it('should create an instance', () => {
    expect(instance).toBeTruthy();
  });
});