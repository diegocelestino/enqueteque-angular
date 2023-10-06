import {PollDto} from "./poll-dto.model";

export class PollPageDto {
  totalPages: number;
  totalElements: number;
  size: number;
  pollDtoList: PollDto[];

  constructor(
    totalPages: number,
    totalElements: number,
    size: number,
    pollDtoList: PollDto[],
  ) {
    this.totalPages = totalPages;
    this.totalElements = totalElements;
    this.size = size;
    this.pollDtoList = pollDtoList;
  }
}
