"use client";

import { useState } from "react";
import { Search, Star, MapPin, Hotel, X, Check, Eye, Calendar, User, Users, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// Destinations Data with Official URLs and Realistic Prices
const featuredDestinations = [
  {
    id: 1,
    name: "Maldives",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80",
    rating: 4.8,
    price: "79,999",
    description:
      "The Maldives is a tropical nation in the Indian Ocean composed of 26 ring-shaped atolls, which are made up of more than 1,000 coral islands. It's known for its beaches, blue lagoons, and extensive reefs.",
    attractions: [
      "White Sandy Beaches",
      "Luxury Resorts",
      "Underwater Maldives",
      "Marine Life",
    ],
    bestTimeToVisit: "November to April",
    officialUrl: "https://visitmaldives.com",
    duration: "5 nights, 6 days",
    inclusions: ["Accommodation", "Airport Transfers", "Daily Breakfast", "Island Tour"],
    departureCity: "Mumbai"
  },
  {
    id: 2,
    name: "Santorini",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80",
    rating: 4.9,
    price: "65,999",
    description:
      "Santorini is a volcanic island in the Cyclades group of the Greek Islands. It's known for its dramatically beautiful sunset views, white-washed buildings with blue domes, and stunning cliff-side architecture.",
    attractions: [
      "Oia Sunset",
      "Blue Domed Churches",
      "Volcanic Beaches",
      "Ancient Ruins",
    ],
    bestTimeToVisit: "April to October",
    officialUrl: "https://www.santorini.gr",
    duration: "6 nights, 7 days",
    inclusions: ["Accommodation", "Ferry Transfers", "Daily Breakfast", "Caldera Tour"],
    departureCity: "Delhi"
  },
  {
    id: 3,
    name: "Bali",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80",
    rating: 4.7,
    price: "42,999",
    description:
      "Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches, and coral reefs. It's a popular destination for its unique culture, spiritual retreats, and vibrant arts scene.",
    attractions: [
      "Ubud Monkey Forest",
      "Temple Tours",
      "Beach Clubs",
      "Rice Terraces",
    ],
    bestTimeToVisit: "April to October",
    officialUrl: "https://www.indonesia.travel/gb/en/explore-indonesia/bali-nusa-tenggara",
    duration: "5 nights, 6 days",
    inclusions: ["Accommodation", "Airport Transfers", "Daily Breakfast", "Ubud Tour"],
    departureCity: "Chennai"
  },
  {
    id: 4,
    name: "Kerala",
    image:
      "https://th.bing.com/th/id/OIP.uT7Wl0kVemIz-HmT58PSqwHaEK?w=333&h=187&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
    rating: 4.8,
    price: "21,499",
    description:
      "Kerala, known as 'God's Own Country', is a tropical paradise in southern India famous for its lush green landscapes, backwaters, tea plantations, and unique culture. It offers a perfect blend of natural beauty and rich traditions.",
    attractions: [
      "Backwater Houseboats",
      "Munnar Tea Plantations",
      "Ayurvedic Resorts",
      "Wildlife Sanctuaries",
      "Beaches of Kovalam",
    ],
    bestTimeToVisit: "September to March",
    officialUrl: "https://www.keralatourism.org",
    duration: "4 nights, 5 days",
    inclusions: ["Accommodation", "Airport Transfers", "Daily Breakfast", "Houseboat Stay"],
    departureCity: "Bangalore"
  },
  {
    id: 5,
    name: "Ladakh",
    image:
      "https://th.bing.com/th/id/OIP.aaa-B2cjdKhBHv1jKKqg9AHaEy?w=310&h=200&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
    rating: 4.9,
    price: "25,999",
    description:
      "Ladakh is a high-altitude desert region in northern India, known for its stunning mountain landscapes, Buddhist monasteries, and unique culture. It offers breathtaking views of the Himalayan range and a serene, otherworldly experience.",
    attractions: [
      "Pangong Lake",
      "Thiksey Monastery",
      "Nubra Valley",
      "High Mountain Passes",
      "Buddhist Culture",
    ],
    bestTimeToVisit: "June to September",
    officialUrl: "https://leh.nic.in/tourism/",
    duration: "6 nights, 7 days",
    inclusions: ["Accommodation", "Airport Transfers", "Daily Meals", "Monastery Tour"],
    departureCity: "Delhi"
  },
  {
    id: 6,
    name: "Goa",
    image:
      "https://th.bing.com/th/id/OIP.dpYIP0oa5Rh1A4ttHr1rygHaE8?w=306&h=204&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
    rating: 4.7,
    price: "15,999",
    description:
      "Goa is a vibrant coastal state in western India, renowned for its beautiful beaches, Portuguese-influenced architecture, vibrant nightlife, and unique blend of Indian and European cultures.",
    attractions: [
      "Beaches",
      "Water Sports",
      "Portuguese Churches",
      "Night Markets",
      "Seafood Cuisine",
    ],
    bestTimeToVisit: "November to March",
    officialUrl: "https://www.goatourism.gov.in",
    duration: "3 nights, 4 days",
    inclusions: ["Accommodation", "Airport Transfers", "Daily Breakfast", "South Goa Tour"],
    departureCity: "Mumbai"
  },
  {
    id: 7,
    name: "Andaman Islands",
    image:
      "https://th.bing.com/th/id/OIP.EuXpIRvi3V-h9TfzQ7souQHaEb?w=322&h=193&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
    rating: 4.8,
    price: "32,499",
    description:
      "The Andaman Islands are a stunning archipelago in the Bay of Bengal, offering pristine beaches, crystal-clear waters, rich marine life, and a perfect tropical paradise experience with unique indigenous cultures.",
    attractions: [
      "Cellular Jail",
      "Coral Reefs",
      "Havelock Island",
      "Scuba Diving",
      "Pristine Beaches",
    ],
    bestTimeToVisit: "October to May",
    officialUrl: "https://www.andamantourism.gov.in/",
    duration: "5 nights, 6 days",
    inclusions: ["Accommodation", "Ferry Transfers", "Daily Breakfast", "Island Hopping"],
    departureCity: "Kolkata"
  },
  {
    id: 8,
    name: "Rajasthan",
    image:
      "https://th.bing.com/th/id/OIP.TZ_9gEdN97s9t8y67ZolbgHaEm?w=274&h=180&c=7&r=0&o=5&pid=1.7",
    rating: 4.8,
    price: "18,999",
    description:
      "Rajasthan, the 'Land of Kings', is a vibrant state in northern India known for its majestic palaces, colorful culture, desert landscapes, and rich historical heritage. It offers a mesmerizing journey through royal traditions and architectural wonders.",
    attractions: [
      "Jaipur Pink City",
      "Mehrangarh Fort",
      "Camel Safari",
      "Desert Festivals",
      "Palatial Hotels",
    ],
    bestTimeToVisit: "October to March",
    officialUrl: "https://tourism.rajasthan.gov.in",
    duration: "6 nights, 7 days",
    inclusions: ["Accommodation", "Car Transfers", "Daily Breakfast", "Palace Tours"],
    departureCity: "Delhi"
  },
  {
    id: 9,
    name: "Sikkim",
    image:
      "https://th.bing.com/th/id/OIP.52Gy9Hyk5U3ozRr1z9RfaAHaFF?w=301&h=207&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
    rating: 4.7,
    price: "22,499",
    description:
      "Sikkim is a northeastern Indian state nestled in the Himalayas, known for its biodiversity, pristine landscapes, Buddhist monasteries, and stunning mountain views. It offers a unique blend of natural beauty, cultural richness, and spiritual serenity.",
    attractions: [
      "Gangtok City",
      "Tsongmo Lake",
      "Rumtek Monastery",
      "Himalayan Views",
      "Tea Gardens",
    ],
    bestTimeToVisit: "March to May and September to November",
    officialUrl: "https://www.sikkimtourism.gov.in",
    duration: "5 nights, 6 days",
    inclusions: ["Accommodation", "Car Transfers", "Daily Meals", "Permit Arrangements"],
    departureCity: "Kolkata"
  },
];

// Destination Card Component
const DestinationCard = ({ destination, onViewDetails }) => (
  <div className="group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
    <div className="relative h-64">
      <img
        src={destination.image}
        alt={destination.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-medium">{destination.rating}</span>
        </div>
      </div>
    </div>
    <div className="p-4">
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="h-4 w-4 text-primary" />
        <h3 className="text-xl font-semibold">{destination.name}</h3>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-primary">
          From ₹{destination.price}
        </span>
        <Button variant="outline" onClick={() => onViewDetails(destination)}>
          View Details
        </Button>
      </div>
    </div>
  </div>
);

// User Details Form Component
const UserDetailsForm = ({ onSubmit, onCancel, destination }) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    preferences: {
      accommodationType: "3-Star Hotel",
      travelStyle: "Leisure",
      budget: "Medium",
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setUserDetails({
        ...userDetails,
        [parent]: {
          ...userDetails[parent],
          [child]: value
        }
      });
    } else {
      setUserDetails({
        ...userDetails,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userDetails);
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <User className="h-6 w-6 text-primary" />
            Traveler Details
          </DialogTitle>
          <DialogDescription>
            Please provide your information to preview your trip to {destination.name}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
              <Input
                id="name"
                name="name"
                value={userDetails.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={userDetails.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
              <Input
                id="phone"
                name="phone"
                value={userDetails.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>
            
            <div>
              <label htmlFor="accommodationType" className="block text-sm font-medium mb-1">Preferred Accommodation</label>
              <select
                id="accommodationType"
                name="preferences.accommodationType"
                value={userDetails.preferences.accommodationType}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="3-Star Hotel">3-Star Hotel</option>
                <option value="4-Star Hotel">4-Star Hotel</option>
                <option value="5-Star Hotel">5-Star Hotel</option>
                <option value="Resort">Resort</option>
                <option value="Homestay">Homestay</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="travelStyle" className="block text-sm font-medium mb-1">Travel Style</label>
              <select
                id="travelStyle"
                name="preferences.travelStyle"
                value={userDetails.preferences.travelStyle}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="Leisure">Leisure</option>
                <option value="Adventure">Adventure</option>
                <option value="Cultural">Cultural</option>
                <option value="Family">Family</option>
                <option value="Romantic">Romantic</option>
              </select>
            </div>
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#DE4C71] hover:bg-[#c93b5e] text-white">
              Continue to Preview
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Trip Preview Dialog Component
const TripPreviewDialog = ({ destination, user, onClose }) => {
  // Calculate a sample travel date (2 months from now)
  const getTravelDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 2);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Eye className="h-6 w-6 text-primary" />
            Trip Preview
          </DialogTitle>
          <DialogDescription>
            Preview of your potential booking to {destination.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="border rounded-lg p-6 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Destination Details */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary">Destination Details</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-500 mt-1" />
                  <div>
                    <p className="font-medium">Destination</p>
                    <p className="text-gray-700">{destination.name}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-500 mt-1" />
                  <div>
                    <p className="font-medium">Duration</p>
                    <p className="text-gray-700">{destination.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Briefcase className="h-5 w-5 text-gray-500 mt-1" />
                  <div>
                    <p className="font-medium">Package Inclusions</p>
                    <ul className="text-gray-700 list-disc pl-5">
                      {destination.inclusions.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-500 mt-1" />
                  <div>
                    <p className="font-medium">Departure From</p>
                    <p className="text-gray-700">{destination.departureCity}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* User Details */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary">Traveler Details</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-gray-500 mt-1" />
                  <div>
                    <p className="font-medium">Name</p>
                    <p className="text-gray-700">{user.name}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-500 mt-1" />
                  <div>
                    <p className="font-medium">Contact</p>
                    <p className="text-gray-700">{user.email}</p>
                    <p className="text-gray-700">{user.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-gray-500 mt-1" />
                  <div>
                    <p className="font-medium">Travel Preferences</p>
                    <p className="text-gray-700">Accommodation: {user.preferences.accommodationType}</p>
                    <p className="text-gray-700">Style: {user.preferences.travelStyle}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-500 mt-1" />
                  <div>
                    <p className="font-medium">Tentative Travel Date</p>
                    <p className="text-gray-700">{getTravelDate()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Summary */}
          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Package Price</p>
                <p className="text-xl font-bold text-primary">₹{destination.price}</p>
              </div>
              <Button 
                onClick={() => window.open(destination.officialUrl, '_blank')}
                className="bg-[#DE4C71] hover:bg-[#c93b5e] text-white"
              >
                Proceed to Book
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Destination Details Dialog Component
const DestinationDetailsDialog = ({ destination, onClose }) => {
  const [showUserForm, setShowUserForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  
  const handleBookNow = () => {
    // Open the official website in a new tab
    window.open(destination.officialUrl, '_blank');
    onClose();
  };

  const handlePreview = () => {
    setShowUserForm(true);
  };

  const handleUserFormSubmit = (userData) => {
    setUserDetails(userData);
    setShowUserForm(false);
    setShowPreview(true);
  };

  const handleUserFormCancel = () => {
    setShowUserForm(false);
  };

  const closePreview = () => {
    setShowPreview(false);
  };

  return (
    <>
      <Dialog open={!!destination} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{destination.name}</DialogTitle>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-6">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="text-lg font-semibold">
                  {destination.rating} Rating
                </span>
              </div>
              <p className="text-gray-600 mb-4">{destination.description}</p>
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Top Attractions:</h4>
                <ul className="list-disc pl-5">
                  {destination.attractions.map((attraction, index) => (
                    <li key={index} className="text-gray-700">
                      {attraction}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Best Time to Visit:</h4>
                <p className="text-gray-700">{destination.bestTimeToVisit}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-primary">
                  Starting from ₹{destination.price}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handlePreview}
                    className="flex items-center gap-1"
                  >
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                  <Button
                    onClick={handleBookNow}
                    className="bg-[#DE4C71] hover:bg-[#c93b5e] text-white"
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* User Details Form */}
      {showUserForm && (
        <UserDetailsForm 
          onSubmit={handleUserFormSubmit}
          onCancel={handleUserFormCancel}
          destination={destination}
        />
      )}

      {/* Trip Preview Dialog */}
      {showPreview && userDetails && (
        <TripPreviewDialog 
          destination={destination} 
          user={userDetails} 
          onClose={closePreview}
        />
      )}
    </>
  );
};

// Main Home Component
export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [searchCategory, setSearchCategory] = useState("destination");

  const filteredDestinations = featuredDestinations.filter((destination) => {
    if (searchCategory === "destination") {
      return destination.name.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (searchCategory === "price") {
      return destination.price.includes(searchQuery);
    } else if (searchCategory === "rating") {
      return destination.rating.toString().includes(searchQuery);
    }
    return true;
  });

  const handleSearchCategoryChange = (category) => {
    setSearchCategory(category);
    setSearchQuery("");
  };

  const handleViewDetails = (destination) => {
    setSelectedDestination(destination);
  };

  const closeDialog = () => {
    setSelectedDestination(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">TravelBuddy</div>
        <Link href="/login">
          <Button
            variant="outline"
            className="bg-white text-[#DE4C71] hover:bg-gray-100"
          >
            Login / Signup
          </Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <div className="relative h-[600px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-6">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl md:text-2xl text-center mb-12">
            Explore the World's most beautiful destinations
          </p>

          <div className="w-full max-w-3xl bg-white rounded-lg p-4 flex gap-4">
            <div className="flex items-center gap-2">
              <select
                value={searchCategory}
                onChange={(e) => handleSearchCategoryChange(e.target.value)}
                className="p-2 border rounded bg-white text-black"
              >
                <option value="destination">Destination</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            <div className="flex-1">
              <Input
                type="text"
                placeholder={`Search by ${searchCategory}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Button size="lg">
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Destinations Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.length > 0 ? (
              filteredDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  onViewDetails={handleViewDetails}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-3">
                No destinations found
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Destination Details Dialog */}
      {selectedDestination && (
        <DestinationDetailsDialog
          destination={selectedDestination}
          onClose={closeDialog}
        />
      )}
    </div>
  );
}