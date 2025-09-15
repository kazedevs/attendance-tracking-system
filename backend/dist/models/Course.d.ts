import mongoose, { Document } from 'mongoose';
import { Course as CourseType } from '../types';
export interface CourseDocument extends Omit<CourseType, 'id'>, Document {
}
export declare const Course: mongoose.Model<CourseDocument, {}, {}, {}, mongoose.Document<unknown, {}, CourseDocument> & CourseDocument & {
    _id: mongoose.Types.ObjectId;
}, any>;
//# sourceMappingURL=Course.d.ts.map