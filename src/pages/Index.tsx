
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <HowItWorks />
      
      {/* Section Avantages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" 
                alt="Concessionnaire avec client" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Pourquoi utiliser AutoSearch ?</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-2 mr-4">
                    <svg className="w-6 h-6 text-car-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Gain de temps</h3>
                    <p className="text-gray-600">Ne perdez plus de temps à parcourir des annonces. Laissez les vendeurs venir à vous avec des offres correspondant exactement à vos critères.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-2 mr-4">
                    <svg className="w-6 h-6 text-car-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Accès à un réseau de professionnels</h3>
                    <p className="text-gray-600">Notre plateforme regroupe des concessionnaires et professionnels vérifiés, garantissant des transactions sécurisées et transparentes.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-2 mr-4">
                    <svg className="w-6 h-6 text-car-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Service gratuit</h3>
                    <p className="text-gray-600">Notre service est entièrement gratuit pour les particuliers à la recherche d'un véhicule.</p>
                  </div>
                </div>
              </div>
              
              <Button asChild className="car-button-gradient text-white mt-8">
                <Link to="/recherche">Créer ma recherche maintenant</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Testimonials />
      
      {/* Call to Action */}
      <section className="py-16 car-select-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à trouver la voiture de vos rêves ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Commencez dès maintenant en décrivant le véhicule que vous recherchez et laissez les professionnels vous aider.
          </p>
          <Button asChild className="car-button-gradient text-white px-8 py-6 text-lg">
            <Link to="/recherche">Poster ma recherche</Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
