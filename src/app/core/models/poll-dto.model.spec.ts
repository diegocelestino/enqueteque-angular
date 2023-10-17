import { PollDto } from './poll-dto.model';

describe('PollDto', () => {
  it('should admin-create an instance', () => {
    expect(new PollDto()).toBeTruthy();
  });
});
