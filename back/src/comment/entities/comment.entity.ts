export class Comment {
    cid: number;
    uid: number;
    pid: number;
    content: string;
    createdDate: Date;
    editDate?: Date; // Null 허용
}