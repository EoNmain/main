export class CreateReplyDto {
  uid: number;
  title: string;
  content: string;
  type: string;
  file?: string;
  picture?: string;
}
