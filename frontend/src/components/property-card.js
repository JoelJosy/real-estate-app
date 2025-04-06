import Image from "next/image"
import Link from "next/link"
import { Heart, MapPin, Bed, Bath, Square } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"


export default function PropertyCard({ property }) {
    return (
        <Card className="overflow-hidden transition-all hover:shadow-md">
          <div className="relative">
            <Link href={`/properties/${property.id}`}>
              <div className="aspect-[16/9] overflow-hidden">
                <Image
                  src={property.image1 || "/images/placeholder.svg"}
                  alt={property.Title}
                  width={400}
                  height={225}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
            </Link>
            <Badge className="absolute left-2 top-2">
              For Sale
            </Badge>
            {/* <Button
              size="icon"
              variant="ghost"
              className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 text-muted-foreground hover:text-primary"
            >
              <Heart className="h-4 w-4" />
            </Button> */}
          </div>
    
          <CardContent className="p-4">
            <div className="mb-2 flex items-start justify-between">
              <div>
                <h3 className="font-bold line-clamp-1">
                  {property.Title}
                </h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-3 w-3" />
                  <span className="line-clamp-1">{property.County}</span>
                </div>
              </div>
              <p className="text-right font-bold text-primary">
                ${property.Price.toLocaleString()}
              </p>
            </div>
    
            <div className="mt-4 flex justify-between text-sm text-muted-foreground">
              <div className="flex items-center">
                <Bed className="mr-1 h-4 w-4" />
                <span>{property.NoOfBedrooms} Beds</span>
              </div>
              <div className="flex items-center">
                <Bath className="mr-1 h-4 w-4" />
                <span>{property.NoOfBathrooms} Baths</span>
              </div>
              <div className="flex items-center">
                <Square className="mr-1 h-4 w-4" />
                <span>{property.FloorArea} sq. m</span>
              </div>
            </div>
          </CardContent>
    
          <CardFooter className="border-t p-4">
            <Button asChild className="w-full">
              <Link href={`/properties/${property.id}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      )
}