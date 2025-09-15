import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';
export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: string;
    };
}
export declare const authenticateToken: (req: AuthRequest, res: Response<ApiResponse>, next: NextFunction) => Response<ApiResponse<any>, Record<string, any>> | undefined;
export declare const authorizeRoles: (...roles: string[]) => (req: AuthRequest, res: Response<ApiResponse>, next: NextFunction) => void | Response<ApiResponse<any>, Record<string, any>>;
//# sourceMappingURL=auth.d.ts.map