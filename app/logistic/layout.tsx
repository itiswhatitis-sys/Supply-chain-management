import { Sidebar } from "@/components/logisticdashboard/Sidebar"
import { signOut } from "next-auth/react"
import type { ReactNode } from "react"

export default function SupplierLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        {children}
      </body>
    </html>
  )
}
