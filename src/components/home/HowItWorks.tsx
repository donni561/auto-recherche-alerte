
import React from 'react';
import { Car, MapPin, Bell, Users } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Car className="h-12 w-12 text-car-blue" />,
      title: "Décrivez votre recherche",
      description: "Sélectionnez la marque, le modèle, l'année et toutes les options que vous souhaitez pour votre futur véhicule."
    },
    {
      icon: <MapPin className="h-12 w-12 text-car-blue" />,
      title: "Indiquez votre zone",
      description: "Définissez la zone géographique dans laquelle vous souhaitez effectuer votre recherche de véhicule."
    },
    {
      icon: <Bell className="h-12 w-12 text-car-blue" />,
      title: "Alertez les professionnels",
      description: "Notre système envoie automatiquement une alerte à tous les professionnels de l'automobile dans votre zone."
    },
    {
      icon: <Users className="h-12 w-12 text-car-blue" />,
      title: "Recevez des offres",
      description: "Les professionnels vous contactent directement avec des offres correspondant précisément à vos critères."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Comment ça marche ?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Notre plateforme met en relation les acheteurs potentiels avec les professionnels de l'automobile en quelques étapes simples.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-blue-50 rounded-full">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
