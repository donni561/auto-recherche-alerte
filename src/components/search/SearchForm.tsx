
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import VehicleSelectionSection from './VehicleSelectionSection';
import PriceAndYearSection from './PriceAndYearSection';
import MileageSection from './MileageSection';
import SearchAreaSection from './SearchAreaSection';
import OptionsSection from './OptionsSection';
import CommentSection from './CommentSection';

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
      brand: brand === 'all_brands' ? '' : brand,
      model: model === 'all_models' ? '' : model,
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
                <VehicleSelectionSection 
                  category={category}
                  setCategory={setCategory}
                  brand={brand}
                  setBrand={setBrand}
                  model={model}
                  setModel={setModel}
                />
                
                <PriceAndYearSection 
                  minYear={minYear}
                  setMinYear={setMinYear}
                  maxYear={maxYear}
                  setMaxYear={setMaxYear}
                  minPrice={minPrice}
                  setMinPrice={setMinPrice}
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                />

                <MileageSection 
                  maxMileage={maxMileage}
                  setMaxMileage={setMaxMileage}
                />

                <SearchAreaSection 
                  searchOption={searchOption}
                  setSearchOption={setSearchOption}
                  location={location}
                  setLocation={setLocation}
                  searchRadius={searchRadius}
                  setSearchRadius={setSearchRadius}
                />

                <OptionsSection 
                  options={options}
                  onOptionChange={handleOptionChange}
                />

                <CommentSection 
                  additionalComments={additionalComments}
                  setAdditionalComments={setAdditionalComments}
                />
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
