import {PollCreateDto} from "./poll-create-dto.model";
import {ChoiceCreateDto} from "./choice-create-dto.model";

export class PollFullCreateDto {
  pollCreateDto: PollCreateDto;
  choices: ChoiceCreateDto[];

  constructor(
    pollDto: PollCreateDto,
    choices: ChoiceCreateDto[]
  ) {
    this.pollCreateDto = pollDto;
    this.choices = choices;
  }
}
