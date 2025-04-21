
"use client";

import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Check } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscriptionConfirmed, setIsSubscriptionConfirmed] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);

  // Email validation function
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  // Handle subscription submission
  const handleSubscribe = (e) => {
    e.preventDefault(); // Prevent form default submission

    if (validateEmail(email)) {
      // Here you could add logic to send the email to your backend
      setIsSubscriptionConfirmed(true);
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  // Close subscription confirmation dialog
  const closeSubscriptionDialog = () => {
    setIsSubscriptionConfirmed(false);
    setEmail("");
  };

  return (
    <>
      <footer className="bg-background border-t">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About WanderSphere</h3>
              <p className="text-sm text-muted-foreground">
                Your trusted travel companion for discovering and booking amazing experiences worldwide.
              </p>
            </div>

            
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Subscribe to our newsletter for travel updates and exclusive offers.
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsValidEmail(true);
                  }}
                  className={`w-full ${!isValidEmail && email ? 'border-red-500' : ''}`}
                  required
                />
                <Button 
                  type="submit"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Send className="mr-2 h-4 w-4" /> Subscribe
                </Button>
              </form>
              {!isValidEmail && email && (
                <p className="text-red-500 text-xs mt-1">
                  Please enter a valid email address
                </p>
              )}
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} WanderSphere. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Subscription Confirmation Dialog */}
      {isSubscriptionConfirmed && (
        <Dialog 
          open={isSubscriptionConfirmed} 
          onOpenChange={closeSubscriptionDialog}
        >
          <DialogContent className="sm:max-w-[500px]">
            <div className="flex flex-col items-center text-center">
              <Check className="h-16 w-16 text-green-500 mb-4" />
              <DialogTitle className="text-2xl mb-4">Welcome to WanderSphere!</DialogTitle>
              <DialogDescription className="text-gray-600 mb-6">
                Thank you for subscribing to our newsletter! 
                
                <div className="mt-4 text-left">
                  <p className="mb-2">Get ready to embark on extraordinary journeys with WanderSphere. 
                  By subscribing, you'll receive:</p>
                  
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Exclusive travel deals and promotions</li>
                    <li>Curated destination guides</li>
                    <li>Insider tips from seasoned travelers</li>
                    <li>Monthly travel inspiration and stories</li>
                    <li>First access to limited-time travel packages</li>
                  </ul>
                </div>

                <p className="mt-4">
                  We're committed to making your travel dreams a reality. 
                  Stay tuned for incredible adventures!
                </p>
              </DialogDescription>
              <DialogFooter className="w-full">
                <Button 
                  onClick={closeSubscriptionDialog} 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Continue Exploring
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}