
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

const Settings = () => {
  const [dealerInfo, setDealerInfo] = useState({
    name: "Auto Excellence",
    address: "123 Avenue des Champs-Élysées",
    city: "Paris",
    zipcode: "75008",
    phone: "01 23 45 67 89",
    email: "contact@autoexcellence.fr",
    website: "www.autoexcellence.fr",
    description: "Concessionnaire automobile spécialisé en véhicules premium depuis 1995.",
    openingHours: "Lundi - Vendredi: 9h-19h, Samedi: 10h-18h"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDealerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    toast.success("Paramètres enregistrés avec succès");
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="dealership">
        <TabsList className="mb-6">
          <TabsTrigger value="dealership">Information concession</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="zones">Zones géographiques</TabsTrigger>
          <TabsTrigger value="templates">Modèles de messages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dealership">
          <Card>
            <CardHeader>
              <CardTitle>Informations de la concession</CardTitle>
              <CardDescription>
                Configurez les informations de votre concession qui apparaîtront sur le site.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom de la concession</Label>
                    <Input 
                      id="name"
                      name="name"
                      value={dealerInfo.name}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input 
                      id="phone"
                      name="phone"
                      value={dealerInfo.phone}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      name="email"
                      value={dealerInfo.email}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Site web</Label>
                    <Input 
                      id="website"
                      name="website"
                      value={dealerInfo.website}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input 
                      id="address"
                      name="address"
                      value={dealerInfo.address}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Ville</Label>
                      <Input 
                        id="city"
                        name="city"
                        value={dealerInfo.city}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="zipcode">Code postal</Label>
                      <Input 
                        id="zipcode"
                        name="zipcode"
                        value={dealerInfo.zipcode}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description"
                    name="description"
                    value={dealerInfo.description}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="openingHours">Horaires d'ouverture</Label>
                  <Textarea 
                    id="openingHours"
                    name="openingHours"
                    value={dealerInfo.openingHours}
                    onChange={handleChange}
                    rows={2}
                  />
                </div>
                
                <Button onClick={handleSave} className="w-full sm:w-auto">Enregistrer</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des utilisateurs</CardTitle>
              <CardDescription>
                Ajoutez, modifiez ou supprimez les utilisateurs ayant accès à l'espace professionnel.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Configuration des utilisateurs à implémenter.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="zones">
          <Card>
            <CardHeader>
              <CardTitle>Zones géographiques</CardTitle>
              <CardDescription>
                Définissez les zones géographiques dans lesquelles vous opérez.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Configuration des zones géographiques à implémenter.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Modèles de messages</CardTitle>
              <CardDescription>
                Créez des modèles pour vos emails, SMS et autres communications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Configuration des modèles de messages à implémenter.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
