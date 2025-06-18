import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Users,
  Bed,
  Bath,
  Wifi,
  Car,
  Coffee,
  Star,
} from "lucide-react";
import { toast } from "sonner";
import { getLodgingById } from "api/api";

type LodgingType = {
  title: string;
  images: string[];
  location: {
    address: string;
    city: string;
    state: string;
  };
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  amenities: string[];
  host: {
    name: string;
  };
  price: number;
};

const Lodging = ({ params }: { params: any }) => {
  const [loading, setLoading] = useState(true);
  const [lodging, setLodging] = useState<LodgingType | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchLodging = async () => {
      try {
        if (params?.property) {
          const res = await getLodgingById(params.property);
          if (res && res.lodging) {
            setLodging(res.lodging);
            setLoading(false);
          }
        } else {
          console.error("Property parameter is missing");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching lodging:", error);
        setLoading(false);
      }
    };

    fetchLodging();
  }, [params?.property]);

  const nextImage = () => {
    if (
      lodging?.images &&
      Array.isArray(lodging.images) &&
      lodging.images.length > 0
    ) {
      setCurrentImageIndex((prev) =>
        prev === lodging.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (
      lodging?.images &&
      Array.isArray(lodging.images) &&
      lodging.images.length > 0
    ) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? lodging.images.length - 1 : prev - 1
      );
    }
  };

  const handleBookNow = () => {
    toast.success("Your room has been booked! Please enjoy your stay 🎉", {
      duration: 3000,
      style: {
        backgroundColor: "#3b82f6",
        color: "white",
        border: "none",
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!lodging) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Property Not Found
          </h2>
          <p className="text-gray-600">
            The requested property could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Image Carousel */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="aspect-[4/3] relative">
                {lodging?.images &&
                Array.isArray(lodging.images) &&
                lodging.images.length > 0 ? (
                  <>
                    <img
                      src={
                        lodging.images[currentImageIndex] || lodging.images[0]
                      }
                      alt={`${lodging.title || "Property"} - Image ${
                        currentImageIndex + 1
                      }`}
                      className="w-full h-full object-cover"
                    />

                    {/* Navigation Arrows - only show if more than 1 image */}
                    {lodging.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
                        >
                          <ChevronLeft className="w-5 h-5 text-gray-700" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
                        >
                          <ChevronRight className="w-5 h-5 text-gray-700" />
                        </button>

                        {/* Image Counter */}
                        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                          {currentImageIndex + 1} / {lodging.images.length}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <div className="text-gray-500">No images available</div>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            {lodging?.images &&
              Array.isArray(lodging.images) &&
              lodging.images.length > 1 && (
                <div className="flex gap-3">
                  {lodging.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative aspect-square w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        currentImageIndex === index
                          ? "border-blue-500 ring-2 ring-blue-200"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${lodging.title || "Property"} thumbnail ${
                          index + 1
                        }`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
          </div>

          {/* Right Side - Details */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              {/* Title and Location */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {lodging.title}
                </h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>
                    {lodging.location.address}, {lodging.location.city},{" "}
                    {lodging.location.state}
                  </span>
                </div>
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      (4.9) · 127 reviews
                    </span>
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-blue-50 rounded-lg">
                <div className="text-center">
                  <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <div className="text-sm font-medium text-gray-700">
                    {lodging.maxGuests} Guests
                  </div>
                </div>
                <div className="text-center">
                  <Bed className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <div className="text-sm font-medium text-gray-700">
                    {lodging.bedrooms} Bedroom
                  </div>
                </div>
                <div className="text-center">
                  <Bath className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <div className="text-sm font-medium text-gray-700">
                    {lodging.bathrooms} Bathroom
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  About this place
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {lodging.description}
                </p>
              </div>

              {/* Amenities */}
              {lodging?.amenities &&
                Array.isArray(lodging.amenities) &&
                lodging.amenities.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Amenities
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {lodging.amenities.map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-center text-gray-600"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span className="text-sm">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Host Info */}
              <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Hosted by {lodging.host.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  Experienced host dedicated to providing exceptional stays
                </p>
              </div>

              {/* Pricing and Booking */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-3xl font-bold text-gray-800">
                      ${lodging.price}
                    </span>
                    <span className="text-gray-600 ml-1">per night</span>
                  </div>
                </div>

                <button
                  onClick={handleBookNow}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Book Now
                </button>

                <div className="mt-3 text-center text-sm text-gray-500 hidden">
                  You won't be charged yet
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lodging;
