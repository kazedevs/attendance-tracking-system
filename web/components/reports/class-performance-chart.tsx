"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const performanceData = [
  { week: "Week 1", cs201: 92, cs301: 88, average: 90 },
  { week: "Week 2", cs201: 89, cs301: 91, average: 90 },
  { week: "Week 3", cs201: 94, cs301: 87, average: 90.5 },
  { week: "Week 4", cs201: 87, cs301: 93, average: 90 },
  { week: "Week 5", cs201: 91, cs301: 89, average: 90 },
  { week: "Week 6", cs201: 88, cs301: 92, average: 90 },
]

export function ClassPerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Class Performance Trends</CardTitle>
        <CardDescription>Weekly attendance rates by subject</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis domain={[80, 100]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cs201" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Data Structures" />
            <Line type="monotone" dataKey="cs301" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Algorithms" />
            <Line
              type="monotone"
              dataKey="average"
              stroke="hsl(var(--chart-5))"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Average"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
