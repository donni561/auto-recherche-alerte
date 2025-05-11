
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Car } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-car-blue font-bold text-2xl">
          <Car size={32} />
          <span>AutoSearch</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-700 hover:text-car-blue transition-colors">
            Accueil
          </Link>
          <Link to="/comment-ca-marche" className="text-gray-700 hover:text-car-blue transition-colors">
            Comment ça marche
          </Link>
          <Link to="/professionnels" className="text-gray-700 hover:text-car-blue transition-colors">
            Espace Pro
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden md:inline-flex">
            Se connecter
          </Button>
          <Button className="car-button-gradient text-white">
            Poster une recherche
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
