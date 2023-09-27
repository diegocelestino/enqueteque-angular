import {PollDto} from "./poll-dto.model";
import {ChoiceDto} from "./choice-dto.model";

export class PollFullDto {
  pollDto: PollDto;
  choices: ChoiceDto[];

  constructor(
    pollDto: PollDto,
    choices: ChoiceDto[]
  ) {
    this.pollDto = pollDto;
    this.choices = choices;
  }
}
