import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard - Smart Attendance System",
  description: "Administrative dashboard for managing students, teachers, and attendance",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
