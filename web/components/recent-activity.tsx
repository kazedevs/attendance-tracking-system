import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const recentActivities = [
  {
    id: "1",
    type: "attendance",
    message: "New attendance session created for CS201",
    user: "Dr. Sarah Johnson",
    time: "2 minutes ago",
    avatar: "/teacher-avatar.png",
  },
  {
    id: "2",
    type: "student",
    message: "New student enrolled: John Smith",
    user: "Admin User",
    time: "15 minutes ago",
    avatar: "/admin-avatar.png",
  },
  {
    id: "3",
    type: "report",
    message: "Monthly attendance report generated",
    user: "System",
    time: "1 hour ago",
    avatar: "/placeholder.svg",
  },
  {
    id: "4",
    type: "attendance",
    message: "Attendance marked for IT101 class",
    user: "Prof. Mark Wilson",
    time: "2 hours ago",
    avatar: "/teacher-avatar.png",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest system activities and updates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={activity.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {activity.user
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">{activity.message}</p>
              <div className="flex items-center space-x-2">
                <p className="text-xs text-muted-foreground">{activity.user}</p>
                <Badge variant="outline" className="text-xs">
                  {activity.type}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
