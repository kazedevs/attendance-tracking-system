// Utility functions for exporting data
export const exportToCSV = (data: any[], filename: string) => {
  if (data.length === 0) return

  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(","),
    ...data.map((row) => headers.map((header) => `"${row[header] || ""}"`).join(",")),
  ].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", `${filename}.csv`)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const exportToExcel = (data: any[], filename: string) => {
  // In a real application, you would use a library like xlsx
  // For now, we'll just export as CSV with .xlsx extension
  exportToCSV(data, filename.replace(".xlsx", ""))
  console.log("Excel export would use a proper XLSX library in production")
}

export const generateReportData = (filters: any) => {
  // Mock function to generate report data based on filters
  return [
    {
      studentName: "John Smith",
      studentId: "STU001",
      course: "Computer Science",
      present: 18,
      absent: 1,
      late: 1,
      attendanceRate: "90%",
    },
    {
      studentName: "Emily Davis",
      studentId: "STU002",
      course: "Computer Science",
      present: 16,
      absent: 3,
      late: 1,
      attendanceRate: "80%",
    },
    // Add more mock data as needed
  ]
}
