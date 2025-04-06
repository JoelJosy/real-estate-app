import { mockProperties } from "@/lib/mock-data"
import PropertyCard from "./property-card"

export default function FeaturedProperties() {
  // Get 4 featured properties
  const featuredProperties = mockProperties.slice(0, 4)

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {featuredProperties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
}

