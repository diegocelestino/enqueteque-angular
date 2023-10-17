import { Token } from './token.model';

describe('Token', () => {
  it('should admin-create an instance', () => {
    expect(new Token()).toBeTruthy();
  });
});
