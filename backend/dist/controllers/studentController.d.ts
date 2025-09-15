import { Request, Response } from 'express';
import { CreateStudentDto, StudentQuery, ApiResponse } from '../types';
export declare class StudentController {
    getAllStudents(req: Request<{}, {}, {}, StudentQuery>, res: Response<ApiResponse>): Promise<void>;
    getStudentById(req: Request<{
        id: string;
    }>, res: Response<ApiResponse>): Promise<Response<ApiResponse<any>, Record<string, any>>>;
    createStudent(req: Request<{}, {}, CreateStudentDto>, res: Response<ApiResponse>): Promise<Response<ApiResponse<any>, Record<string, any>>>;
    updateStudent(req: Request<{
        id: string;
    }, {}, Partial<CreateStudentDto>>, res: Response<ApiResponse>): Promise<Response<ApiResponse<any>, Record<string, any>>>;
    deleteStudent(req: Request<{
        id: string;
    }>, res: Response<ApiResponse>): Promise<Response<ApiResponse<any>, Record<string, any>>>;
}
export declare const studentController: StudentController;
//# sourceMappingURL=studentController.d.ts.map