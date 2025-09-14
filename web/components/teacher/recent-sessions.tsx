import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, Eye } from "lucide-react"

const recentSessions = [
  {
    id: "1",
    subject: "Data Structures",
    code: "CS201",
    date: "2024-01-23",
    time: "09:00 - 10:30",
    attendance: { present: 38, total: 45 },
    status: "completed",
  },
  {
    id: "2",
    subject: "Algorithms",
    code: "CS301",
    date: "2024-01-22",
    time: "14:00 - 15:30",
    attendance: { present: 35, total: 38 },
    status: "completed",
  },
  {
    id: "3",
    subject: "Data Structures",
    code: "CS201",
    date: "2024-01-22",
    time: "09:00 - 10:30",
    attendance: { present: 42, total: 45 },
    status: "completed",
  },
]

export function RecentSessions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sessions</CardTitle>
        <CardDescription>Your latest attendance sessions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentSessions.map((session) => (
          <div key={session.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{session.subject}</h3>
                <p className="text-sm text-muted-foreground">{session.code}</p>
              </div>
              <Badge variant="outline">{session.status}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{session.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{session.time}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>
                  {session.attendance.present}/{session.attendance.total} present
                </span>
                <Badge variant="secondary" className="text-xs">
                  {Math.round((session.attendance.present / session.attendance.total) * 100)}%
                </Badge>
              </div>
              <Button size="sm" variant="ghost" className="gap-2">
                <Eye className="h-3 w-3" />
                View Details
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
