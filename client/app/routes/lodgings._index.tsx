import { useEffect, useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { MapPin, Users, Bed, Bath, Star } from "lucide-react";
import { getAllLodgings } from "api/api";
import { Link } from "react-router";

type Lodging = {
  _id: string;
  title: string;
  images: string[];
  price: number;
  location: {
    city: string;
    state: string;
  };
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
};

const Lodgings = () => {
  const [lodgings, setLodgings] = useState<Lodging[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLodgings = async () => {
      try {
        const response = await getAllLodgings();
        if (!response.lodgings) {
          throw new Error("Network response was not ok");
        }
        setLodgings(response.lodgings);
        setLoading(false);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        setLoading(false);
      }
    };

    fetchLodgings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
        <div className="text-blue-600 text-lg">Loading amazing places...</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1506744038136-46273834b3fb)",
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
            Discover Amazing Places
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find your perfect getaway from our curated collection of unique
            accommodations
          </p>
        </div>

        {/* Lodgings Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {lodgings.map((lodging) => (
            <Card
              key={lodging._id}
              className="group gap-2 p-0 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white/40 backdrop-blur-sm border-blue-100 max-w-sm"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={lodging.images[0]}
                  alt={lodging.title}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-blue-600 text-white text-xs px-2 py-1">
                    ${lodging.price}
                  </Badge>
                </div>
                <div className="absolute top-2 left-2">
                  <Badge
                    variant="secondary"
                    className="bg-white/90 text-blue-700 text-xs px-2 py-1"
                  >
                    <Star className="w-2 h-2 mr-1 fill-current" />
                    4.8
                  </Badge>
                </div>
              </div>

              <CardContent className="p-2 space-y-2">
                <div>
                  <h3 className="font-semibold text-sm text-blue-600 truncate group-hover:text-blue-400 transition-colors">
                    {lodging.title}
                  </h3>
                  <p className="flex items-center text-xs text-white mt-1">
                    <MapPin className="w-3 h-3 mr-1 text-blue-400" />
                    {lodging.location.city}, {lodging.location.state}
                  </p>
                </div>

                {/* Property Details */}
                <div className="flex items-center justify-between text-xs text-white">
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center gap-2">
                      <Users className="w-3 h-3 mr-1 text-blue-600" />
                      {lodging.maxGuests}
                    </span>
                    <span className="flex items-center">
                      <Bed className="w-3 h-3 mr-1 text-blue-600" />
                      {lodging.bedrooms}
                    </span>
                    <span className="flex items-center">
                      <Bath className="w-3 h-3 mr-1 text-blue-600" />
                      {lodging.bathrooms}
                    </span>
                  </div>
                </div>

                {/* Top Amenities */}
                <div className="flex flex-wrap gap-1">
                  {lodging.amenities.slice(0, 2).map((amenity, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs px-1 py-0 border-blue-400 bg-blue-300 text-blue-600 h-4"
                    >
                      {amenity}
                    </Badge>
                  ))}
                  {lodging.amenities.length > 2 && (
                    <Badge
                      variant="outline"
                      className="text-xs px-1 py-0 border-blue-200 bg-blue-300 text-blue-600 h-4"
                    >
                      +{lodging.amenities.length - 2}
                    </Badge>
                  )}
                </div>

                <Link to={`/lodgings/${lodging._id}`}>
                  <Button
                    size="sm"
                    className="w-full h-7 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white text-xs"
                  >
                    View
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Show More Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="px-8 py-3 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 transition-colors"
          >
            More properties coming soon!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Lodgings;
