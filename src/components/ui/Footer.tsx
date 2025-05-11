
import React from 'react';
import { Link } from 'react-router-dom';
import { Car } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <Link to="/" className="flex items-center gap-2 text-car-blue font-bold text-2xl mb-4">
              <Car size={24} />
              <span>AutoSearch</span>
            </Link>
            <p className="text-gray-600 mb-4">
              Trouvez la voiture de vos rêves en postant votre recherche auprès des professionnels de l'automobile.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="/" className="hover:text-car-blue transition-colors">Accueil</Link></li>
              <li><Link to="/recherche" className="hover:text-car-blue transition-colors">Poster une recherche</Link></li>
              <li><Link to="/comment-ca-marche" className="hover:text-car-blue transition-colors">Comment ça marche</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Professionnels</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="/professionnels" className="hover:text-car-blue transition-colors">Espace Pro</Link></li>
              <li><Link to="/inscription-pro" className="hover:text-car-blue transition-colors">Devenir partenaire</Link></li>
              <li><Link to="/avantages" className="hover:text-car-blue transition-colors">Nos avantages</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="/contact" className="hover:text-car-blue transition-colors">Nous contacter</Link></li>
              <li><Link to="/aide" className="hover:text-car-blue transition-colors">Aide</Link></li>
              <li><Link to="/faq" className="hover:text-car-blue transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-300 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} AutoSearch. Tous droits réservés.
            </p>
            <div className="flex gap-4">
              <Link to="/mentions-legales" className="text-gray-600 text-sm hover:text-car-blue transition-colors">
                Mentions légales
              </Link>
              <Link to="/confidentialite" className="text-gray-600 text-sm hover:text-car-blue transition-colors">
                Politique de confidentialité
              </Link>
              <Link to="/cgv" className="text-gray-600 text-sm hover:text-car-blue transition-colors">
                CGV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
