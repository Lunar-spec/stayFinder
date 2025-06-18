import {
  CircleCheckIcon,
  CircleHelpIcon,
  CircleIcon,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Featured Lodgings",
    href: "/lodgings",
    description:
      "Explore our featured lodgings, handpicked for quality and comfort.",
  },
  {
    title: "Popular Destinations",
    href: "/lodgings",
    description:
      "Discover popular destinations with top-rated lodgings available for booking.",
  },
  {
    title: "New Listings",
    href: "/lodgings",
    description:
      "Check out the latest listings added to our platform, offering fresh options for your stay.",
  },
  {
    title: "Luxury Stays",
    href: "/lodgings",
    description:
      "Indulge in luxury with our premium lodging options, perfect for a lavish getaway.",
  },
  {
    title: "Budget-Friendly Options",
    href: "/lodgings",
    description:
      "Find budget-friendly lodgings that offer great value without compromising on comfort.",
  },
  {
    title: "Pet-Friendly Lodgings",
    href: "/lodgings",
    description:
      "Travel with your furry friends! Discover lodgings that welcome pets.",
  },
];

const homeItems = [
  {
    title: "About StayFinder",
    href: "#",
    description:
      "Learn about our mission, values, and the team behind StayFinder.",
  },
  {
    title: "Contact Us",
    href: "#",
    description:
      "Have questions? Reach out to our support team for assistance.",
  },
  {
    title: "FAQ",
    href: "#",
    description: "Frequently asked questions about our services and policies.",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [homeOpen, setHomeOpen] = useState(false);
  const [lodgingsOpen, setLodgingsOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const closeSheet = () => setIsOpen(false);

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center lg:justify-around justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" className="font-bold text-xl">
              <div className="text-2xl font-bold">
                🏕️StayFinder<sub className="text-xs text-blue-600">BETA</sub>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Home</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full flex-col justify-end rounded-md p-6 no-underline outline-none select-none focus:shadow-md bg-cover bg-center bg-no-repeat relative overflow-hidden"
                            href="/"
                            style={{
                              backgroundImage:
                                "url(https://images.unsplash.com/photo-1611517947853-8ee8dd7ff348?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                            }}
                          >
                            {/* Dark overlay for better text readability */}
                            <div className="absolute inset-0 bg-black/30 rounded-md"></div>

                            {/* Content with higher z-index to appear above overlay */}
                            <div className="relative z-10">
                              <div className="mt-4 mb-2 text-lg font-semibold text-white">
                                Welcome to StayFinder
                              </div>
                              <p className="text-white/90 text-sm leading-tight">
                                Discover your next stay with us. Whether you're
                                a host or a guest, we have something for
                                everyone.
                              </p>
                            </div>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      {homeItems.map((item) => (
                        <ListItem
                          key={item.title}
                          href={item.href}
                          title={item.title}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Lodgings</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] lg:grid-cols-2">
                      {components.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link to="/auth/login">Login</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Register</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/auth/register"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="font-medium">
                              As a <span className="font-semibold">Host</span>
                            </div>
                            <div className="text-muted-foreground text-sm">
                              Create a listing to share your space with others.
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/auth/register"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="font-medium">
                              As a <span className="font-semibold">User</span>
                            </div>
                            <div className="text-muted-foreground text-sm">
                              Sign up to book stays and manage your
                              reservations.
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flow-root">
                  <div className="space-y-2 px-4">
                    {/* Home Section */}
                    <Collapsible open={homeOpen} onOpenChange={setHomeOpen}>
                      <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-left">
                        <span className="font-medium">Home</span>
                        <svg
                          className={`h-4 w-4 transition-transform ${
                            homeOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-2 pl-4">
                        <Link
                          to="/"
                          className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                          onClick={closeSheet}
                        >
                          Welcome to StayFinder
                        </Link>
                        {homeItems.map((item) => (
                          <Link
                            key={item.title}
                            to={item.href}
                            className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                            onClick={closeSheet}
                          >
                            {item.title}
                          </Link>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Lodgings Section */}
                    <Collapsible
                      open={lodgingsOpen}
                      onOpenChange={setLodgingsOpen}
                    >
                      <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-left">
                        <span className="font-medium">Lodgings</span>
                        <svg
                          className={`h-4 w-4 transition-transform ${
                            lodgingsOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-2 pl-4">
                        {components.map((component) => (
                          <Link
                            key={component.title}
                            to={component.href}
                            className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                            onClick={closeSheet}
                          >
                            {component.title}
                          </Link>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Login */}
                    <Link
                      to="/auth/login"
                      className="block py-2 font-medium hover:text-muted-foreground"
                      onClick={closeSheet}
                    >
                      Login
                    </Link>

                    {/* Register Section */}
                    <Collapsible
                      open={registerOpen}
                      onOpenChange={setRegisterOpen}
                    >
                      <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-left">
                        <span className="font-medium">Register</span>
                        <svg
                          className={`h-4 w-4 transition-transform ${
                            registerOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-2 pl-4">
                        <Link
                          to="/auth/register"
                          className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                          onClick={closeSheet}
                        >
                          As a Host
                        </Link>
                        <Link
                          to="/auth/register"
                          className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                          onClick={closeSheet}
                        >
                          As a User
                        </Link>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="text-sm leading-none font-semibold">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
