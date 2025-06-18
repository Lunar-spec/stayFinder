import { getAllLodgings } from "api/api";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { PropertyCard } from "~/components/shared/PropertyCard";
import { Button } from "~/components/ui/button";

const Explore = () => {
  const [lodgings, setLodgings] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLodgings = async () => {
      try {
        const res = await getAllLodgings();
        setLoading(true);
        if (Array.isArray(res.lodgings)) {
          setLodgings(res.lodgings);
          setLoading(false);
        } else {
          console.error("Unexpected response format:", res);
          setLodgings([]);
        }
      } catch (error) {
        console.error("Error fetching lodgings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLodgings();
  }, []);

  return (
    <div
      className="w-full bg-cover"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1498335746477-0c73d7353a07?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      <div className="p-8">
        <div className="flex flex-col items-center justify-center py-4">
          <div className="flex md:flex-row flex-col gap-4 items-center justify-around w-full md:justify-around">
            <h1 className="md:text-4xl text-3xl text-center md:text-left font-bold">
              Explore the world with us
            </h1>
            <Link to="/lodgings">
              <Button variant={"outline"} className="rounded-full">
                View All Lodgings
              </Button>
            </Link>
          </div>
          <p className="text-center md:text-left text-base mt-4">
            Discover new places, cultures, and experiences with our curated
            travel guides and tips.
          </p>
        </div>
        {loading ? (
          <div className="flex items-center justify-center animate-spin">
            <Loader />
          </div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4
          px-8 py-4"
          >
            {lodgings.slice(0, 6).map((lodging) => (
              <PropertyCard key={lodging._id} lodging={lodging} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
