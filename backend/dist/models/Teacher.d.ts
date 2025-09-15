import mongoose, { Document } from 'mongoose';
import { Teacher as TeacherType } from '../types';
export interface TeacherDocument extends Omit<TeacherType, 'id'>, Document {
    password: string;
}
export declare const Teacher: mongoose.Model<TeacherDocument, {}, {}, {}, mongoose.Document<unknown, {}, TeacherDocument> & TeacherDocument & {
    _id: mongoose.Types.ObjectId;
}, any>;
//# sourceMappingURL=Teacher.d.ts.map