
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase, MapPin, Car, Users } from 'lucide-react';

const Professional = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Données de démonstration pour les demandes récentes
  const recentRequests = [
    {
      id: '1',
      vehicle: 'SUV / Crossover',
      brand: 'Peugeot',
      model: '3008',
      year: '2020-2023',
      location: 'Lyon (69)',
      distance: '30km',
      budget: '25 000 €',
      date: 'Aujourd\'hui',
    },
    {
      id: '2',
      vehicle: 'Berline',
      brand: 'Toutes marques',
      model: '',
      year: '2019-2023',
      location: 'Paris (75)',
      distance: '20km',
      budget: '18 000 €',
      date: 'Hier',
    },
    {
      id: '3',
      vehicle: 'Citadine',
      brand: 'Renault',
      model: 'Clio',
      year: '2018-2023',
      location: 'Marseille (13)',
      distance: '25km',
      budget: '15 000 €',
      date: 'Il y a 2 jours',
    },
    {
      id: '4',
      vehicle: 'Break',
      brand: 'Volkswagen',
      model: 'Passat',
      year: '2017-2023',
      location: 'Bordeaux (33)',
      distance: '40km',
      budget: '22 000 €',
      date: 'Il y a 3 jours',
    },
  ];

  // Données de démonstration pour les statistiques
  const stats = {
    totalRequests: 127,
    newRequests: 18,
    contactRate: '78%',
    satisfactionRate: '92%',
  };

  return (
    <MainLayout>
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar / Menu */}
            <div className="w-full md:w-64 space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Briefcase className="mr-2 h-5 w-5 text-car-blue" />
                  Espace Pro
                </h2>
                <div className="space-y-2">
                  <Button 
                    variant={activeTab === 'overview' ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('overview')}
                  >
                    Tableau de bord
                  </Button>
                  <Button 
                    variant={activeTab === 'requests' ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('requests')}
                  >
                    Demandes
                  </Button>
                  <Button 
                    variant={activeTab === 'settings' ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('settings')}
                  >
                    Paramètres
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow p-6 border border-blue-100">
                <h3 className="font-medium mb-2">Accès premium</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Accédez à plus de demandes et des outils avancés pour développer votre activité.
                </p>
                <Button className="w-full car-button-gradient text-white">
                  Découvrir nos offres
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-6">Bienvenue sur votre espace professionnel</h1>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Tableau de bord</TabsTrigger>
                  <TabsTrigger value="requests">Demandes</TabsTrigger>
                  <TabsTrigger value="settings">Paramètres</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6 mt-6">
                  {/* Statistics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">{stats.totalRequests}</div>
                        <p className="text-sm text-muted-foreground">Demandes totales</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">{stats.newRequests}</div>
                        <p className="text-sm text-muted-foreground">Nouvelles demandes</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">{stats.contactRate}</div>
                        <p className="text-sm text-muted-foreground">Taux de contact</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">{stats.satisfactionRate}</div>
                        <p className="text-sm text-muted-foreground">Satisfaction client</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Requests */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Demandes récentes</CardTitle>
                      <CardDescription>
                        Consultez les dernières recherches de véhicules dans votre zone
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentRequests.map(request => (
                          <Card key={request.id} className="bg-gray-50">
                            <CardContent className="p-4">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div className="mb-3 md:mb-0">
                                  <div className="flex items-center mb-1">
                                    <Car className="h-4 w-4 mr-1 text-car-blue" />
                                    <span className="font-medium">{request.vehicle} - {request.brand} {request.model}</span>
                                  </div>
                                  <div className="flex items-center text-sm text-gray-500">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    <span>{request.location} ({request.distance})</span>
                                  </div>
                                </div>
                                <div className="flex flex-col md:items-end">
                                  <span className="font-medium">{request.budget}</span>
                                  <span className="text-sm text-gray-500">{request.date}</span>
                                </div>
                              </div>
                              <div className="mt-3 flex justify-end">
                                <Button size="sm" variant="outline" className="mr-2">Voir détails</Button>
                                <Button size="sm" className="car-button-gradient text-white">Contacter</Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">Voir toutes les demandes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="requests" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Rechercher des demandes</CardTitle>
                      <CardDescription>
                        Filtrez les demandes par critères pour trouver celles qui correspondent à votre inventaire
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="space-y-2">
                          <Label>Catégorie</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Toutes les catégories" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Toutes les catégories</SelectItem>
                              <SelectItem value="suv">SUV / Crossover</SelectItem>
                              <SelectItem value="berline">Berline</SelectItem>
                              <SelectItem value="citadine">Citadine</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Marque</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Toutes les marques" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Toutes les marques</SelectItem>
                              <SelectItem value="peugeot">Peugeot</SelectItem>
                              <SelectItem value="renault">Renault</SelectItem>
                              <SelectItem value="volkswagen">Volkswagen</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Département</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Tous les départements" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Tous les départements</SelectItem>
                              <SelectItem value="75">Paris (75)</SelectItem>
                              <SelectItem value="69">Rhône (69)</SelectItem>
                              <SelectItem value="33">Gironde (33)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left pb-2">Véhicule</th>
                              <th className="text-left pb-2">Localisation</th>
                              <th className="text-left pb-2">Budget</th>
                              <th className="text-left pb-2">Date</th>
                              <th className="text-right pb-2">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {recentRequests.map(request => (
                              <tr key={request.id} className="border-b">
                                <td className="py-3 pr-4">
                                  <div>
                                    <div className="font-medium">{request.vehicle}</div>
                                    <div className="text-sm text-gray-500">{request.brand} {request.model}</div>
                                  </div>
                                </td>
                                <td className="py-3 pr-4">
                                  <div>{request.location}</div>
                                  <div className="text-sm text-gray-500">{request.distance}</div>
                                </td>
                                <td className="py-3 pr-4 font-medium">{request.budget}</td>
                                <td className="py-3 pr-4">{request.date}</td>
                                <td className="py-3 text-right">
                                  <Button size="sm" className="car-button-gradient text-white">Contacter</Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="settings" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Paramètres du compte</CardTitle>
                      <CardDescription>
                        Gérez les informations de votre concession et vos préférences de notification
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="dealerName">Nom de la concession</Label>
                        <Input id="dealerName" placeholder="Entrez le nom de votre concession" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="votre@email.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Téléphone</Label>
                          <Input id="phone" placeholder="Ex: 06 12 34 56 78" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Adresse</Label>
                        <Input id="address" placeholder="Adresse de votre concession" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="zipcode">Code postal</Label>
                          <Input id="zipcode" placeholder="Ex: 75001" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">Ville</Label>
                          <Input id="city" placeholder="Ex: Paris" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="searchRadius">Rayon de recherche</Label>
                        <Select>
                          <SelectTrigger id="searchRadius">
                            <SelectValue placeholder="Sélectionnez un rayon" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10">10 km</SelectItem>
                            <SelectItem value="25">25 km</SelectItem>
                            <SelectItem value="50">50 km</SelectItem>
                            <SelectItem value="100">100 km</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-gray-500 mt-1">
                          Distance maximale pour recevoir les demandes des acheteurs
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="mr-2">Annuler</Button>
                      <Button className="car-button-gradient text-white">Enregistrer les modifications</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Professional;
