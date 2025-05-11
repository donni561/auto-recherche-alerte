
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Car, MapPin, Bell, Users, CheckCircle, ArrowRight } from 'lucide-react';

const HowItWorksPage = () => {
  const steps = [
    {
      icon: <Car className="h-12 w-12 text-white" />,
      title: "Décrivez votre recherche",
      description: "Sélectionnez la marque, le modèle, l'année et toutes les options que vous souhaitez pour votre futur véhicule."
    },
    {
      icon: <MapPin className="h-12 w-12 text-white" />,
      title: "Indiquez votre zone",
      description: "Définissez la zone géographique dans laquelle vous souhaitez effectuer votre recherche de véhicule."
    },
    {
      icon: <Bell className="h-12 w-12 text-white" />,
      title: "Alertez les professionnels",
      description: "Notre système envoie automatiquement une alerte à tous les professionnels de l'automobile dans votre zone."
    },
    {
      icon: <Users className="h-12 w-12 text-white" />,
      title: "Recevez des offres",
      description: "Les professionnels vous contactent directement avec des offres correspondant précisément à vos critères."
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-white" />,
      title: "Trouvez votre véhicule idéal",
      description: "Comparez les offres, visitez les concessionnaires et choisissez le véhicule qui vous convient le mieux."
    }
  ];

  const benefits = [
    {
      title: "Gain de temps considérable",
      description: "Ne perdez plus de temps à parcourir des annonces ou à visiter des concessions qui n'ont pas ce que vous cherchez.",
    },
    {
      title: "Accès à des véhicules non publiés",
      description: "Accédez à des véhicules qui ne sont pas encore en ligne ou qui viennent d'arriver chez le concessionnaire.",
    },
    {
      title: "Des offres personnalisées",
      description: "Recevez uniquement des propositions qui correspondent exactement à vos critères spécifiques.",
    },
    {
      title: "Service 100% gratuit",
      description: "Notre service est totalement gratuit pour les particuliers. Aucun frais caché, aucune commission.",
    },
  ]

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-car-blue to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Comment fonctionne AutoSearch</h1>
            <p className="text-xl mb-8">
              Découvrez comment notre plateforme révolutionne la recherche de véhicules pour vous faire gagner du temps et trouver la voiture parfaite.
            </p>
            <Button asChild className="car-button-gradient text-white px-8 py-6 text-lg">
              <Link to="/recherche">
                Essayer maintenant
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Process Steps */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Le processus en 5 étapes simples</h2>
            
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="h-20 w-20 rounded-full car-select-gradient flex items-center justify-center flex-shrink-0">
                      {step.icon}
                    </div>
                    <div className="flex-grow md:ml-4">
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute left-10 top-20 h-16 w-0.5 bg-gray-200">
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                        <ArrowRight className="h-5 w-5 text-gray-400 rotate-90" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Pourquoi utiliser AutoSearch ?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Professionals Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80" 
                alt="Professionnel de l'automobile" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Pour les professionnels</h2>
              <p className="text-lg text-gray-600 mb-6">
                Vous êtes un professionnel de l'automobile ? Rejoignez notre réseau et accédez à une base d'acheteurs qualifiés qui recherchent exactement ce que vous avez à offrir.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Recevez des alertes en temps réel</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Contactez directement les acheteurs potentiels</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Augmentez vos ventes et votre visibilité</span>
                </li>
              </ul>
              <Button asChild variant="outline" className="text-car-blue border-car-blue hover:bg-car-blue hover:text-white transition-colors">
                <Link to="/professionnels">
                  Espace professionnel
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 car-select-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à trouver la voiture de vos rêves ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Décrivez le véhicule que vous recherchez et laissez les professionnels venir à vous avec les meilleures offres.
          </p>
          <Button asChild className="car-button-gradient text-white px-8 py-6 text-lg">
            <Link to="/recherche">
              Poster ma recherche maintenant
            </Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default HowItWorksPage;
