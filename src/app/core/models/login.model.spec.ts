import { Login } from './login.model';

describe('Login', () => {
  it('should admin-create an instance', () => {
    expect(new Login()).toBeTruthy();
  });
});
