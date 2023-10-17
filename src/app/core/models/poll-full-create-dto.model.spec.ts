import { PollFullCreateDto } from './poll-full-create-dto.model';

describe('PollFullCreateDto', () => {
  it('should admin-create an instance', () => {
    expect(new PollFullCreateDto()).toBeTruthy();
  });
});
