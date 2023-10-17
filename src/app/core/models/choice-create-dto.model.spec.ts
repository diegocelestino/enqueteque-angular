import { ChoiceCreateDto } from './choice-create-dto.model';

describe('ChoiceCreateDto', () => {
  it('should admin-create an instance', () => {
    expect(new ChoiceCreateDto()).toBeTruthy();
  });
});
