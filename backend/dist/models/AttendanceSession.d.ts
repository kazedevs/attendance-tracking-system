import mongoose, { Document } from 'mongoose';
import { AttendanceSession as AttendanceSessionType } from '../types';
export interface AttendanceSessionDocument extends Omit<AttendanceSessionType, 'id'>, Document {
}
export declare const AttendanceSession: mongoose.Model<AttendanceSessionDocument, {}, {}, {}, mongoose.Document<unknown, {}, AttendanceSessionDocument> & AttendanceSessionDocument & {
    _id: mongoose.Types.ObjectId;
}, any>;
//# sourceMappingURL=AttendanceSession.d.ts.map