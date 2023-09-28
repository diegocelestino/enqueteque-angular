export class ChoiceDto {
  id: string;
  title: string;
  image: string;
  pollId: string;
  votes: number;

  constructor(
    id: string,
    title: string,
    image: string,
    pollId: string,
    votes: number
  ) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.pollId = pollId;
    this.votes = votes;
  }

}
