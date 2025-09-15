import mongoose, { Document } from 'mongoose';
import { Student as StudentType } from '../types';
export interface StudentDocument extends Omit<StudentType, 'id'>, Document {
    password: string;
}
export declare const Student: mongoose.Model<StudentDocument, {}, {}, {}, mongoose.Document<unknown, {}, StudentDocument> & StudentDocument & {
    _id: mongoose.Types.ObjectId;
}, any>;
//# sourceMappingURL=Student.d.ts.map