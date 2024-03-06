export class Reply {
  pid: number;
  uid: number;
  title: string;
  content: string;
  createdDate: Date;
  editDate?: Date;
  recommand: number;
  check: number;
  type: string;
  file?: string;
  picture?: string;
}
