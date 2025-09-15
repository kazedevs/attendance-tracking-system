import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QrCode, FileText, BarChart3, Users } from "lucide-react"
import Link from "next/link"

const teacherActions = [
  {
    title: "Start Attendance",
    description: "Generate QR code for class",
    icon: QrCode,
    href: "/teacher/attendance",
    color: "bg-green-500",
  },
  {
    title: "View Sessions",
    description: "Manage attendance sessions",
    icon: FileText,
    href: "/teacher/sessions",
    color: "bg-blue-500",
  },
  {
    title: "Generate Report",
    description: "Export attendance data",
    icon: BarChart3,
    href: "/teacher/reports",
    color: "bg-purple-500",
  },
  {
    title: "Student List",
    description: "View enrolled students",
    icon: Users,
    href: "/teacher/students",
    color: "bg-orange-500",
  },
]

export function QuickActionsTeacher() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common teaching tasks</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {teacherActions.map((action) => {
          const Icon = action.icon
          return (
            <Link key={action.title} href={action.href}>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 w-full bg-transparent cursor-pointer"
              >
                <div className={`p-2 rounded-lg ${action.color} text-white`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm">{action.title}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </Button>
            </Link>
          )
        })}
      </CardContent>
    </Card>
  )
}
