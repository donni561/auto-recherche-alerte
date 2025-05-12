
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Car, Menu, X, Users } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Check if user is logged in
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

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
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link to="/connexion">
              {isLoggedIn ? 'Mon compte' : 'Se connecter'}
            </Link>
          </Button>
          <Button className="car-button-gradient text-white" asChild>
            <Link to="/recherche">
              Poster une recherche
            </Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden container mx-auto px-4 py-4 bg-white">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-car-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link 
              to="/comment-ca-marche" 
              className="text-gray-700 hover:text-car-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Comment ça marche
            </Link>
            <Link 
              to="/professionnels" 
              className="text-gray-700 hover:text-car-blue transition-colors py-2 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <Users size={18} className="mr-2" />
              Espace Pro
            </Link>
            <div className="pt-2">
              <Button 
                variant="outline" 
                className="w-full mb-2"
                asChild
              >
                <Link 
                  to="/connexion"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {isLoggedIn ? 'Mon compte' : 'Se connecter'}
                </Link>
              </Button>
              <Button 
                className="car-button-gradient text-white w-full"
                asChild
              >
                <Link 
                  to="/recherche"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Poster une recherche
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
