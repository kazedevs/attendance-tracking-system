import mongoose, { Document } from 'mongoose';
import { AttendanceRecord as AttendanceRecordType } from '../types';
export interface AttendanceRecordDocument extends Omit<AttendanceRecordType, 'id'>, Document {
}
export declare const AttendanceRecord: mongoose.Model<AttendanceRecordDocument, {}, {}, {}, mongoose.Document<unknown, {}, AttendanceRecordDocument> & AttendanceRecordDocument & {
    _id: mongoose.Types.ObjectId;
}, any>;
//# sourceMappingURL=AttendanceRecord.d.ts.map