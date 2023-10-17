import { PollCreateDto } from './poll-create-dto.model';

describe('PollCreateDto', () => {
  it('should admin-create an instance', () => {
    expect(new PollCreateDto()).toBeTruthy();
  });
});
