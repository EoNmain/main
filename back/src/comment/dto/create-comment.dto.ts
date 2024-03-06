export class CreateCommentDto {
    uid: number;
    pid: number;
    content: string;
    createDate: Date;
    editDate?: Date;
}