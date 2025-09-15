import { Request, Response } from 'express';
import { CreateCourseDto, CourseQuery, ApiResponse } from '../types';
export declare class CourseController {
    getAllCourses(req: Request<{}, {}, {}, CourseQuery>, res: Response<ApiResponse>): Promise<void>;
    getCourseById(req: Request<{
        id: string;
    }>, res: Response<ApiResponse>): Promise<Response<ApiResponse<any>, Record<string, any>>>;
    createCourse(req: Request<{}, {}, CreateCourseDto>, res: Response<ApiResponse>): Promise<Response<ApiResponse<any>, Record<string, any>>>;
    updateCourse(req: Request<{
        id: string;
    }, {}, Partial<CreateCourseDto>>, res: Response<ApiResponse>): Promise<Response<ApiResponse<any>, Record<string, any>>>;
    deleteCourse(req: Request<{
        id: string;
    }>, res: Response<ApiResponse>): Promise<Response<ApiResponse<any>, Record<string, any>>>;
}
export declare const courseController: CourseController;
//# sourceMappingURL=courseController.d.ts.map