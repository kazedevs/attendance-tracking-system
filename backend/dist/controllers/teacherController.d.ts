import { Request, Response } from 'express';
import { CreateTeacherDto, TeacherQuery, ApiResponse } from '../types';
export declare class TeacherController {
    getAllTeachers(req: Request<{}, {}, {}, TeacherQuery>, res: Response<ApiResponse>): Promise<void>;
    getTeacherById(req: Request<{
        id: string;
    }>, res: Response<ApiResponse>): Promise<Response<ApiResponse<any>, Record<string, any>>>;
    createTeacher(req: Request<{}, {}, CreateTeacherDto>, res: Response<ApiResponse>): Promise<Response<ApiResponse<any>, Record<string, any>>>;
    updateTeacher(req: Request<{
        id: string;
    }, {}, Partial<CreateTeacherDto>>, res: Response<ApiResponse>): Promise<Response<ApiResponse<any>, Record<string, any>>>;
    deleteTeacher(req: Request<{
        id: string;
    }>, res: Response<ApiResponse>): Promise<Response<ApiResponse<any>, Record<string, any>>>;
}
export declare const teacherController: TeacherController;
//# sourceMappingURL=teacherController.d.ts.map