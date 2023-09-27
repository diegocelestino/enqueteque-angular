export class PollDto {
  id: string;
  title: string;
  category: string;
  createDate: Date;
  images: string[];

  constructor(
    id: string,
    title: string,
    category: string,
    createDate: Date,
    images: string[],
  ) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.createDate = createDate;
    this.images = images;
  }
}
