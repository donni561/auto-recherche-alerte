
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface SearchAreaSectionProps {
  searchOption: string;
  setSearchOption: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  searchRadius: number;
  setSearchRadius: (value: number) => void;
}

const SearchAreaSection: React.FC<SearchAreaSectionProps> = ({
  searchOption,
  setSearchOption,
  location,
  setLocation,
  searchRadius,
  setSearchRadius,
}) => {
  return (
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
  );
};

export default SearchAreaSection;
