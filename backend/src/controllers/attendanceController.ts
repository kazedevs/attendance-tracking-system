import { Request, Response } from "express";
import { AttendanceSession } from "../models/AttendanceSession";
import { AttendanceRecord } from "../models/AttendanceRecord";
import {
  CreateAttendanceSessionDto,
  MarkAttendanceDto,
  AttendanceQuery,
  ApiResponse,
} from "../types";
import { v4 as uuidv4 } from "uuid";

export class AttendanceController {
  // GET /sessions - List all attendance sessions
  async getAllSessions(
    req: Request<{}, {}, {}, AttendanceQuery>,
    res: Response<ApiResponse>
  ) {
    try {
      const {
        page = 1,
        limit = 10,
        sort = "startTime",
        order = "desc",
        courseId,
        teacherId,
      } = req.query;

      const filter: any = {};

      if (courseId) filter.courseId = courseId;
      if (teacherId) filter.teacherId = teacherId;

      const sessions = await AttendanceSession.find(filter)
        .populate("courseId", "name code")
        .populate("teacherId", "name teacherId")
        .sort({ [sort]: order === "desc" ? -1 : 1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      const total = await AttendanceSession.countDocuments(filter);

      res.json({
        success: true,
        data: {
          sessions,
          pagination: {
            page: Number(page),
            limit: Number(limit),
            total,
            pages: Math.ceil(total / limit),
          },
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to fetch sessions",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // POST /sessions - Create new attendance session
  async createSession(
    req: Request<{}, {}, CreateAttendanceSessionDto>,
    res: Response<ApiResponse>
  ) {
    try {
      const qrCode = uuidv4();

      const session = new AttendanceSession({
        ...req.body,
        qrCode,
        teacherId: req.body.teacherId || (req as any).user.id,
      });

      await session.save();

      const populatedSession = await AttendanceSession.findById(session.id)
        .populate("courseId", "name code")
        .populate("teacherId", "name teacherId");

      return res.status(201).json({
        success: true,
        data: populatedSession,
        message: "Attendance session created successfully",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: "Failed to create session",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // GET /sessions/:id - Get session details
  async getSessionById(
    req: Request<{ id: string }>,
    res: Response<ApiResponse>
  ) {
    try {
      const session = await AttendanceSession.findById(req.params.id)
        .populate("courseId", "name code")
        .populate("teacherId", "name teacherId");

      if (!session) {
        return res.status(404).json({
          success: false,
          error: "Session not found",
        });
      }

      return res.json({
        success: true,
        data: session,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: "Failed to fetch session",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // PUT /sessions/:id - Update session (e.g., end session)
  async updateSession(
    req: Request<{ id: string }, {}, { endTime?: Date; isActive?: boolean }>,
    res: Response<ApiResponse>
  ) {
    try {
      const session = await AttendanceSession.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!session) {
        return res.status(404).json({
          success: false,
          error: "Session not found",
        });
      }

      return res.json({
        success: true,
        data: session,
        message: "Session updated successfully",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: "Failed to update session",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // POST /attendance/mark/:sessionId - Mark attendance
  async markAttendance(
    req: Request<{ sessionId: string }, {}, MarkAttendanceDto>,
    res: Response<ApiResponse>
  ) {
    try {
      const session = await AttendanceSession.findById(req.params.sessionId);

      if (!session) {
        return res.status(404).json({
          success: false,
          error: "Session not found",
        });
      }

      if (!session.isActive) {
        return res.status(400).json({
          success: false,
          error: "Session is not active",
        });
      }

      const existingRecord = await AttendanceRecord.findOne({
        sessionId: req.params.sessionId,
        studentId: req.body.studentId,
      });

      if (existingRecord) {
        return res.status(409).json({
          success: false,
          error: "Attendance already marked for this session",
        });
      }

      const attendanceRecord = new AttendanceRecord({
        ...req.body,
        sessionId: req.params.sessionId,
        courseId: session.courseId,
      });

      await attendanceRecord.save();

      const populatedRecord = await AttendanceRecord.findById(
        attendanceRecord.id
      )
        .populate("studentId", "name studentId")
        .populate("sessionId", "sessionName");

      return res.status(201).json({
        success: true,
        data: populatedRecord,
        message: "Attendance marked successfully",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: "Failed to mark attendance",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // GET /attendance/records - Get attendance records
  async getAttendanceRecords(
    req: Request<{}, {}, {}, AttendanceQuery>,
    res: Response<ApiResponse>
  ) {
    try {
      const {
        page = 1,
        limit = 10,
        sort = "markedAt",
        order = "desc",
        sessionId,
        studentId,
        courseId,
        dateFrom,
        dateTo,
      } = req.query;

      const filter: any = {};

      if (sessionId) filter.sessionId = sessionId;
      if (studentId) filter.studentId = studentId;
      if (courseId) filter.courseId = courseId;

      if (dateFrom || dateTo) {
        filter.markedAt = {};
        if (dateFrom) filter.markedAt.$gte = new Date(dateFrom);
        if (dateTo) filter.markedAt.$lte = new Date(dateTo);
      }

      const records = await AttendanceRecord.find(filter)
        .populate("studentId", "name studentId")
        .populate("sessionId", "sessionName startTime")
        .populate("courseId", "name code")
        .sort({ [sort]: order === "desc" ? -1 : 1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      const total = await AttendanceRecord.countDocuments(filter);

      res.json({
        success: true,
        data: {
          records,
          pagination: {
            page: Number(page),
            limit: Number(limit),
            total,
            pages: Math.ceil(total / limit),
          },
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to fetch attendance records",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // POST /attendance/records - Save manual attendance records
  async saveManualAttendance(
    req: Request<{}, {}, MarkAttendanceDto[]>,
    res: Response<ApiResponse>
  ) {
    try {
      const records = await AttendanceRecord.insertMany(
        req.body.map((record) => ({ ...record, markedBy: "manual" })),
        { ordered: false }
      );

      res.status(201).json({
        success: true,
        data: records,
        message: "Manual attendance records saved successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: "Failed to save manual attendance",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

export const attendanceController = new AttendanceController();
