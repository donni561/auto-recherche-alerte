
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Bell, Users, BarChart, Search } from 'lucide-react';

const Professional = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-car-blue to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Espace Professionnel</h1>
            <p className="text-xl mb-8">
              Rejoignez notre réseau et connectez-vous directement avec des acheteurs qualifiés qui recherchent activement des véhicules.
            </p>
            <Button className="car-button-gradient text-white px-8 py-6 text-lg">
              Devenir partenaire
            </Button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Pourquoi rejoindre notre plateforme ?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="h-16 w-16 rounded-full car-select-gradient flex items-center justify-center mb-4">
                      <Search className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Acheteurs ciblés</h3>
                    <p className="text-gray-600">
                      Accédez à une base de clients qualifiés qui recherchent activement des véhicules correspondant à votre stock.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="h-16 w-16 rounded-full car-select-gradient flex items-center justify-center mb-4">
                      <Bell className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Alertes en temps réel</h3>
                    <p className="text-gray-600">
                      Recevez des notifications instantanées lorsque des acheteurs recherchent des véhicules dans votre zone.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="h-16 w-16 rounded-full car-select-gradient flex items-center justify-center mb-4">
                      <BarChart className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Analyses détaillées</h3>
                    <p className="text-gray-600">
                      Suivez vos performances et analysez les tendances du marché grâce à notre tableau de bord complet.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Comment ça fonctionne</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-10 w-10 rounded-full bg-car-blue text-white flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Inscrivez-vous en tant que professionnel</h3>
                  <p className="text-gray-600">
                    Créez votre compte professionnel, renseignez vos informations et définissez votre zone d'activité.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-10 w-10 rounded-full bg-car-blue text-white flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Recevez des alertes</h3>
                  <p className="text-gray-600">
                    Vous êtes notifié par email et via notre application dès qu'un particulier recherche un véhicule dans votre zone.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-10 w-10 rounded-full bg-car-blue text-white flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Contactez l'acheteur potentiel</h3>
                  <p className="text-gray-600">
                    Si vous disposez d'un véhicule correspondant aux critères, contactez directement l'acheteur via notre plateforme.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-10 w-10 rounded-full bg-car-blue text-white flex items-center justify-center font-bold text-lg">
                    4
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Concluez la vente</h3>
                  <p className="text-gray-600">
                    Organisez une visite, proposez un essai et finalisez la vente directement avec le client.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Nos formules</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Choisissez la formule qui correspond le mieux à votre activité et à vos besoins.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-gray-300">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">Starter</h3>
                    <div className="text-3xl font-bold mb-1">99€<span className="text-sm font-normal text-gray-500">/mois</span></div>
                    <p className="text-gray-500">Pour débuter</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Jusqu'à 20 alertes par mois</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>1 zone géographique</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Support par email</span>
                    </li>
                  </ul>
                  <Button className="w-full">Choisir</Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-car-orange relative">
                <div className="absolute top-0 right-0 bg-car-orange text-white text-xs px-3 py-1 rounded-bl font-semibold">
                  POPULAIRE
                </div>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">Pro</h3>
                    <div className="text-3xl font-bold mb-1">199€<span className="text-sm font-normal text-gray-500">/mois</span></div>
                    <p className="text-gray-500">Pour les professionnels</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Alertes illimitées</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>3 zones géographiques</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Support prioritaire</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Statistiques avancées</span>
                    </li>
                  </ul>
                  <Button className="w-full car-button-gradient text-white">Choisir</Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-car-blue">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                    <div className="text-3xl font-bold mb-1">399€<span className="text-sm font-normal text-gray-500">/mois</span></div>
                    <p className="text-gray-500">Pour les grandes structures</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Alertes illimitées</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Zones illimitées</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Support dédié</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>API personnalisée</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Intégration CRM</span>
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline">Nous contacter</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 car-select-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à développer votre activité ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Rejoignez notre réseau de professionnels et commencez à recevoir des demandes ciblées dès aujourd'hui.
          </p>
          <Button className="car-button-gradient text-white px-8 py-6 text-lg">
            Devenir partenaire maintenant
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Professional;
