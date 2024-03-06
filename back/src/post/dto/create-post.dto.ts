export class CreatePostDto {
  uid: number;
  title: string;
  content: string;
  type: string;
  file?: string;
  picture?: string;
}
