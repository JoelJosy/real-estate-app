"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation";

import FeaturedProperties from "@/components/featured-properties"
import HowItWorks from "@/components/how-it-works"
import SellerDashboard from "@/components/seller-dashboard"

export default function Home() {
  // In a real app, this would come from authentication context
  const [userRole, setUserRole] = useState(null)
  const [query, setQuery] = useState("")
  const router = useRouter();

  // Simulate getting user role from localStorage on component mount
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole")
    if (storedRole === "buyer" || storedRole === "seller") {
      setUserRole(storedRole)
    }
  }, [])

  // If user is a seller, show seller dashboard
  if (userRole === "seller") {
    return <SellerDashboard />
  }

  const handleSearch = (e) => {
    e.preventDefault()
    console.log("Search query:", query)
    if (query.trim()) {
      router.push(`/properties?search=${encodeURIComponent(query)}`)
    } else {
      router.push("/properties")
    }
  }

  // Default buyer view
  return (
    <div className="flex flex-col gap-12">
      {/* Hero Section */}
      <section className="h-[600px] w-full bg-gradient-to-br from-gray-950 via-gray-800 to-gray-600">
        <div className="container mx-auto flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">Find Your Dream Home</h1>
          <p className="mb-8 max-w-2xl text-xl text-white">
            Discover thousands of properties for sale across the country
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-3xl rounded-lg bg-white p-4 shadow-lg">
            <div className="flex flex-col gap-4 md:flex-row">
              <Input
                type="text"
                placeholder="City, neighborhood, or address"
                className="flex-1"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button onClick={handleSearch}>
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Featured Properties</h2>
          <Link href="/properties" className="text-gray-950 hover:underline">
            View all properties
          </Link>
        </div>
        <FeaturedProperties />
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">How It Works</h2>
          <HowItWorks />
        </div>
      </section>
    </div>
  )
}

