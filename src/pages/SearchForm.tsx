
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

// Import car brands and models data
import { carBrands, carModels, vehicleCategories } from '@/data/carData';

const SearchForm = () => {
  const navigate = useNavigate();

  // Form state
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [minYear, setMinYear] = useState(2010);
  const [maxYear, setMaxYear] = useState(2023);
  const [minPrice, setMinPrice] = useState(5000);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [maxMileage, setMaxMileage] = useState(150000);
  const [searchRadius, setSearchRadius] = useState(50);
  const [location, setLocation] = useState('');
  const [searchOption, setSearchOption] = useState('region');
  const [additionalComments, setAdditionalComments] = useState('');
  
  // Options
  const [options, setOptions] = useState({
    airConditioning: false,
    leatherSeats: false,
    sunroof: false,
    navigation: false,
    bluetooth: false,
    parkingSensors: false,
    electricWindows: false,
    heatedSeats: false,
  });

  const handleOptionChange = (option) => {
    setOptions({
      ...options,
      [option]: !options[option],
    });
  };

  // Filtered models based on selected brand
  const filteredModels = brand 
    ? carModels.filter((item) => item.brand === brand) 
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!category) {
      toast.error('Veuillez choisir une catégorie de véhicule');
      return;
    }
    
    if (searchOption === 'region' && !location) {
      toast.error('Veuillez indiquer votre localisation');
      return;
    }

    // Construct search data object
    const searchData = {
      category,
      brand,
      model,
      yearRange: [minYear, maxYear],
      priceRange: [minPrice, maxPrice],
      maxMileage,
      searchRadius: searchOption === 'france' ? 'Toute la France' : searchRadius,
      location: searchOption === 'france' ? 'Toute la France' : location,
      options: Object.keys(options).filter(key => options[key]),
      additionalComments
    };
    
    // Save search data in session storage
    sessionStorage.setItem('searchData', JSON.stringify(searchData));
    
    // Show success message
    toast.success('Votre recherche a été enregistrée !');
    
    // Redirect to confirmation page
    navigate('/confirmation');
  };

  return (
    <MainLayout>
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-car-blue">
                Trouver votre véhicule idéal
              </CardTitle>
              <CardDescription>
                Remplissez ce formulaire pour que les professionnels près de chez vous vous proposent des véhicules correspondant à vos critères.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Vehicle Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-base font-medium">
                      Catégorie de véhicule <span className="text-red-500">*</span>
                    </Label>
                    <Select 
                      value={category} 
                      onValueChange={setCategory}
                    >
                      <SelectTrigger id="category" className="bg-white">
                        <SelectValue placeholder="Choisir une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicleCategories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                
                  {/* Brand */}
                  <div className="space-y-2">
                    <Label htmlFor="brand" className="text-base font-medium">
                      Marque
                    </Label>
                    <Select 
                      value={brand} 
                      onValueChange={(value) => {
                        setBrand(value);
                        setModel('');
                      }}
                    >
                      <SelectTrigger id="brand" className="bg-white">
                        <SelectValue placeholder="Toutes les marques" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Toutes les marques</SelectItem>
                        {carBrands.map((brand) => (
                          <SelectItem key={brand.value} value={brand.value}>
                            {brand.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                
                  {/* Model - Only shown if brand is selected */}
                  {brand && (
                    <div className="space-y-2">
                      <Label htmlFor="model" className="text-base font-medium">
                        Modèle
                      </Label>
                      <Select 
                        value={model} 
                        onValueChange={setModel}
                      >
                        <SelectTrigger id="model" className="bg-white">
                          <SelectValue placeholder="Tous les modèles" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Tous les modèles</SelectItem>
                          {filteredModels.map((model) => (
                            <SelectItem key={model.value} value={model.value}>
                              {model.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                {/* Year Range */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-medium">Année</Label>
                    <div className="text-sm text-car-blue font-medium">
                      {minYear} - {maxYear}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="minYear">Année min</Label>
                      <Select value={String(minYear)} onValueChange={(value) => setMinYear(Number(value))}>
                        <SelectTrigger id="minYear" className="bg-white">
                          <SelectValue placeholder="Année min" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }, (_, i) => 2000 + i).map((year) => (
                            <SelectItem key={year} value={String(year)}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxYear">Année max</Label>
                      <Select value={String(maxYear)} onValueChange={(value) => setMaxYear(Number(value))}>
                        <SelectTrigger id="maxYear" className="bg-white">
                          <SelectValue placeholder="Année max" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }, (_, i) => 2000 + i).map((year) => (
                            <SelectItem key={year} value={String(year)}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-medium">Budget</Label>
                    <div className="text-sm text-car-blue font-medium">
                      {minPrice.toLocaleString()} € - {maxPrice.toLocaleString()} €
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="minPrice">Prix min</Label>
                      <Input
                        id="minPrice"
                        type="number"
                        value={minPrice}
                        className="bg-white"
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxPrice">Prix max</Label>
                      <Input
                        id="maxPrice"
                        type="number"
                        value={maxPrice}
                        className="bg-white"
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </div>

                {/* Mileage */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="mileage" className="text-base font-medium">
                      Kilométrage max
                    </Label>
                    <span className="text-sm text-car-blue font-medium">{maxMileage.toLocaleString()} km</span>
                  </div>
                  <Slider
                    id="mileage"
                    min={0}
                    max={300000}
                    step={5000}
                    value={[maxMileage]}
                    onValueChange={(values) => setMaxMileage(values[0])}
                  />
                </div>

                {/* Search Area */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Zone de recherche</Label>
                  <RadioGroup value={searchOption} onValueChange={setSearchOption} className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="france" id="france" />
                      <Label htmlFor="france">Toute la France</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="region" id="region" />
                      <Label htmlFor="region">Recherche régionale</Label>
                    </div>
                  </RadioGroup>
                  
                  {searchOption === 'region' && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Localisation</Label>
                        <Input
                          id="location"
                          type="text"
                          placeholder="Ville ou code postal"
                          className="bg-white"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="radius">Rayon de recherche</Label>
                          <span className="text-sm text-car-blue font-medium">{searchRadius} km</span>
                        </div>
                        <Slider
                          id="radius"
                          min={10}
                          max={200}
                          step={10}
                          value={[searchRadius]}
                          onValueChange={(values) => setSearchRadius(values[0])}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Options */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Options souhaitées</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(options).map(([key, value]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox
                          id={key}
                          checked={value}
                          onCheckedChange={() => handleOptionChange(key)}
                        />
                        <Label htmlFor={key} className="text-sm font-normal">
                          {key === 'airConditioning' && 'Climatisation'}
                          {key === 'leatherSeats' && 'Sièges cuir'}
                          {key === 'sunroof' && 'Toit ouvrant'}
                          {key === 'navigation' && 'Navigation GPS'}
                          {key === 'bluetooth' && 'Bluetooth'}
                          {key === 'parkingSensors' && 'Capteurs de parking'}
                          {key === 'electricWindows' && 'Vitres électriques'}
                          {key === 'heatedSeats' && 'Sièges chauffants'}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Comments */}
                <div className="space-y-2">
                  <Label htmlFor="comments" className="text-base font-medium">
                    Commentaires additionnels
                  </Label>
                  <Textarea
                    id="comments"
                    placeholder="Précisez d'autres critères ou informations importantes concernant votre recherche..."
                    className="bg-white min-h-[120px]"
                    value={additionalComments}
                    onChange={(e) => setAdditionalComments(e.target.value)}
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSubmit} 
                className="car-button-gradient w-full text-white text-lg py-6"
              >
                Lancer ma recherche
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default SearchForm;
