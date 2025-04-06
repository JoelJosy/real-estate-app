"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import PropertyCard from "@/components/property-card"
import { favoritesAPI } from "@/lib/api"
import { useAuth } from "@/app/contexts/AuthContext"

export default function SavedPropertiesPage() {
  const router = useRouter()
  const { isLoggedIn } = useAuth()
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {

    async function fetchFavorites() {
      try {
        setLoading(true)
        const data = await favoritesAPI.getFavorites()
        if (data && Array.isArray(data)) {
          setFavorites(data)
        } else {
          setFavorites([])
        }
      } catch (err) {
        console.error("Error fetching favorites:", err)
        setError("Failed to load your saved properties. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [isLoggedIn, router])

  const handleRemoveFavorite = async (propertyId) => {
    try {
      await favoritesAPI.removeFromFavorites(propertyId)
      // Update the favorites list after removal
      setFavorites(favorites.filter((property) => property.id !== propertyId))
    } catch (err) {
      console.error("Error removing favorite:", err)
    }
  }

  if (loading) {
    return (
      <div className="container flex items-center justify-center px-4 py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Saved Properties</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {favorites.length === 0 ? (
        <div className="rounded-lg border bg-card p-8 text-center shadow-sm">
          <h3 className="mb-2 text-xl font-bold">No Saved Properties</h3>
          <p className="mb-4 text-muted-foreground">
            You haven&apos;t saved any properties yet. Browse our listings and save properties you&apos;re interested
            in.
          </p>
          <Button onClick={() => router.push("/properties")}>Browse Properties</Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((property) => (
            <div key={property.id} className="relative">
              <PropertyCard property={property} />
              <Button
                variant="destructive"
                size="sm"
                className="absolute right-2 top-2 z-10"
                onClick={() => handleRemoveFavorite(property.id)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

