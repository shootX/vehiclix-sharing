
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Car, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <AlertTriangle className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-xl text-muted-foreground">
          Oops! This page has driven off the map.
        </p>
        <p className="text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="pt-4">
          <Link to="/">
            <Button className="bg-primary text-primary-foreground">
              <Car className="mr-2 h-4 w-4" /> Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
