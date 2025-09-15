import { Request, Response } from 'express';
import { ReportQuery, ApiResponse } from '../types';
export declare class ReportController {
    getAttendanceSummary(req: Request<{}, {}, {}, ReportQuery>, res: Response<ApiResponse>): Promise<Response<ApiResponse<any>, Record<string, any>>>;
    getPerformanceAnalytics(req: Request<{}, {}, {}, ReportQuery>, res: Response<ApiResponse>): Promise<Response<ApiResponse<any>, Record<string, any>>>;
    exportReport(req: Request<{}, {}, {}, ReportQuery>, res: Response): Promise<void>;
    private convertToCSV;
}
export declare const reportController: ReportController;
//# sourceMappingURL=reportController.d.ts.map