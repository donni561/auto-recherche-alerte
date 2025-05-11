
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { MapPin, Car } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Mock data
const BRANDS = [
  "Audi", "BMW", "Citroën", "Dacia", "Fiat", "Ford", "Honda", "Hyundai", "Kia", 
  "Mercedes", "Nissan", "Opel", "Peugeot", "Renault", "Seat", "Skoda", "Toyota", "Volkswagen", "Volvo"
];

// Catégories de véhicules
const CATEGORIES = [
  "Berline", "SUV / Crossover", "Break", "Monospace", "Cabriolet", 
  "Coupé", "4x4", "Citadine", "Utilitaire", "Autre"
];

const MODELS: { [key: string]: string[] } = {
  "Peugeot": ["108", "208", "2008", "308", "3008", "508", "5008"],
  "Renault": ["Clio", "Captur", "Megane", "Arkana", "Scenic", "Kadjar", "Koleos"],
  "Volkswagen": ["Polo", "Golf", "T-Roc", "Tiguan", "Passat", "Touran", "ID.3", "ID.4"],
  "Audi": ["A1", "A3", "A4", "A5", "A6", "Q3", "Q5", "Q7", "e-tron"],
  "BMW": ["Serie 1", "Serie 3", "Serie 5", "X1", "X3", "X5", "iX"],
  "Mercedes": ["Classe A", "Classe C", "Classe E", "GLA", "GLC", "GLE"],
};

// Options disponibles
const OPTIONS = [
  { id: "gps", label: "GPS / Navigation" },
  { id: "camera", label: "Caméra de recul" },
  { id: "parking", label: "Aide au stationnement" },
  { id: "bluetooth", label: "Bluetooth" },
  { id: "leather", label: "Sièges en cuir" },
  { id: "sunroof", label: "Toit ouvrant" },
  { id: "climateControl", label: "Climatisation automatique" },
  { id: "alloyWheels", label: "Jantes alliage" },
  { id: "cruiseControl", label: "Régulateur de vitesse" },
  { id: "electricSeats", label: "Sièges électriques" },
];

// French departments for the region selection
const DEPARTMENTS = [
  "01 - Ain", "02 - Aisne", "03 - Allier", "04 - Alpes-de-Haute-Provence", "05 - Hautes-Alpes",
  "06 - Alpes-Maritimes", "07 - Ardèche", "08 - Ardennes", "09 - Ariège", "10 - Aube",
  "11 - Aude", "12 - Aveyron", "13 - Bouches-du-Rhône", "14 - Calvados", "15 - Cantal",
  "16 - Charente", "17 - Charente-Maritime", "18 - Cher", "19 - Corrèze", "2A - Corse-du-Sud",
  "2B - Haute-Corse", "21 - Côte-d'Or", "22 - Côtes-d'Armor", "23 - Creuse", "24 - Dordogne",
  "25 - Doubs", "26 - Drôme", "27 - Eure", "28 - Eure-et-Loir", "29 - Finistère",
  "30 - Gard", "31 - Haute-Garonne", "32 - Gers", "33 - Gironde", "34 - Hérault",
  "35 - Ille-et-Vilaine", "36 - Indre", "37 - Indre-et-Loire", "38 - Isère", "39 - Jura",
  "40 - Landes", "41 - Loir-et-Cher", "42 - Loire", "43 - Haute-Loire", "44 - Loire-Atlantique",
  "45 - Loiret", "46 - Lot", "47 - Lot-et-Garonne", "48 - Lozère", "49 - Maine-et-Loire",
  "50 - Manche", "51 - Marne", "52 - Haute-Marne", "53 - Mayenne", "54 - Meurthe-et-Moselle",
  "55 - Meuse", "56 - Morbihan", "57 - Moselle", "58 - Nièvre", "59 - Nord",
  "60 - Oise", "61 - Orne", "62 - Pas-de-Calais", "63 - Puy-de-Dôme", "64 - Pyrénées-Atlantiques",
  "65 - Hautes-Pyrénées", "66 - Pyrénées-Orientales", "67 - Bas-Rhin", "68 - Haut-Rhin", "69 - Rhône",
  "70 - Haute-Saône", "71 - Saône-et-Loire", "72 - Sarthe", "73 - Savoie", "74 - Haute-Savoie",
  "75 - Paris", "76 - Seine-Maritime", "77 - Seine-et-Marne", "78 - Yvelines", "79 - Deux-Sèvres",
  "80 - Somme", "81 - Tarn", "82 - Tarn-et-Garonne", "83 - Var", "84 - Vaucluse",
  "85 - Vendée", "86 - Vienne", "87 - Haute-Vienne", "88 - Vosges", "89 - Yonne",
  "90 - Territoire de Belfort", "91 - Essonne", "92 - Hauts-de-Seine", "93 - Seine-Saint-Denis", "94 - Val-de-Marne",
  "95 - Val-d'Oise"
];

// Générer les années (de l'année courante jusqu'à 20 ans en arrière)
const YEARS = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear; i >= currentYear - 20; i--) {
    years.push(i.toString());
  }
  return years;
};

interface FormData {
  category: string;
  brand: string;
  model: string;
  minYear: string;
  maxYear: string;
  maxKilometers: number;
  budget: number;
  options: string[];
  region: string;
  city: string;
  radius: number;
  email: string;
  phone: string;
  name: string;
}

const SearchForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    category: "",
    brand: "",
    model: "",
    minYear: "",
    maxYear: "",
    maxKilometers: 100000,
    budget: 20000,
    options: [],
    region: "",
    city: "",
    radius: 50,
    email: "",
    phone: "",
    name: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [availableModels, setAvailableModels] = useState<string[]>([]);

  // Gérer le changement de marque pour mettre à jour les modèles disponibles
  const handleBrandChange = (value: string) => {
    setFormData({ ...formData, brand: value, model: "" });
    setAvailableModels(MODELS[value] || []);
  };

  // Gérer les changements dans le formulaire
  const handleChange = (field: keyof FormData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  // Gérer les options (checkbox)
  const handleOptionToggle = (optionId: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, options: [...formData.options, optionId] });
    } else {
      setFormData({
        ...formData,
        options: formData.options.filter(id => id !== optionId)
      });
    }
  };

  // Gérer la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Normally this would send the data to the backend
    console.log("Submitting form data:", formData);
    
    // Show success message
    toast({
      title: "Recherche envoyée !",
      description: "Votre recherche a été diffusée auprès des professionnels de votre région.",
    });
    
    // Redirect to confirmation page
    navigate("/confirmation");
  };

  // Passer à l'étape suivante
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
    // Scroll to top of page
    window.scrollTo(0, 0);
  };

  // Revenir à l'étape précédente
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    // Scroll to top of page
    window.scrollTo(0, 0);
  };

  return (
    <MainLayout>
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-2 text-center">Recherche personnalisée</h1>
            <p className="text-gray-600 mb-8 text-center">
              Décrivez le véhicule que vous recherchez et nous alerterons les professionnels dans votre région
            </p>

            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              <div className={`flex items-center ${currentStep >= 1 ? 'text-car-blue' : 'text-gray-400'}`}>
                <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 
                ${currentStep >= 1 ? 'border-car-blue bg-car-blue text-white' : 'border-gray-400'}`}>
                  1
                </div>
                <span className="ml-2 font-medium">Véhicule</span>
              </div>
              <div className={`w-12 h-1 mx-2 ${currentStep >= 2 ? 'bg-car-blue' : 'bg-gray-300'}`}></div>
              <div className={`flex items-center ${currentStep >= 2 ? 'text-car-blue' : 'text-gray-400'}`}>
                <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 
                ${currentStep >= 2 ? 'border-car-blue bg-car-blue text-white' : 'border-gray-400'}`}>
                  2
                </div>
                <span className="ml-2 font-medium">Localisation</span>
              </div>
              <div className={`w-12 h-1 mx-2 ${currentStep >= 3 ? 'bg-car-blue' : 'bg-gray-300'}`}></div>
              <div className={`flex items-center ${currentStep >= 3 ? 'text-car-blue' : 'text-gray-400'}`}>
                <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 
                ${currentStep >= 3 ? 'border-car-blue bg-car-blue text-white' : 'border-gray-400'}`}>
                  3
                </div>
                <span className="ml-2 font-medium">Confirmation</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <Card className="shadow-md">
                {currentStep === 1 && (
                  <>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Car className="mr-2 h-6 w-6" />
                        Caractéristiques du véhicule
                      </CardTitle>
                      <CardDescription>
                        Sélectionnez les critères pour le véhicule que vous recherchez
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Catégorie de véhicule */}
                      <div className="space-y-2">
                        <Label htmlFor="category">Catégorie de véhicule</Label>
                        <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une catégorie (optionnel)" />
                          </SelectTrigger>
                          <SelectContent>
                            {CATEGORIES.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Marque et modèle */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="brand">Marque (optionnel)</Label>
                          <Select value={formData.brand} onValueChange={(value) => handleBrandChange(value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Toutes les marques" />
                            </SelectTrigger>
                            <SelectContent>
                              {BRANDS.map((brand) => (
                                <SelectItem key={brand} value={brand}>
                                  {brand}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="model">Modèle (optionnel)</Label>
                          <Select 
                            value={formData.model} 
                            onValueChange={(value) => handleChange('model', value)} 
                            disabled={!formData.brand}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={formData.brand ? "Tous les modèles" : "Choisissez d'abord une marque"} />
                            </SelectTrigger>
                            <SelectContent>
                              {availableModels.map((model) => (
                                <SelectItem key={model} value={model}>
                                  {model}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Années */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="minYear">Année minimum</Label>
                          <Select value={formData.minYear} onValueChange={(value) => handleChange('minYear', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez une année" />
                            </SelectTrigger>
                            <SelectContent>
                              {YEARS().map((year) => (
                                <SelectItem key={year} value={year}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="maxYear">Année maximum</Label>
                          <Select value={formData.maxYear} onValueChange={(value) => handleChange('maxYear', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez une année" />
                            </SelectTrigger>
                            <SelectContent>
                              {YEARS().map((year) => (
                                <SelectItem key={year} value={year}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Kilométrage et Budget */}
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="maxKilometers">Kilométrage maximum</Label>
                            <span className="text-sm">{formData.maxKilometers.toLocaleString()} km</span>
                          </div>
                          <Slider
                            id="maxKilometers"
                            min={0}
                            max={300000}
                            step={5000}
                            defaultValue={[100000]}
                            value={[formData.maxKilometers]}
                            onValueChange={([value]) => handleChange('maxKilometers', value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="budget">Budget maximum</Label>
                            <span className="text-sm">{formData.budget.toLocaleString()} €</span>
                          </div>
                          <Slider
                            id="budget"
                            min={1000}
                            max={100000}
                            step={1000}
                            defaultValue={[20000]}
                            value={[formData.budget]}
                            onValueChange={([value]) => handleChange('budget', value)}
                          />
                        </div>
                      </div>

                      {/* Options */}
                      <div className="space-y-4">
                        <Label className="text-base">Options souhaitées</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {OPTIONS.map((option) => (
                            <div key={option.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={option.id}
                                checked={formData.options.includes(option.id)}
                                onCheckedChange={(checked) => handleOptionToggle(option.id, checked as boolean)}
                              />
                              <label
                                htmlFor={option.id}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="car-button-gradient text-white ml-auto"
                        type="button" 
                        onClick={nextStep}
                      >
                        Suivant
                      </Button>
                    </CardFooter>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MapPin className="mr-2 h-6 w-6" />
                        Zone de recherche
                      </CardTitle>
                      <CardDescription>
                        Indiquez votre localisation pour alerter les professionnels dans votre région
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Département et Ville */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="region">Département</Label>
                          <Select value={formData.region} onValueChange={(value) => handleChange('region', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez un département" />
                            </SelectTrigger>
                            <SelectContent>
                              {DEPARTMENTS.map((dept) => (
                                <SelectItem key={dept} value={dept}>
                                  {dept}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">Ville</Label>
                          <Input 
                            id="city" 
                            placeholder="Ex: Lyon, Paris, Nantes..." 
                            value={formData.city}
                            onChange={(e) => handleChange('city', e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Rayon de recherche */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="radius">Rayon de recherche</Label>
                          <span className="text-sm">{formData.radius} km</span>
                        </div>
                        <Slider
                          id="radius"
                          min={10}
                          max={200}
                          step={10}
                          defaultValue={[50]}
                          value={[formData.radius]}
                          onValueChange={([value]) => handleChange('radius', value)}
                        />
                      </div>

                      {/* Zone de recherche (pseudo carte) */}
                      <div className="p-4 bg-gray-100 rounded-lg text-center">
                        <p className="text-sm text-gray-500 mb-2">Aperçu de votre zone de recherche</p>
                        <div className="aspect-[16/9] bg-gray-200 rounded-lg flex items-center justify-center border border-dashed border-gray-400">
                          <p className="text-gray-500">
                            <MapPin className="h-8 w-8 mx-auto mb-2 text-car-blue" />
                            {formData.city && formData.region ? (
                              <>
                                {formData.city}, {formData.region}<br />
                                Rayon: {formData.radius} km
                              </>
                            ) : (
                              "Veuillez sélectionner une localisation"
                            )}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Dans le produit final, une carte interactive sera affichée ici
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        type="button"
                        onClick={prevStep}
                      >
                        Retour
                      </Button>
                      <Button 
                        className="car-button-gradient text-white"
                        type="button"
                        onClick={nextStep}
                      >
                        Suivant
                      </Button>
                    </CardFooter>
                  </>
                )}

                {currentStep === 3 && (
                  <>
                    <CardHeader>
                      <CardTitle>Finaliser votre recherche</CardTitle>
                      <CardDescription>
                        Vos coordonnées pour être contacté par les professionnels
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Informations de contact */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Votre nom</Label>
                          <Input 
                            id="name" 
                            placeholder="Ex: Jean Dupont" 
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            placeholder="votre@email.com" 
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Téléphone</Label>
                          <Input 
                            id="phone" 
                            placeholder="Ex: 06 12 34 56 78" 
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      {/* Résumé de la recherche */}
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="font-semibold mb-3">Résumé de votre recherche</h4>

                        <div className="space-y-3 text-sm">
                          {formData.category && (
                            <div className="grid grid-cols-2 gap-1">
                              <p className="text-gray-500">Catégorie:</p>
                              <p>{formData.category}</p>
                            </div>
                          )}
                          
                          <div className="grid grid-cols-2 gap-1">
                            <p className="text-gray-500">Véhicule:</p>
                            <p>
                              {formData.brand ? formData.brand : "Toutes marques"} 
                              {formData.model ? ` ${formData.model}` : ""} 
                              {formData.minYear && formData.maxYear && ` (${formData.minYear} - ${formData.maxYear})`}
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-1">
                            <p className="text-gray-500">Kilométrage max:</p>
                            <p>{formData.maxKilometers.toLocaleString()} km</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-1">
                            <p className="text-gray-500">Budget max:</p>
                            <p>{formData.budget.toLocaleString()} €</p>
                          </div>
                          
                          {formData.options.length > 0 && (
                            <div className="grid grid-cols-2 gap-1">
                              <p className="text-gray-500">Options:</p>
                              <p>
                                {formData.options.map(opt => 
                                  OPTIONS.find(o => o.id === opt)?.label
                                ).join(', ')}
                              </p>
                            </div>
                          )}
                          
                          <div className="grid grid-cols-2 gap-1">
                            <p className="text-gray-500">Zone de recherche:</p>
                            <p>{formData.city} ({formData.region && formData.region.split(' - ')[0]}) - {formData.radius} km</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start">
                        <svg className="w-6 h-6 text-blue-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p className="text-sm text-blue-700">
                          En finalisant votre recherche, vous acceptez que les professionnels de l'automobile dans votre zone vous contactent par email ou téléphone au sujet de véhicules correspondant à vos critères.
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        type="button"
                        onClick={prevStep}
                      >
                        Retour
                      </Button>
                      <Button 
                        className="car-button-gradient text-white"
                        type="submit"
                      >
                        Finaliser ma recherche
                      </Button>
                    </CardFooter>
                  </>
                )}
              </Card>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SearchForm;
