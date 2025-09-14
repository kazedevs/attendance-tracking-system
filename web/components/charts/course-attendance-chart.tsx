"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: "Computer Science", value: 85, color: "hsl(var(--chart-1))" },
  { name: "Information Technology", value: 78, color: "hsl(var(--chart-2))" },
  { name: "Mathematics", value: 92, color: "hsl(var(--chart-3))" },
  { name: "Physics", value: 88, color: "hsl(var(--chart-4))" },
]

export function CourseAttendanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course-wise Attendance</CardTitle>
        <CardDescription>Average attendance percentage by course</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
