"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2 } from "lucide-react"
import { mockProperties, mockUsers } from "@/lib/mock-data"
import PropertyCard from "@/components/property-card"
import AddPropertyForm from "@/components/add-property-form"

export default function UserListings({ userId }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const user = mockUsers.find((u) => u.id === userId)

  if (!user || !user.listings) {
    return (
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <p className="text-center text-muted-foreground">User not found or has no listings</p>
      </div>
    )
  }

  const userListings = mockProperties.filter((property) => user.listings?.includes(property.id))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">My Listings ({userListings.length})</h2>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Property
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Property</DialogTitle>
            </DialogHeader>
            <AddPropertyForm onSuccess={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {userListings.length === 0 ? (
        <div className="rounded-lg border bg-card p-6 shadow-sm text-center">
          <h3 className="mb-2 text-lg font-bold">No Listings Yet</h3>
          <p className="mb-4 text-muted-foreground">
            You haven&apos;t added any properties for sale or rent. Add your first property to get started.
          </p>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Property
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {userListings.map((property) => (
            <div key={property.id} className="relative">
              <div className="absolute right-2 top-2 z-10 flex gap-1">
                <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button size="icon" variant="destructive" className="h-8 w-8 rounded-full">
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
