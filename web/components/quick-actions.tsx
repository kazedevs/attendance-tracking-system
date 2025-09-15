import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, GraduationCap, BookOpen, BarChart3 } from "lucide-react"
import Link from "next/link"

const quickActions = [
  {
    title: "Add Student",
    description: "Register a new student",
    icon: Users,
    href: "/admin/students?action=add",
    color: "bg-blue-500",
  },
  {
    title: "Add Teacher",
    description: "Register a new teacher",
    icon: GraduationCap,
    href: "/admin/teachers?action=add",
    color: "bg-green-500",
  },
  {
    title: "Create Course",
    description: "Set up a new course",
    icon: BookOpen,
    href: "/admin/courses?action=add",
    color: "bg-purple-500",
  },
  {
    title: "Generate Report",
    description: "Create attendance report",
    icon: BarChart3,
    href: "/admin/reports",
    color: "bg-orange-500",
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Frequently used administrative tasks</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {quickActions.map((action) => {
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
