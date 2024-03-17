export class CreatePostDto {
  uid: number;
  title: string;
  content: string;
  type: string;
  writer: string;
  file?: string;
  picture?: string;
}
