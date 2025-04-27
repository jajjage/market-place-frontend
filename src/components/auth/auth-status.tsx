"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/hooks/use-auth"
import { Loader2 } from "lucide-react"

type User = {
  id: string
  name: string
  email: string
} | null

interface AuthStatusProps {
  initialUser: User
}

export function AuthStatus({ initialUser }: AuthStatusProps) {
  const [user, setUser] = useState<User>(initialUser)
  const [isLoading, setIsLoading] = useState(false)
  const { logout } = useAuth()

  async function handleLogout() {
    setIsLoading(true)
    await logout()
    setUser(null)
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex items-center gap-4">
      <p className="text-sm">
        Signed in as <span className="font-medium">{user.email}</span>
      </p>
      <Button variant="outline" size="sm" onClick={handleLogout} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Logging out...
          </>
        ) : (
          "Log out"
        )}
      </Button>
    </div>
  )
}
