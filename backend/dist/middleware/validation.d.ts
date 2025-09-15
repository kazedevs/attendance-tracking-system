import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';
export declare const validateRequest: (req: Request, res: Response<ApiResponse>, next: NextFunction) => void;
export declare const validateCreateStudent: import("express-validator").ValidationChain[];
export declare const validateCreateTeacher: import("express-validator").ValidationChain[];
export declare const validateCreateCourse: import("express-validator").ValidationChain[];
export declare const validateCreateAttendanceSession: import("express-validator").ValidationChain[];
export declare const validateMarkAttendance: import("express-validator").ValidationChain[];
//# sourceMappingURL=validation.d.ts.map