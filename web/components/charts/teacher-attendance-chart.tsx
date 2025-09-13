"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { date: "Jan 15", cs201: 85, cs301: 92 },
  { date: "Jan 16", cs201: 88, cs301: 89 },
  { date: "Jan 17", cs201: 92, cs301: 95 },
  { date: "Jan 18", cs201: 78, cs301: 88 },
  { date: "Jan 19", cs201: 95, cs301: 92 },
  { date: "Jan 22", cs201: 89, cs301: 90 },
  { date: "Jan 23", cs201: 93, cs301: 94 },
]

export function TeacherAttendanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Trends</CardTitle>
        <CardDescription>Daily attendance rates for your subjects</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="cs201"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              name="Data Structures (CS201)"
            />
            <Line
              type="monotone"
              dataKey="cs301"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              name="Algorithms (CS301)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
