"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserProfile from "@/components/user-profile"
import SavedProperties from "@/components/saved-properties"
import UserListings from "@/components/user-listings"
import { mockUsers } from "@/lib/mock-data"

export default function ProfilePage() {
  const router = useRouter()
  const [userRole, setUserRole] = useState(null)

  // Get user role from localStorage on component mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    const storedRole = localStorage.getItem("userRole")

    if (!isLoggedIn || !storedRole) {
      // Redirect to login if not logged in
      router.push("/auth/login")
      return
    }

    setUserRole(storedRole)
  }, [router])

  // If user role is not loaded yet, don't render anything
  if (!userRole) return null

  // Get the appropriate user based on role
  const user = userRole === "buyer" ? mockUsers[0] : mockUsers[1]

  return (
    <div className="container px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">My Profile</h1>

      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          {userRole === "buyer" && <TabsTrigger value="saved">Saved Properties</TabsTrigger>}
          {userRole === "seller" && <TabsTrigger value="listings">My Listings</TabsTrigger>}
        </TabsList>

        <TabsContent value="profile">
          <UserProfile user={user} />
        </TabsContent>

        {userRole === "buyer" && (
          <TabsContent value="saved">
            <SavedProperties userId={user.id} />
          </TabsContent>
        )}

        {userRole === "seller" && (
          <TabsContent value="listings">
            <UserListings userId={user.id} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}