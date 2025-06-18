import { MapPin, Users, Bed, Bath, Star } from "lucide-react";
import { Link } from "react-router";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "../ui/button";

interface Lodging {
  _id: string;
  title: string;
  description?: string;
  price: number;
  images?: string[];
  amenities?: string[];
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  location?: {
    city?: string;
    state?: string;
  };
}

interface PropertyCardProps {
  lodging: Lodging;
}

export const PropertyCard = ({ lodging }: PropertyCardProps) => {
  const displayAmenities = lodging.amenities?.slice(0, 3) || [];
  const remainingAmenities = Math.max(0, (lodging.amenities?.length || 0) - 3);

  return (
    <Card className="bg-white/10 backdrop-blur-sm p-0 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02] overflow-hidden">
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={lodging.images?.[0] || "/api/placeholder/400/300"}
          loading="lazy"
          alt={lodging.title}
          className="w-full h-full object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute top-2 right-3">
          <div className="bg-blue-600/80 text-white px-3 py-1 rounded-full text-sm font-semibold">
            ${lodging.price}/night
          </div>
        </div>
      </div>

      <CardHeader>
        <div className="flex flex-col gap-2">
          <CardTitle className=" text-lg font-semibold">
            {lodging.title}
          </CardTitle>
          <CardAction className="text-blue-500 text-sm flex gap-1 w-full items-center">
            <MapPin size={18} />
            {lodging.location?.city}, {lodging.location?.state}
          </CardAction>
          <CardDescription className="text-accent-foreground/60 text-sm line-clamp-2 leading-relaxed">
            {lodging.description || "No description available."}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 px-6">
        {/* Property Details */}
        <div className="flex items-center gap-4 text-gray-500 text-sm">
          <div className="flex items-center gap-1">
            <Users size={18} className="text-blue-500" />
            <span>{lodging.maxGuests} guests</span>
          </div>
          <div className="flex items-center gap-1">
            <Bed size={18} className="text-blue-500" />
            <span>{lodging.bedrooms} bed</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={18} className="text-blue-500" />
            <span>{lodging.bathrooms} bath</span>
          </div>
        </div>
        {/* Amenities */}
        <div className="flex flex-wrap gap-2">
          {displayAmenities.map((amenity, index) => (
            <span
              key={index}
              className="bg-blue-600/20 text-blue-500 px-3 py-1 rounded-full text-xs font-medium border border-blue-500/30"
            >
              {amenity}
            </span>
          ))}
          {remainingAmenities > 0 && (
            <span className="bg-slate-300/50 text-gray-500 px-3 py-1 rounded-full text-xs font-medium border border-slate-600/30">
              +{remainingAmenities} more
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="border-slate-700/50 p-2 px-4">
        <Link
          to={`/lodgings/${lodging._id}`}
          className="flex items-center justify-between w-full"
        >
          <Button variant={'outline'} className="rounded-full border-blue-500 text-blue-500 hover:bg-blue-500/10 hover:text-blue-500 w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
