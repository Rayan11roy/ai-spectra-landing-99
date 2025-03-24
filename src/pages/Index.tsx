
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import CountdownTimer from "@/components/CountdownTimer";
import WaitingListCircle from "@/components/WaitingListCircle";
import { databaseService } from "@/services/databaseService";
import { emailService } from "@/services/emailService";

const Index = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const { toast } = useToast();
  const sphereRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cubeRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const rafRef = useRef<number | null>(null);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setIsValid(false);
      toast({
        title: "Email is required",
        description: "Please enter your email address to register.",
        variant: "destructive",
      });
      return;
    }
    
    if (!validateEmail(email)) {
      setIsValid(false);
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsValid(true);
    setIsSubmitting(true);
    
    try {
      const isStored = await databaseService.storeEmail(email);
      
      if (isStored) {
        await emailService.sendNotification(email);
        
        toast({
          title: "Pre-registration successful!",
          description: "Thank you for your interest. We'll notify you when we launch.",
        });
      } else {
        toast({
          title: "Already registered",
          description: "This email is already on our waiting list. Thank you for your interest!",
        });
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was a problem with your registration. Please try again later.",
        variant: "destructive",
      });
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
      setEmail("");
    }
  };

  useEffect(() => {
    const animateSpheres = () => {
      sphereRefs.current.forEach((sphere, index) => {
        if (!sphere) return;
        
        const time = Date.now() * 0.001 * (index * 0.1 + 0.5);
        const scale = 0.8 + Math.sin(time * 0.7) * 0.2;
        
        sphere.style.transform = `translate(${Math.sin(time) * 15}px, ${Math.cos(time * 1.3) * 15}px) scale(${scale})`;
      });
      
      rafRef.current = requestAnimationFrame(animateSpheres);
    };
    
    const animateCube = () => {
      if (cubeRef.current) {
        const time = Date.now() * 0.001;
        cubeRef.current.style.transform = `rotateX(${time * 10}deg) rotateY(${time * 15}deg) rotateZ(${time * 5}deg)`;
      }
      rafRef.current = requestAnimationFrame(animateCube);
    };
    
    animateSpheres();
    animateCube();

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const createSpheres = () => {
    const spheres = [];
    const maxSpheres = isMobile ? 3 : 5; // Reduce number on mobile
    
    for (let i = 0; i < maxSpheres; i++) {
      const size = isMobile ? (30 + Math.random() * 60) : (50 + Math.random() * 120); 
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      
      spheres.push(
        <div
          key={i}
          ref={(el) => {
            sphereRefs.current[i] = el;
          }}
          className="sphere animate-pulse-glow"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            animationDelay: `${i * 0.7}s`,
            opacity: 0.2 + Math.random() * 0.3,
          }}
        />
      );
    }
    return spheres;
  };

  const createCube = () => {
    const size = isMobile ? 60 : 100;
    return (
      <div
        ref={cubeRef}
        className="cube"
        style={{
          top: '15%',
          right: '10%',
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <div 
          className="cube-face" 
          style={{
            width: `${size}px`,
            height: `${size}px`,
            transform: `translateZ(${size/2}px)`,
          }}
        />
        <div 
          className="cube-face" 
          style={{
            width: `${size}px`,
            height: `${size}px`,
            transform: `translateZ(-${size/2}px) rotateY(180deg)`,
          }}
        />
        <div 
          className="cube-face" 
          style={{
            width: `${size}px`,
            height: `${size}px`,
            transform: `translateX(-${size/2}px) rotateY(-90deg)`,
          }}
        />
        <div 
          className="cube-face" 
          style={{
            width: `${size}px`,
            height: `${size}px`,
            transform: `translateX(${size/2}px) rotateY(90deg)`,
          }}
        />
        <div 
          className="cube-face" 
          style={{
            width: `${size}px`,
            height: `${size}px`,
            transform: `translateY(-${size/2}px) rotateX(90deg)`,
          }}
        />
        <div 
          className="cube-face" 
          style={{
            width: `${size}px`,
            height: `${size}px`,
            transform: `translateY(${size/2}px) rotateX(-90deg)`,
          }}
        />
      </div>
    );
  };

  return (
    <div className="relative min-h-screen w-full overflow-y-auto bg-gradient-to-br from-black via-slate-900 to-black">
      {createSpheres()}
      {createCube()}
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-12 min-h-screen flex flex-col justify-center">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 w-full">
          <div className="w-full md:w-1/2 relative animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-techred-500/20 rounded-full blur-3xl opacity-50 animate-pulse-glow"></div>
              <div className="red-glass-panel p-4 sm:p-6 relative animate-float">
                <div className="relative z-10 aspect-square overflow-hidden rounded-3xl">
                  <img 
                    src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200&h=1200" 
                    alt="AI Technical Support Robot" 
                    className="w-full h-full object-cover object-center rounded-2xl animate-scale-up"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <CountdownTimer />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 text-white relative z-10 animate-slide-up">
            <div className="space-y-4 sm:space-y-6 max-w-xl">
              <div>
                <div className="bg-techred-600/20 text-techred-50 px-3 py-1 rounded-full inline-block text-sm font-medium mb-3 sm:mb-4">
                  Coming July
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tighter">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Technical Support</span>
                  <span className="block text-techred-500">AI Assistant</span>
                </h1>
                <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-300 leading-relaxed">
                  The next generation AI-powered development assistant that helps you solve technical issues in seconds, not hours.
                </p>
              </div>
              
              <div className="red-glass-panel p-5 sm:p-6 md:p-8 mt-6 sm:mt-8">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Join the waiting list</h3>
                <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6">Be the first to experience our revolutionary AI support system. <span className="text-techred-300 font-medium">Pre-register now for FREE access during the beta period.</span></p>
                
                <WaitingListCircle />
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      className={`bg-white/10 border ${!isValid ? 'border-red-500' : 'border-white/20'} text-white placeholder:text-gray-400`}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (!isValid) setIsValid(true);
                      }}
                    />
                    {!isValid && (
                      <p className="text-red-500 text-sm mt-1">Please enter a valid email address</p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-techred-600 hover:bg-techred-700 text-white red-glow-sm button-hover-effect"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </div> 
                      : "Pre-Register for FREE Access"
                    }
                  </Button>
                </form>
                
                <div className="mt-4 text-xs text-gray-400">
                  <p>By submitting, you agree to our privacy policy and terms of service.</p>
                  <p className="mt-2 border-t border-white/10 pt-2">
                    <span className="text-techred-300">✓</span> Instant email confirmation
                    <span className="mx-2">•</span>
                    <span className="text-techred-300">✓</span> Priority access to beta
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
