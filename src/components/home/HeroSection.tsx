
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background avec overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-car-blue/90 to-blue-600/80"
        ></div>
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80')] bg-cover bg-center mix-blend-overlay"
        ></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            Trouvez la voiture de vos rêves sans effort
          </h1>
          <p className="text-xl text-white/90 mb-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
            Décrivez le véhicule que vous recherchez et laissez les professionnels de l'automobile vous proposer les meilleures offres.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <Button asChild className="car-button-gradient text-white px-8 py-6 text-lg">
              <Link to="/recherche">
                <Search className="mr-2" />
                Poster ma recherche
              </Link>
            </Button>
            <Button asChild variant="outline" className="bg-white text-car-blue border-white hover:bg-white/90 px-8 py-6 text-lg">
              <Link to="/comment-ca-marche">
                Comment ça marche
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
