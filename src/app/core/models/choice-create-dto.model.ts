export class ChoiceCreateDto {

  title: string;
  image: string;

  constructor(
    title: string,
    image: string,
  ) {
    this.title = title;
    this.image = image;
  }
}
