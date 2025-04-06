"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Search } from "lucide-react"
import { mockProperties } from "@/lib/mock-data"
import PropertyCard from "@/components/property-card"
import AddPropertyForm from "@/components/add-property-form"

const DEMO_SELLER_ID = "seller1"

export default function SellerDashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Filter properties by seller ID
  const sellerProperties = mockProperties.filter((property) => property.sellerId === DEMO_SELLER_ID)

  // Filter properties by search query
  const filteredProperties = sellerProperties.filter((property) => {
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return (
      property.Title.toLowerCase().includes(query) ||
      property.County.toLowerCase().includes(query) ||
      property.Area.toLowerCase().includes(query)
    )
  })

  const handleEdit = (id) => {
    // In a real app, this would open an edit form
    console.log(`Edit property ${id}`)
  }

  const handleDelete = (id) => {
    // In a real app, this would delete the property
    console.log(`Delete property ${id}`)
  }

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Seller Dashboard</h1>
        <p className="text-muted-foreground">Manage your property listings</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search your listings..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Property
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

      {filteredProperties.length === 0 ? (
        <div className="rounded-lg border bg-card p-8 text-center shadow-sm">
          <h3 className="mb-2 text-xl font-bold">No Properties Found</h3>
          {searchQuery ? (
            <p className="text-muted-foreground">No properties match your search criteria.</p>
          ) : (
            <p className="text-muted-foreground">
              You haven't listed any properties yet. Add your first property to get started.
            </p>
          )}
          <Button onClick={() => setIsDialogOpen(true)} className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Property
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isSeller={true}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
