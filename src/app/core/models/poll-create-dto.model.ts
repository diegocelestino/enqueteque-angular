export class PollCreateDto {
  title: string;
  category: string;

  constructor(
    title: string,
    category: string,
  ) {
    this.title = title;
    this.category = category;
  }
}
