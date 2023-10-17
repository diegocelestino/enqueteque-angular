import { ChoiceDto } from './choice-dto.model';

describe('ChoiceDto', () => {
  it('should admin-create an instance', () => {
    expect(new ChoiceDto()).toBeTruthy();
  });
});
