import { PollPageDto } from './poll-page-dto.model';

describe('PollPageDto', () => {
  it('should admin-create an instance', () => {
    expect(new PollPageDto()).toBeTruthy();
  });
});
