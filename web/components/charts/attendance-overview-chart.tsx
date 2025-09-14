"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users } from "lucide-react"

const data = [
  { name: "Week 1", present: 420, absent: 80, total: 500 },
  { name: "Week 2", present: 445, absent: 55, total: 500 },
  { name: "Week 3", present: 390, absent: 110, total: 500 },
  { name: "Week 4", present: 465, absent: 35, total: 500 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const present = payload[0]?.value || 0
    const absent = payload[1]?.value || 0
    const total = present + absent
    const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0

    return (
      <div className="bg-background border border-border rounded-lg p-3 shadow-md">
        <p className="font-medium text-foreground">{`${label}`}</p>
        <div className="space-y-1 mt-2">
          <p className="text-sm" style={{color: "#2B8C4F"}}>
            <span className="inline-block w-3 h-3 rounded-full mr-2" style={{backgroundColor: "#2B8C4F"}}></span>
            Present: {present} ({percentage}%)
          </p>
          <p className="text-sm text-red-600">
            <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
            Absent: {absent}
          </p>
          <p className="text-sm text-muted-foreground border-t pt-1">
            Total: {total} students
          </p>
        </div>
      </div>
    )
  }
  return null
}

export function AttendanceOverviewChart() {
  const totalPresent = data.reduce((sum, day) => sum + day.present, 0)
  const totalStudents = data.reduce((sum, day) => sum + day.total, 0)
  const averageAttendance = totalStudents > 0 ? ((totalPresent / totalStudents) * 100).toFixed(1) : 0
  const bestWeek = data.reduce((best, week) => week.present > best.present ? week : best, data[0])

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Monthly Attendance Overview
            </CardTitle>
            <CardDescription>Weekly attendance rates for the current month</CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" style={{color: "#2B8C4F"}} />
                <span className="text-sm font-medium">Avg: {averageAttendance}%</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-4">
          <Badge variant="outline" className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full" style={{backgroundColor: "#2B8C4F"}}></span>
            Present
          </Badge>
          <Badge variant="outline" className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
            Absent
          </Badge>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              className="text-sm"
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              className="text-sm"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="present" 
              fill="#2B8C4F" 
              name="Present" 
              radius={[4, 4, 0, 0]}
              className="hover:opacity-80 transition-opacity"
            />
            <Bar 
              dataKey="absent" 
              fill="#ef4444" 
              name="Absent" 
              radius={[4, 4, 0, 0]}
              className="hover:opacity-80 transition-opacity"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
