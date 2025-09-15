import { Request, Response } from "express";
import { CreateAttendanceSessionDto, MarkAttendanceDto, AttendanceQuery, ApiResponse } from "../types";
export declare class AttendanceController {
    getAllSessions(req: Request<{}, {}, {}, AttendanceQuery>, res: Response<ApiResponse>): Promise<void>;
    createSession(req: Request<{}, {}, CreateAttendanceSessionDto>, res: Response<ApiResponse>): Promise<Response<ApiResponse<any>, Record<string, any>>>;
    getSessionById(req: Request<{
        id: string;
    }>, res: Response<ApiResponse>): Promise<Response<ApiResponse<any>, Record<string, any>>>;
    updateSession(req: Request<{
        id: string;
    }, {}, {
        endTime?: Date;
        isActive?: boolean;
    }>, res: Response<ApiResponse>): Promise<Response<ApiResponse<any>, Record<string, any>>>;
    markAttendance(req: Request<{
        sessionId: string;
    }, {}, MarkAttendanceDto>, res: Response<ApiResponse>): Promise<Response<ApiResponse<any>, Record<string, any>>>;
    getAttendanceRecords(req: Request<{}, {}, {}, AttendanceQuery>, res: Response<ApiResponse>): Promise<void>;
    saveManualAttendance(req: Request<{}, {}, MarkAttendanceDto[]>, res: Response<ApiResponse>): Promise<void>;
}
export declare const attendanceController: AttendanceController;
//# sourceMappingURL=attendanceController.d.ts.map