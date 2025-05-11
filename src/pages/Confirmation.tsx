
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Bell, Users, Clock } from 'lucide-react';

const Confirmation = () => {
  return (
    <MainLayout>
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Votre recherche a été envoyée !</h1>
            <p className="text-gray-600 mb-8 text-lg">
              Votre demande a été diffusée aux professionnels de l'automobile dans votre région.
            </p>

            <Card className="p-6 mb-8 bg-white shadow-lg">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Bell className="w-6 h-6 text-car-blue" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-lg mb-1">Les professionnels sont alertés</h3>
                    <p className="text-gray-600">
                      Les concessionnaires et vendeurs automobiles de votre région viennent de recevoir votre recherche.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Users className="w-6 h-6 text-car-blue" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-lg mb-1">Ils vont vous contacter</h3>
                    <p className="text-gray-600">
                      Si un professionnel dispose d'un véhicule correspondant à votre recherche, il vous contactera directement par email ou téléphone.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Clock className="w-6 h-6 text-car-blue" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-lg mb-1">Votre recherche reste active</h3>
                    <p className="text-gray-600">
                      Votre recherche restera active pendant 30 jours. Vous pouvez la renouveler ou la modifier à tout moment depuis votre compte.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link to="/">
                  Retour à l'accueil
                </Link>
              </Button>
              <Button asChild className="car-button-gradient text-white w-full sm:w-auto">
                <Link to="/recherche">
                  Créer une nouvelle recherche
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Confirmation;
