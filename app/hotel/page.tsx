
"use client";

import { useState } from "react";
import { Search, MapPin, Info, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

// Hotel type definition
type Hotel = {
  id: number;
  name: string;
  address: string;
  image: string;
  price: string;
  rating: number;
  description: string;
  amenities: string[];
  checkIn: string;
  checkOut: string;
  contactNumber: string;
  officialWebsite: string; // Added official website URL
};

const hotels = [
  {
    location: "Mumbai",
    hotels: [
      {
        id: 1,
        name: "The Taj Mahal Palace",
        address: "Apollo Bandar, Colaba, Mumbai",
        image: "/images/TajMahalMumbai.jpg",
        price: "₹25,000/night",
        rating: 4.9,
        description: "An iconic luxury hotel overlooking the Arabian Sea, offering world-class hospitality and stunning architectural beauty.",
        amenities: ["Swimming Pool", "Spa", "Fine Dining", "Fitness Center", "Free WiFi"],
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        contactNumber: "+91 22 6665 3366",
        officialWebsite: "https://www.tajhotels.com/en-in/taj/taj-mahal-palace-mumbai/"
      },
      {
        id: 2,
        name: "The Oberoi Mumbai",
        address: "Nariman Point, Mumbai",
        image: "/images/The Oberoi Mumbai.jpeg",
        price: "₹20,000/night",
        rating: 4.8,
        description: "A sophisticated luxury hotel in the heart of Mumbai, known for its impeccable service and stunning city views.",
        amenities: ["Rooftop Restaurant", "Business Center", "Concierge", "Room Service", "Gym"],
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        contactNumber: "+91 22 6632 5757",
        officialWebsite: "https://www.oberoihotels.com/hotels-in-mumbai/"
      },
      {
        id: 3,
        name: "ITC Grand Central",
        address: "Parel, Mumbai",
        image: "/images/ITC Grand Central.jpeg",
        price: "₹15,000/night",
        rating: 4.7,
        description: "A luxurious hotel offering a perfect blend of modern amenities and traditional hospitality in Mumbai.",
        amenities: ["Multi-Cuisine Restaurant", "Bar", "Conference Rooms", "Spa", "Free Parking"],
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        contactNumber: "+91 22 2410 1010",
        officialWebsite: "https://www.itchotels.com/in/en/itcgrandcentral-mumbai"
      },
    ],
  },
  {
    location: "Udaipur",
    hotels: [
      {
        id: 4,
        name: "Taj Lake Palace",
        address: "Lake Pichola, Udaipur",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80",
        price: "₹40,000/night",
        rating: 4.9,
        description: "A breathtaking heritage hotel located in the middle of Lake Pichola, offering a royal Rajasthani experience.",
        amenities: ["Lake View Rooms", "Spa", "Traditional Dining", "Cultural Performances", "Private Boat Service"],
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        contactNumber: "+91 294 242 1700",
        officialWebsite: "https://www.tajhotels.com/en-in/taj/taj-lake-palace-udaipur/"
      },
      {
        id: 5,
        name: "The Leela Palace Udaipur",
        address: "Lake Pichola, Udaipur",
        image: "/images/The Leela Palace Udaipur.jpeg",
        price: "₹35,000/night",
        rating: 4.8,
        description: "A majestic palace hotel offering unparalleled luxury and panoramic views of Lake Pichola and the City Palace.",
        amenities: ["Infinity Pool", "Lakeside Restaurant", "Ayurvedic Spa", "Butler Service", "Art Gallery"],
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        contactNumber: "+91 294 670 1234",
        officialWebsite: "https://www.theleela.com/the-leela-palace-udaipur/"
      },
      {
        id: 6,
        name: "Trident Udaipur",
        address: "Haridas Ji Ki Magri, Udaipur",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80",
        price: "₹18,000/night",
        rating: 4.6,
        description: "A serene hotel offering stunning views of Lake Pichola and modern comforts in a traditional setting.",
        amenities: ["Garden Restaurant", "Swimming Pool", "Conference Facilities", "Fitness Center", "Free WiFi"],
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        contactNumber: "+91 294 243 2200",
        officialWebsite: "https://www.tridenthotels.com/hotels-in-udaipur"
      },
    ],
  },
  {
    location: "Manali",
    hotels: [
      {
        id: 7,
        name: "Span Resort & Spa",
        address: "Manali Highway, Manali",
        image: "/images/Span Resort & Spa.jpeg",
        price: "₹12,000/night",
        rating: 4.8,
        description: "A luxurious mountain resort offering spectacular views of the Himalayan landscape and modern amenities.",
        amenities: ["Spa", "Indoor Pool", "Multi-Cuisine Restaurant", "Adventure Activities", "Free Parking"],
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        contactNumber: "+91 98160 88000",
        officialWebsite: "https://www.spanresorts.com/"
      },
      {
        id: 8,
        name: "The Himalayan",
        address: "Hadimba Road, Manali",
        image: "/images/The Himalayan.jpeg",
        price: "₹10,500/night",
        rating: 4.7,
        description: "A cozy mountain retreat offering comfortable accommodations and easy access to Manali's attractions.",
        amenities: ["Mountain View Rooms", "Restaurant", "Travel Desk", "Bonfire Area", "Free WiFi"],
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        contactNumber: "+91 99998 77777",
        officialWebsite: "https://www.thehimalayan.com/"
      },
      {
        id: 9,
        name: "Apple Country Resort",
        address: "Old Manali, Manali",
        image: "/images/Apple Country Resort.jpeg",
        price: "₹9,000/night",
        rating: 4.6,
        description: "A charming resort nestled in the apple orchards of Manali, offering a peaceful mountain getaway.",
        amenities: ["Orchard View", "Multi-Cuisine Restaurant", "Indoor Games", "Outdoor Activities", "Free Parking"],
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        contactNumber: "+91 98160 50909",
        officialWebsite: "http://apple-country-resorts-manali.manali.inhimachalpradesh.com/en/"
      },
    ],
  },
  {
    location: "Jaipur",
    hotels: [
      {
        id: 10,
        name: "Rambagh Palace",
        address: "Bhawani Singh Rd, Jaipur",
        image: "/images/Rambagh Palace.jpeg",
        price: "₹50,000/night",
        rating: 4.9,
        description: "A magnificent royal palace hotel that offers an unparalleled luxury experience in the Pink City.",
        amenities: ["Royal Suites", "Vintage Car Collection", "Spa", "Multiple Restaurants", "Landscaped Gardens"],
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        contactNumber: "+91 141 238 5700",
        officialWebsite: "https://www.tajhotels.com/en-in/taj/rambagh-palace-jaipur/"
      },
      {
        id: 11,
        name: "Fairmont Jaipur",
        address: "Amber, Jaipur",
        image: "https://images.getaroom-cdn.com/image/upload/s--s8Vdk0qh--/c_limit,e_improve,fl_lossy.immutable_cache,h_940,q_auto:good,w_940/v1704358995/6ab44f2d58d94479643a40769221b0ffe5507048?atc=e7cd1cfa",
        price: "₹30,000/night",
        rating: 4.8,
        description: "A luxurious resort that blends Rajasthani hospitality with modern comforts and stunning architecture.",
        amenities: ["Infinity Pool", "Spa", "Multiple Dining Options", "Cultural Experiences", "Fitness Center"],
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        contactNumber: "+91 141 471 2345",
        officialWebsite: "https://www.fairmont.com/jaipur/"
      },
      {
        id: 12,
        name: "The Raj Palace",
        address: "Amer Road, Jaipur",
        image: "/images/The Raj Palace.jpeg",
        price: "₹25,000/night",
        rating: 4.7,
        description: "A heritage hotel that offers a glimpse into the royal lifestyle of Rajasthan with its exquisite design.",
        amenities: ["Heritage Rooms", "Rooftop Restaurant", "Museum", "Traditional Art Gallery", "Cultural Performances"],
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        contactNumber: "+91 141 261 5549",
        officialWebsite: "https://www.rajpalace.com/"
      },
    ],
  },
  {
    location: "Goa",
    hotels: [
      {
        id: 13,
        name: "Taj Exotica Resort & Spa",
        address: "Benaulim, Goa",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80",
        price: "₹35,000/night",
        rating: 4.9,
        description: "A luxurious beachfront resort offering an exotic tropical paradise experience in South Goa.",
        amenities: ["Private Beach", "Infinity Pool", "Spa", "Multiple Restaurants", "Water Sports"],
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        contactNumber: "+91 83 3355 3010",
        officialWebsite: "https://www.tajhotels.com/en-in/taj/taj-exotica-goa/"
      },
      {
        id: 14,
        name: "W Goa",
        address: "Vagator, Goa",
        image: "/images/W Goa.jpeg",
        price: "₹30,000/night",
        rating: 4.8,
        description: "A trendy, vibrant resort offering a modern twist to Goan hospitality with stunning coastal views.",
        amenities: ["Beachfront Location", "Nightclub", "Multiple Bars", "Outdoor Pool", "Spa"],
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        contactNumber: "+91 83 3355 3012",
        officialWebsite: "https://www.marriott.com/hotels/travel/goiwh-w-goa/"
      },
      {
        id: 15,
        name: "The Leela Goa",
        address: "Cavelossim, Goa",
        image: "/images/The Leela Goa.jpeg",
        price: "₹28,000/night",
        rating: 4.7,
        description: "A serene luxury resort nestled between a private beach and the Sal River, offering a tranquil escape.",
        amenities: ["Private Beach", "Golf Course", "Multiple Pools", "Ayurvedic Spa", "Water Sports"],
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        contactNumber: "+91 83 3266 1212",
        officialWebsite: "https://www.goatrip.co.in/goa-hotels-resorts/the-leela-palace.html"
      },
    ],
  },
  {
    location: "Delhi",
    hotels: [
      {
        id: 16,
        name: "The Imperial New Delhi",
        address: "Janpath, New Delhi",
        image: "/images/The Imperial New Delhi.jpeg",
        price: "₹20,000/night",
        rating: 4.8,
        description: "A historic luxury hotel that captures the essence of colonial elegance in the heart of New Delhi.",
        amenities: ["Art Deco Interiors", "Multiple Restaurants", "Bar", "Conference Facilities", "Spa"],
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        contactNumber: "+91 11 2334 1234",
        officialWebsite: "https://www.theimperialindia.com/"
      },
      {
        id: 17,
        name: "The Oberoi New Delhi",
        address: "Dr. Zakir Hussain Marg, New Delhi",
        image: "/images/The Oberoi New Delhi.jpeg",
        price: "₹25,000/night",
        rating: 4.9,
        description: "A contemporary luxury hotel offering world-class hospitality and stunning views of the city.",
        amenities: ["Rooftop Pool", "Fine Dining", "Spa", "Business Center", "Concierge Service"],
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        contactNumber: "+91 11 2436 3636",
        officialWebsite: "https://www.oberoihotels.com/hotels-in-delhi/"
      },
      {
        id: 18,
        name: "Taj Palace New Delhi",
        address: "Sardar Patel Marg, New Delhi",
        image: "/images/Taj Palace New Delhi.jpeg",
        price: "₹22,000/night",
        rating: 4.7,
        description: "A grand luxury hotel that blends traditional Indian hospitality with modern sophistication.",
        amenities: ["Landscaped Gardens", "Multiple Restaurants", "Ballroom", "Fitness Center", "Spa"],
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        contactNumber: "+91 11 2302 6162",
        officialWebsite: "https://www.tajhotels.com/en-in/taj/taj-palace-new-delhi/"
      },
    ],
  },
  {
    location: "Lucknow",
    hotels: [
      {
        id: 19,
        name: "Taj Mahal Lucknow",
        address: "Vipin Khand, Gomti Nagar, Lucknow",
        image: "/images/Taj Lacknow.jpg",
        price: "₹12,000/night",
        rating: 4.6,
        description: "A refined hotel blending Mughal architecture with modern comfort, ideal for romantic stays.",
        amenities: ["Garden View Rooms", "Fine Dining", "Spa", "Swimming Pool", "Fitness Center"],
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        contactNumber: "+91 522 671 1000",
        officialWebsite: "https://www.tajhotels.com/en-in/taj/taj-mahal-lucknow/"
      },
      {
        id: 20,
        name: "Lebua Lucknow",
        address: "Saraca Estate, Mall Avenue, Lucknow",
        image: "/images/Lebua Lacknow.jpeg",
        price: "₹10,000/night",
        rating: 4.5,
        description: "A heritage boutique hotel with Nawabi charm and lush courtyards perfect for couples.",
        amenities: ["Courtyard Dining", "Luxury Suites", "Bar", "Cultural Décor", "Concierge"],
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        contactNumber: "+91 522 220 4122",
        officialWebsite: "https://www.wednue.com/venues/lebua-lucknow"
      },
      {
        id: 21,
        name: "Hyatt Regency Lucknow",
        address: "Vibhuti Khand, Gomti Nagar, Lucknow",
        image: "/images/Hyatt Regency Lucknow.webp",
        price: "₹9,500/night",
        rating: 4.4,
        description: "A modern and elegant hotel offering plush amenities and romantic dining options.",
        amenities: ["Rooftop Restaurant", "Couple Spa", "Infinity Pool", "Lounge", "Gym"],
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        contactNumber: "+91 522 426 1234",
        officialWebsite: "https://www.hyatt.com/hyatt-regency/en-US/lkorl-hyatt-regency-lucknow"
      }
    ]
  },
  {
    location: "Sikkim",
    hotels: [
      {
        id: 22,
        name: "Mayfair Spa Resort & Casino",
        address: "Lower Samdur Block, Gangtok, Sikkim",
        image: "/images/Mayfair Spa Resort & Casino.jpg",
        price: "₹18,000/night",
        rating: 4.7,
        description: "A lavish resort set amidst mountains and forests, offering ultimate couple luxury.",
        amenities: ["Spa", "Casino", "Private Cottages", "Nature Walks", "Indoor Pool"],
        checkIn: "1:00 PM",
        checkOut: "11:00 AM",
        contactNumber: "+91 3592 250 555",
        officialWebsite: "https://www.mayfairhotels.com/mayfair-spa-resort-casino-gangtok/"
      },
      {
        id: 23,
        name: "The Elgin Nor-Khill",
        address: "Paljor Stadium Road, Gangtok, Sikkim",
        image: "/images/The Elgin Nor-Khill.jpg",
        price: "₹14,000/night",
        rating: 4.6,
        description: "A historic luxury hotel with a royal Sikkimese ambience and enchanting views.",
        amenities: ["Valley View Rooms", "Colonial Charm", "Multi-cuisine Restaurant", "Lounge Bar", "Garden"],
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        contactNumber: "+91 3592 205 637",
        officialWebsite: "https://www.elginhotels.com/hotels-in-gangtok-elgin-nor-khill-spa-resort-since-1934/"
      },
      {
        id: 24,
        name: "Sterling Gangtok Orange Village",
        address: "Ronsey, Upper Syari, Deorali, Gangtok",
        image: "/images/Sterling Gangtok Orange Village.jpg",
        price: "₹9,000/night",
        rating: 4.3,
        description: "A cozy, nature-rich retreat overlooking valleys – perfect for a romantic getaway.",
        amenities: ["Mountain Views", "Adventure Activities", "Couple Spa", "Cafe", "Bonfire"],
        checkIn: "2:00 PM",
        checkOut: "11:00 AM",
        contactNumber: "+91 90032 66444",
        officialWebsite: "https://www.sterlingholidays.com/resorts-hotels/gangtok-orange-village"
      }
    ]
  },
  {
    location: "Dehradun",
    hotels: [
      {
        id: 25,
        name: "JW Marriott Mussoorie Walnut Grove Resort & Spa",
        address: "Mussoorie Rd, Dehradun District",
        image: "/images/JW Marriott Mussoorie Walnut Grove Resort & Spa.jpeg",
        price: "₹23,000/night",
        rating: 4.8,
        description: "A romantic luxury retreat nestled in the Himalayas, perfect for couples seeking nature and comfort.",
        amenities: ["Couple Spa", "Candlelight Dining", "Indoor Pool", "Mountain Views", "Trekking Trails"],
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        contactNumber: "+91 135 263 5600",
        officialWebsite: "https://www.marriott.com/en-us/hotels/dedjw-jw-marriott-mussoorie-walnut-grove-resort-and-spa/rooms/?msockid=2b2a3f7a151f6d8535ce2a5a14196cf6"
      },
      {
        id: 26,
        name: "Four Points by Sheraton Dehradun",
        address: "Rajpur Road, Jakhan, Dehradun",
        image: "/images/Four Points by Sheraton Dehradun.jpeg",
        price: "₹8,500/night",
        rating: 4.4,
        description: "Modern comfort meets natural serenity with views of the Doon valley.",
        amenities: ["Sky Lounge", "Couples' Dining", "Fitness Center", "Room Service", "Valet Parking"],
        checkIn: "3:00 PM",
        checkOut: "12:00 PM",
        contactNumber: "+91 135 660 3300",
        officialWebsite: "https://www.marriott.com/search/findHotels.mi?searchType=InCity&destinationAddress.city=&destinationAddress.stateProvince=&destinationAddress.country=IN&marriottBrands=SI&showMore=true&nst=paid&cid=PAI_GLB00050BU_GLE000BLR7_GLF000ONOS&ppc=ppc&pId=intbppc&gclid=9f935871f2571961180a307421a41970&gclsrc=3p.ds&msclkid=9f935871f2571961180a307421a41970&utm_source=bing&utm_medium=cpc&utm_campaign=SE~BNG_FS~TB_MB~SI_KC~BD_DS~NSA_MK~IN_LG~EN_SC~Sheraton&utm_term=sheraton+hotel+in+india&utm_content=BD_MB~SI_DM~CN-India_Phrase&deviceType=desktop-web&view=list#/0/"
      },
      {
        id: 27,
        name: "Shaheen Bagh Boutique Resort",
        address: "Jakhan, Near Rajpur, Dehradun",
        image: "/images/Shaheen Bagh Boutique Resort.jpeg",
        price: "₹13,000/night",
        rating: 4.5,
        description: "A charming colonial-style stay with nature and privacy for couples.",
        amenities: ["Private Balconies", "Library", "Orchard Walks", "Organic Meals", "Birdwatching"],
        checkIn: "1:00 PM",
        checkOut: "11:00 AM",
        contactNumber: "+91 78959 09999",
        officialWebsite: "https://www.shaheenbagh.in/"
      }
    ]
  },
  {
    location: "Himachal Pradesh",
    hotels: [
      {
        id: 28,
        name: "Wildflower Hall, Shimla",
        address: "Chharabra, Shimla, Himachal Pradesh",
        image: "/images/Wildflower Hall, Shimla.jpeg",
        price: "₹26,000/night",
        rating: 4.9,
        description: "An exclusive Oberoi property with views of snow-capped mountains and forest trails.",
        amenities: ["Infinity Jacuzzi", "Couple Spa", "Forest Walks", "Fine Dining", "Private Balconies"],
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        contactNumber: "+91 177 264 8585",
        officialWebsite: "https://www.oberoihotels.com/hotels-in-shimla-wfh/special-offers/himalayan-vacations/?utm_source=bing&utm_medium=cpc&utm_campaign=Wildflower_Hall-Brand_India_IA&msclkid=3dce6066323a13969f430863e698fe73"
      },
      {
        id: 29,
        name: "The Himalayan, Manali",
        address: "Hadimba Road, Manali, Himachal Pradesh",
        image: "/images/The Himalayan, Manali.jpeg",
        price: "₹11,000/night",
        rating: 4.6,
        description: "A fairytale castle-like hotel perfect for romantic escapes in the snow.",
        amenities: ["Heated Pool", "Vintage Interiors", "Candlelight Dinner", "Mountain View Rooms", "Fireplace"],
        checkIn: "2:00 PM",
        checkOut: "11:00 AM",
        contactNumber: "+91 1902 250 129",
        officialWebsite: "https://www.thehimalayan.com/"
      },
      {
        id: 30,
        name: "Norwood Green Resort, Palampur",
        address: "Tea Estate, Bundla, Palampur, Himachal Pradesh",
        image: "/images/Norwood Green Resort, Palampur.jpeg",
        price: "₹10,500/night",
        rating: 4.5,
        description: "Tea estate views, luxury villas, and pure tranquility make it an ideal couple retreat.",
        amenities: ["Private Villas", "Tea Garden Tours", "Bonfire", "Mountain Biking", "Spa"],
        checkIn: "2:00 PM",
        checkOut: "11:00 AM",
        contactNumber: "+91 98163 47777",
        officialWebsite: "https://www.lamrinhotels.com/norwood-green-palampur/"
      }
    ]
  },
  {
    location: "Munnar",
    hotels: [
      {
        id: 34,
        name: "Parakkat Nature Hotels & Resorts",
        address: "2nd Mile, Pallivasal, Munnar",
        image: "/images/Parakkat Nature Hotels & Resorts.jpeg",
        price: "₹11,000/night",
        rating: 4.6,
        description: "A romantic hilltop escape surrounded by lush green tea gardens and panoramic views.",
        amenities: ["Jacuzzi Suites", "Tea Garden View", "Private Balconies", "Couples Spa", "Campfire"],
        checkIn: "2:00 PM",
        checkOut: "11:00 AM",
        contactNumber: "+91 4865 263 222",
        officialWebsite: "https://www.parakkatresorts.com/"
      },
      {
        id: 35,
        name: "Fragrant Nature Munnar",
        address: "Bison Valley Road, Pothamedu, Munnar",
        image: "/images/Fragrant Nature Munnar.jpeg",
        price: "₹13,000/night",
        rating: 4.7,
        description: "A luxurious boutique stay nestled in the misty mountains with a fairytale-like vibe.",
        amenities: ["Romantic Dining", "Mountain View Rooms", "Spa", "Fireplace", "Tea Tasting"],
        checkIn: "2:00 PM",
        checkOut: "11:00 AM",
        contactNumber: "+91 484 451 6666",
        officialWebsite: "https://www.fragrantnature.com/munnar/"
      },
      {
        id: 36,
        name: "Elixir Hills",
        address: "Near Letchmi Tea Estate, Munnar",
        image: "images/Elixir Hills.jpeg",
        price: "₹10,000/night",
        rating: 4.5,
        description: "An eco-luxury resort ideal for couples seeking tranquility and nature experiences.",
        amenities: ["Infinity Pool", "Luxury Suites", "Nature Walks", "Couples Massage", "Balcony Views"],
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        contactNumber: "+91 4868 254 444",
        officialWebsite: "https://www.elixirhills.com/"
      }
    ]
  },
  {
    location: "Alleppey",
    hotels: [
      {
        id: 37,
        name: "Punnamada Resort",
        address: "Punnamada, Alappuzha",
        image: "/images/Punnamada Resort.jpeg",
        price: "₹9,000/night",
        rating: 4.5,
        description: "A peaceful lakeside resort offering authentic Kerala charm and romance by the water.",
        amenities: ["Backwater Views", "Private Villas", "Ayurvedic Spa", "Romantic Canoe Rides", "Yoga"],
        checkIn: "1:00 PM",
        checkOut: "11:00 AM",
        contactNumber: "+91 477 223 3690",
        officialWebsite: "https://punnamada.com/"
      },
      {
        id: 38,
        name: "Lake Palace Resort",
        address: "Thirumala Ward, Chungam, Alleppey",
        image: "/images/Lake Palace Resort.jpeg",
        price: "₹12,000/night",
        rating: 4.6,
        description: "Luxury cottages by the backwaters with candlelight dining and boat rides.",
        amenities: ["Candlelight Dinner", "Boat Cruise", "Lakeside Pool", "Couples Spa", "Sunset Deck"],
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        contactNumber: "+91 477 223 9701",
        officialWebsite: "https://www.keralabackwaterresort.com/"
      },
      {
        id: 39,
        name: "Marari Beach Resort",
        address: "Mararikulam North, Alappuzha",
        image: "/images/Marari Beach Resort.jpeg",
        price: "₹14,000/night",
        rating: 4.7,
        description: "A serene beach resort offering privacy, ocean views, and romantic ambiance.",
        amenities: ["Private Cottages", "Beachfront Dining", "Hammocks", "Ayurveda", "Cultural Evenings"],
        checkIn: "2:00 PM",
        checkOut: "11:00 AM",
        contactNumber: "+91 478 286 3801",
        officialWebsite: "https://www.cghearth.com/marari-beach"
      }
    ]
  },
];

const addWebsitesToHotels = () => {
  hotels.forEach(location => {
    location.hotels.forEach(hotel => {
      if (!hotel.officialWebsite) {
        // Create a placeholder URL if not already defined
        const hotelNameForUrl = hotel.name.toLowerCase().replace(/\s+/g, '-');
        hotel.officialWebsite = `https://www.${hotelNameForUrl}.com`;
      }
    });
  });
};

// Call the function to ensure all hotels have websites
addWebsitesToHotels();

export default function Hotels() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  const filteredHotels = hotels.filter((place) =>
    place.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookNow = () => {
    if (selectedHotel) {
      // Redirect to the hotel's official website
      window.open(selectedHotel.officialWebsite, '_blank');
      // Close the dialog after redirecting
      setSelectedHotel(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">TravelBuddy</div>
        <Button variant="outline" className="bg-white text-[#DE4C71] hover:bg-gray-100">
          Home
        </Button>
      </nav>

      <div
        className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white">
          <h1 className="text-5xl font-bold mb-4">Find Your Perfect Stay</h1>
          <p className="text-lg mb-6">Search and explore hotels in the most beautiful locations</p>
          
          <div className="flex items-center w-full max-w-md">
            <Input 
              type="text" 
              placeholder="Search destinations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow mr-2"
            />
            <Search className="text-gray-500" />
          </div>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Popular Hotels</h2>
          {filteredHotels.map((place) => (
            <div key={place.location} className="mb-12">
              <h3 className="text-2xl font-bold text-primary mb-4">{place.location}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {place.hotels.map((hotel) => (
                  <div 
                    key={hotel.id} 
                    className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative group"
                  >
                    <img src={hotel.image} alt={hotel.name} className="w-full h-64 object-cover" />
                    <div className="p-4">
                      <h4 className="text-xl font-semibold">{hotel.name}</h4>
                      <p className="text-muted-foreground">{hotel.address}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-lg font-bold text-primary">{hotel.price}</span>
                        <span className="text-yellow-500">⭐ {hotel.rating}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => setSelectedHotel(hotel)}
                      >
                        <Info className="mr-2 h-4 w-4" /> Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hotel Details Dialog */}
      <Dialog open={!!selectedHotel} onOpenChange={() => setSelectedHotel(null)}>
        {selectedHotel && (
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>{selectedHotel.name}</DialogTitle>
              <DialogDescription>{selectedHotel.address}</DialogDescription>
            </DialogHeader>
            
            <div className="grid md:grid-cols-2 gap-6">
              <img 
                src={selectedHotel.image} 
                alt={selectedHotel.name} 
                className="w-full h-64 object-cover rounded-lg"
              />
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-primary">{selectedHotel.price}</span>
                  <span className="text-yellow-500 text-xl">⭐ {selectedHotel.rating}</span>
                </div>
                
                <p className="text-muted-foreground mb-4">{selectedHotel.description}</p>
                
                <div className="mb-4">
                  <h5 className="font-semibold mb-2">Amenities</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedHotel.amenities.map((amenity) => (
                      <span 
                        key={amenity} 
                        className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <h5 className="font-semibold">Check-In</h5>
                    <p>{selectedHotel.checkIn}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold">Check-Out</h5>
                    <p>{selectedHotel.checkOut}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h5 className="font-semibold">Contact</h5>
                  <p>{selectedHotel.contactNumber}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setSelectedHotel(null)}>Close</Button>
              <Button onClick={handleBookNow}>Book Now</Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}