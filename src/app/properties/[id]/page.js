"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Share2, MapPin, Bed, Bath, Square, Calendar, Phone, Mail, Loader2 } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { propertyAPI } from "@/lib/api"
import { useAuth } from "@/app/contexts/AuthContext"
import { userAPI } from "@/lib/api"
import { favoritesAPI } from "@/lib/api"
import { toast } from 'sonner'



export default function PropertyPage() {
  const params = useParams()
  const router = useRouter()
  const { isLoggedIn, userRole, showNotification } = useAuth()

  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isSaved, setIsSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [feats, setFeats] = useState("")
  const [isEditing, setIsEditing] = useState(false) 

  useEffect(() => {
    async function fetchProperty() {
      try {
        setLoading(true)
        const data = await propertyAPI.getPropertyById(params.id)
        setProperty(data)
        setFeats(data.Features || "") 

        // Check if already favorited
        try {
          const favorites = await favoritesAPI.getFavorites(); // Fetch user's saved properties
          favorites.forEach(fav => {
            if (fav.id === data.id) setIsSaved(true);
          });
          
        } catch (err) {
          console.log("No favorites")
        }

      } catch (err) {
        console.error("Error fetching property:", err)
        setError("Failed to load property details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProperty()
    }
  }, [params.id])


  // Handle the save button click to add property to favorites
  const handleSave = async () => {
    try {
      setSaving(true)
      console.log(property.id)
      const response = await favoritesAPI.addToFavorites(property.id)
      setIsSaved(true)
      toast.success("Added to favorites");
    } catch (err) {
      console.error("Error adding to favorites:", err)
      toast.warning("Failed to add property");
    } finally {
      setSaving(false)
    }
  }

  // Handle the unsave button click to remove property from favorites
  const handleUnsave = async () => {
    try {
      setSaving(true)
      await favoritesAPI.removeFromFavorites(property.id)
      setIsSaved(false)
      toast.error("Removed from favorites");
    } catch (err) {
      console.error("Error removing from favorites:", err)
      toast.warning("Failed to remove property");
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = async () => {
    try {
      await propertyAPI.updateProperty(property.id, { Features: feats });
      alert("Property updated successfully");

      // Refetch property to show updated features
      const updatedProperty = await propertyAPI.getPropertyById(property.id);
      setProperty(updatedProperty);
      setFeats(updatedProperty.Features || "");
      setIsEditing(false);

    } catch (error) {
      console.error("Error updating property", error);
      alert("Failed to edit property");
    }
  };

  const toggleEdit = () => {
    if (isEditing) {
      handleEdit();
    } else {
      setIsEditing(true);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto flex items-center justify-center px-4 py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button className="mt-4" onClick={() => router.push("/properties")}>
          Back to Properties
        </Button>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert>
          <AlertDescription>Property not found</AlertDescription>
        </Alert>
        <Button className="mt-4" onClick={() => router.push("/properties")}>
          Back to Properties
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title + Buttons */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{property.Title}</h1>
          <div className="mt-1 flex items-center text-muted-foreground">
            <MapPin className="mr-1 h-4 w-4" />
            <span>{property.County}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isSaved ? (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleUnsave} 
              disabled={saving}
            >
              <Heart className="mr-2 h-4 w-4 text-red-500" />
              {saving ? "Removing..." : "Unsave"}
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSave} 
              disabled={saving || isSaved}
            >
              <Heart className="mr-2 h-4 w-4" />
              {saving ? "Saving..." : "Save"}
            </Button>
          )}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[2fr_1fr]">
        {/* Left: Carousel */}
        <div>
          <Carousel className="w-full max-w-4xl">
            <CarouselContent>
            <CarouselItem key={0}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex items-center justify-center p-2">
                        <Image
                          src={property.image1 || "/placeholder.svg"}
                          alt={`${property.Title} ${1}`}
                          width={800}
                          height={500}
                          className="h-full w-full rounded-lg object-cover"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
                <CarouselItem key={1}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex items-center justify-center p-2">
                        <Image
                          src={property.image2 || "/placeholder.svg"}
                          alt={`${property.Title} ${2}`}
                          width={800}
                          height={500}
                          className="h-full w-full rounded-lg object-cover"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
                <CarouselItem key={2}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex items-center justify-center p-2">
                        <Image
                          src={property.image3 || "/placeholder.svg"}
                          alt={`${property.Title} ${3}`}
                          width={800}
                          height={500}
                          className="h-full w-full rounded-lg object-cover"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Right: Two Cards stacked */}
        <div className="flex flex-col gap-6">
          {/* Property Info Card */}
          <div className="rounded-lg border h-full w-lg bg-card p-6 shadow-sm">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <Badge className="mb-2">
                  For Sale
                </Badge>
                <p className="text-3xl font-bold text-primary">
                  ${property.Price.toLocaleString()}
                </p>
              </div>
              <div className="flex flex-wrap justify-between gap-7">
                <div className="flex items-center">
                  <Bed className="mr-2 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{property.NoOfBedrooms}</p>
                    <p className="text-sm text-muted-foreground">Beds</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Bath className="mr-2 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{property.NoOfBathrooms}</p>
                    <p className="text-sm text-muted-foreground">Baths</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Square className="mr-2 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{property.FloorArea}</p>
                    <p className="text-sm text-muted-foreground">Sq M</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{property.DateOfConstruction}</p>
                    <p className="text-sm text-muted-foreground">Year</p>
                  </div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="area">
              <TabsList className="mb-4">
                <TabsTrigger value="area">Area</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="prediction">Price Prediction</TabsTrigger>
              </TabsList>
              <TabsContent value="area">
                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
                  <h3 className="text-lg font-semibold mb-1 text-gray-900">Area</h3>
                  <h3 className="mb-3">{property.Area}</h3>
                  <h3 className="text-lg font-semibold mb-1 text-gray-900">County</h3>
                  <h3>{property.County}</h3>
                </div>
              </TabsContent>
              <TabsContent value="features">
                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Property Features</h3>
                  {property.Features ? (
                    <ul className="space-y-2 text-gray-700 list-disc list-inside">
                      {property.Features.split(",").map((feature, index) => (
                        <li key={index} className="pl-2">{feature.trim()}</li>
                      ))}
                    </ul>
                  ) : (
                    <h2 className="text-md font-semibold text-gray-900">N/A</h2>
                  )}
                  <Textarea
                    className="w-full my-8"
                    value={feats}
                    onChange={(e) => setFeats(e.target.value)}
                    placeholder="Edit property features..."
                    disabled={!isEditing}
                  />

                  {isEditing ? (
                    <Button onClick={toggleEdit} className="mr-2">Save</Button>
                  ) : (
                    <Button onClick={toggleEdit}>Edit</Button>
                  )}

                </div>
              </TabsContent>
              {/* Reviews and Prediction content */}
            </Tabs>
          </div>

          {/* Agent Card */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-6 text-center">
              <Image
                src={"/images/placeholder.svg"}
                alt={property.username || "Unknown Agent"}
                width={100}
                height={100}
                className="mx-auto mb-4 rounded-full"
              />
              <h3 className="text-xl font-bold">{property.username || "Unknown Agent"}</h3>
              <p className="text-muted-foreground">Real Estate Agent</p>
            </div>
            <div className="mb-6 space-y-2">
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{property.email || "N/A"}</span>
              </div>
            </div>
            <div className="space-y-4">
              <Button className="w-full">Contact Agent</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}