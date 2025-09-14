import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Calendar, QrCode, BarChart3 } from "lucide-react"
import Link from "next/link"

const myCourses = [
  {
    id: "1",
    name: "Data Structures",
    code: "CS201",
    students: 45,
    attendanceRate: 87,
    nextClass: "Today, 9:00 AM",
    status: "active",
  },
  {
    id: "2",
    name: "Algorithms",
    code: "CS301",
    students: 38,
    attendanceRate: 92,
    nextClass: "Tomorrow, 2:00 PM",
    status: "active",
  },
]

export function MyCourses() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Courses</CardTitle>
        <CardDescription>Overview of your teaching assignments</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {myCourses.map((course) => (
          <div key={course.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{course.name}</h3>
                <p className="text-sm text-muted-foreground">{course.code}</p>
              </div>
              <Badge variant={course.status === "active" ? "default" : "secondary"}>{course.status}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{course.students} students</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{course.nextClass}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Attendance Rate</span>
                <span>{course.attendanceRate}%</span>
              </div>
              <Progress value={course.attendanceRate} className="h-2" />
            </div>

            <div className="flex gap-2">
              <Link href={`/teacher/attendance?course=${course.id}`}>
                <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                  <QrCode className="h-3 w-3" />
                  Take Attendance
                </Button>
              </Link>
              <Link href={`/teacher/reports?course=${course.id}`}>
                <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                  <BarChart3 className="h-3 w-3" />
                  View Reports
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
