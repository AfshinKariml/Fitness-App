import { Header.component } from './header.component';

describe('Header.component', () => {
  let instance: Header.component;

  beforeEach(() => {
    instance = new Header.component();
  });

  it('should create an instance', () => {
    expect(instance).toBeTruthy();
  });
});