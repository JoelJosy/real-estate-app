"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Loader2 } from "lucide-react"
import { mockProperties } from "@/lib/mock-data"
import PropertyCard from "@/components/property-card"
import { propertyAPI } from "@/lib/api"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function PropertiesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [properties, setProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [filters, setFilters] = useState({})

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true)
        const data = await propertyAPI.getAllProperties()
        setProperties(data)
        setFilteredProperties(data.slice(0, 15))
      } catch (err) {
        console.error("Error fetching properties:", err)
        setError("Failed to load properties. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    fetchProperties()
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const params = {
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
        area: filters.area || undefined,
        county: filters.county || undefined,
        propertyType: filters.propertyType || undefined,
        minBedrooms: filters.minBedrooms || undefined,
        title: searchQuery || undefined, // Added title to search
      }
      const results = await propertyAPI.searchProperties(params)
      setFilteredProperties(results.slice(0, 15))
    } catch (err) {
      console.error("Error searching properties:", err)
      setError("Failed to load search results.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Properties For Sale</h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-center">
          {/* Main Search Bar - Takes Half the Grid */}
          <div className="relative col-span-2">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            <Input
              type="text"
              placeholder="Search by title, location, or features"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 py-3 text-lg rounded-xl border-gray-300 shadow-sm"
            />
          </div>

          {/* Min Price */}
          <Input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice || ""}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            className="rounded-lg border-gray-300"
          />

          {/* Max Price */}
          <Input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice || ""}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            className="rounded-lg border-gray-300"
          />
        </div>

        {/* Other Filters */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          <Input
            type="text"
            placeholder="Area"
            value={filters.area || ""}
            onChange={(e) => setFilters({ ...filters, area: e.target.value })}
            className="rounded-lg border-gray-300"
          />

          <Input
            type="text"
            placeholder="County"
            value={filters.county || ""}
            onChange={(e) => setFilters({ ...filters, county: e.target.value })}
            className="rounded-lg border-gray-300"
          />

          <Input
            type="text"
            placeholder="Property Type"
            value={filters.propertyType || ""}
            onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
            className="rounded-lg border-gray-300"
          />

          <Input
            type="number"
            placeholder="Min Bedrooms"
            value={filters.minBedrooms || ""}
            onChange={(e) => setFilters({ ...filters, minBedrooms: e.target.value })}
            className="rounded-lg border-gray-300"
          />
        </div>

        {/* Search Button */}
        <div className="mt-4 flex justify-end">
          <Button type="submit" disabled={loading} className="px-6 py-2 text-lg">
            {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Search className="mr-2 h-5 w-5" />}
            Search
          </Button>
        </div>
      </form>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading && (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {!loading && filteredProperties.length === 0 ? (
        <div className="rounded-lg border bg-card p-8 text-center shadow-sm">
          <h3 className="mb-2 text-xl font-bold">No properties found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  )
}
