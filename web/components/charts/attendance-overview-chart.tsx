"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: "Mon", present: 85, absent: 15 },
  { name: "Tue", present: 92, absent: 8 },
  { name: "Wed", present: 78, absent: 22 },
  { name: "Thu", present: 88, absent: 12 },
  { name: "Fri", present: 95, absent: 5 },
  { name: "Sat", present: 70, absent: 30 },
]

export function AttendanceOverviewChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Attendance Overview</CardTitle>
        <CardDescription>Daily attendance rates for the current week</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="present" fill="hsl(var(--chart-1))" name="Present" />
            <Bar dataKey="absent" fill="hsl(var(--chart-3))" name="Absent" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
