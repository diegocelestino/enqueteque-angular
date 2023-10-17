import { PollFullDto } from './poll-full-dto.model';

describe('PollFullDto', () => {
  it('should admin-create an instance', () => {
    expect(new PollFullDto()).toBeTruthy();
  });
});
