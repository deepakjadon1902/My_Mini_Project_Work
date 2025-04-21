

"use client";
import { useState, useEffect, useRef } from "react";
import { Search, Bus, Train, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function DestinationPage() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTravelMode, setSelectedTravelMode] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    adharCard: "",
    dob: "",
    country: "",
    fullAddress: "",
    travelDate: "",
    gender: "",
  });

  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.innerHTML = `
        <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: gray;">
          Map Placeholder (Actual map integration would require mapping API)
        </div>
      `;
    }
  }, [origin, destination]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      "name",
      "email",
      "phone",
      "adharCard",
      "dob",
      "country",
      "fullAddress",
      "travelDate",
      "gender",
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      alert(`Please fill in the following fields: ${missingFields.join(", ")}`);
      return;
    }

    setShowPreview(true);
  };

  const downloadReceipt = () => {
    const receipt = `
Travel Booking Receipt

Full Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Gender: ${formData.gender}
Adhar Card: ${formData.adharCard}
DOB: ${formData.dob}
Country: ${formData.country}
Full Address: ${formData.fullAddress}
Travel Date: ${formData.travelDate}
Origin: ${origin}
Destination: ${destination}
Selected Travel Mode: ${selectedTravelMode}

Thank you for booking with us!
    `.trim();

    const blob = new Blob([receipt], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Travel_Receipt.txt";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">
        Travel Booking Portal
      </h1>

      {/* Route Search Section */}
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
        <Input
          type="text"
          placeholder="Enter your location"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Enter destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Details */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
            <div className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  required
                />
              </div>
              <div>
                <Label>Phone Number</Label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <div>
                <Label>Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, gender: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Travel Details */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Travel Details</h2>
            <div className="space-y-4">
              <div>
                <Label>Adhar Card Number</Label>
                <Input
                  type="text"
                  name="adharCard"
                  value={formData.adharCard}
                  onChange={handleInputChange}
                  placeholder="Enter Adhar card number"
                  required
                />
              </div>
              <div>
                <Label>Date of Birth</Label>
                <Input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label>Country</Label>
                <Input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Enter country"
                  required
                />
              </div>
              <div>
                <Label>Full Address</Label>
                <Input
                  type="text"
                  name="fullAddress"
                  value={formData.fullAddress}
                  onChange={handleInputChange}
                  placeholder="Enter full address"
                  required
                />
              </div>
              <div>
                <Label>Travel Date</Label>
                <Input
                  type="date"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Travel Mode Selection */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Select Travel Mode</h2>
          <div className="flex flex-wrap gap-4 justify-between">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setSelectedTravelMode("Bus (RedBus)")}
            >
              <Bus className="mr-2 h-5 w-5" />
              <a href="https://www.redbus.in/" target="_blank">By Bus (RedBus)</a>
            </Button>

            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setSelectedTravelMode("Train (IRCTC)")}
            >
              <Train className="mr-2 h-5 w-5" />
              <a href="https://www.irctc.co.in/nget/train-search" target="_blank">By Train (IRCTC)</a>
            </Button>

            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setSelectedTravelMode("Airplane (MMT)")}
            >
              <Plane className="mr-2 h-5 w-5" />
              <a href="https://www.makemytrip.com/flights/" target="_blank">By Airplane (MMT)</a>
            </Button>

            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setSelectedTravelMode("Car (Uber)")}
            >
              🚗 <a href="https://www.uber.com/in/en/" target="_blank" className="ml-2">By Car (Uber)</a>
            </Button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-8">
          <Button type="submit" size="lg" className="w-full max-w-md">
            Preview Booking
          </Button>
        </div>
      </form>

      {/* Preview Dialog */}
      {showPreview && (
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent>
            <h2 className="text-xl font-bold mb-4">Booking Preview</h2>
            <div className="space-y-2">
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>Gender:</strong> {formData.gender}</p>
              <p><strong>Adhar Card:</strong> {formData.adharCard}</p>
              <p><strong>DOB:</strong> {formData.dob}</p>
              <p><strong>Country:</strong> {formData.country}</p>
              <p><strong>Full Address:</strong> {formData.fullAddress}</p>
              <p><strong>Travel Date:</strong> {formData.travelDate}</p>
              <p><strong>From:</strong> {origin}</p>
              <p><strong>To:</strong> {destination}</p>
              <p><strong>Travel Mode:</strong> {selectedTravelMode}</p>
            </div>
            <div className="mt-4 flex justify-end gap-4">
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                Close
              </Button>
              <Button onClick={downloadReceipt}>
                Download Receipt
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
