
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const RegistrationSuccess = () => {
  return (
    <div className="min-h-screen w-full overflow-y-auto bg-gradient-to-br from-black via-slate-900 to-black flex flex-col items-center justify-center text-white p-4">
      <div className="max-w-md w-full red-glass-panel p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="text-techred-500 h-16 w-16" />
        </div>
        
        <h1 className="text-2xl font-bold mb-4">Registration Successful!</h1>
        
        <p className="text-gray-300 mb-6">
          Thank you for pre-registering for our AI Technical Support Assistant.
          We've sent a confirmation to your email with additional details.
        </p>
        
        <div className="bg-white/10 p-4 rounded-md mb-6">
          <p className="text-sm text-gray-300">
            <span className="font-medium text-techred-300">What's next?</span> We'll notify you as soon as the beta version is ready. 
            You'll be among the first to get access!
          </p>
        </div>
        
        <Button asChild className="w-full bg-techred-600 hover:bg-techred-700 red-glow-sm">
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
