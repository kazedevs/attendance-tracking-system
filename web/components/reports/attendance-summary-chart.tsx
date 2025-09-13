"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const summaryData = [
  { month: "Sep", present: 1240, absent: 160, late: 80 },
  { month: "Oct", present: 1320, absent: 120, late: 60 },
  { month: "Nov", present: 1280, absent: 140, late: 80 },
  { month: "Dec", present: 1350, absent: 100, late: 50 },
  { month: "Jan", present: 1380, absent: 90, late: 30 },
]

export function AttendanceSummaryChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Attendance Summary</CardTitle>
        <CardDescription>Attendance trends over the past 5 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={summaryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="present" fill="hsl(var(--chart-1))" name="Present" />
            <Bar dataKey="late" fill="hsl(var(--chart-4))" name="Late" />
            <Bar dataKey="absent" fill="hsl(var(--chart-3))" name="Absent" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
