import { MapPin, Search, Users } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";

const HomePage = () => {
  return (
    <div>
      <div
        className="min-h-screen flex items-center justify-center flex-col gap-4 bg-center bg-cover"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1594717527389-a590b56e8d0a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        <div className="bg-white/10 backdrop-blur-sm bg-opacity-80 p-8 rounded-lg max-w-4xl shadow-lg text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Stay<span className="text-blue-600">Finder</span>
            <sub className="text-xs text-white/50">BETA</sub>
          </h1>
          <p className="text-lg md:text-xl mb-8 leading-relaxed">
            Discover your perfect getaway. From cozy cabins to luxury resorts,
            find the ideal accommodation for your next adventure.
          </p>
        </div>

        <div className="flex flex-col items-center md:flex-row gap-4">
          <Link to="/lodgings">
            <Button variant={"secondary"} className="rounded-full">
              Explore Lodgings
            </Button>
          </Link>
          <Link to="/auth/login">
            <Button variant={"secondary"} className="rounded-full">
              Login
            </Button>
          </Link>
          <Link to="/auth/register">
            <Button variant={"secondary"} className="rounded-full">
              Register
            </Button>
          </Link>
        </div>

        <div className="text-center px-8">
          <p className="text-sm text-white/70 mt-4">
            Join our community of travelers and hosts. Your adventure starts
            here!
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
      <div>
        {/* Features Section */}
        <div
          className="py-14 text-white"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1545917992-dea2d782ef46?q=80&w=1978&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          }}
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                Why Choose StayFinder?
              </h2>
              <p className="text-lg text-white/50 max-w-2xl mx-auto">
                We make finding and booking your perfect accommodation simple,
                secure, and memorable.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-blue-100/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Prime Locations</h3>
                <p className="text-white/70">
                  Access to the best locations worldwide, from city centers to
                  hidden gems off the beaten path.
                </p>
              </div>

              <div className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-green-100/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Easy Search
                </h3>
                <p className="text-white/70">
                  Our smart search filters help you find exactly what you're
                  looking for in seconds.
                </p>
              </div>

              <div className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-purple-100/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Trusted Community
                </h3>
                <p className="text-white/70">
                  Join millions of travelers who trust StayFinder for their
                  accommodation needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
