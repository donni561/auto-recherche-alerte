
import React from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { vehicleCategories, carBrands, carModels } from '@/data/carData';

interface VehicleSelectionSectionProps {
  category: string;
  setCategory: (value: string) => void;
  brand: string;
  setBrand: (value: string) => void;
  model: string;
  setModel: (value: string) => void;
}

const VehicleSelectionSection: React.FC<VehicleSelectionSectionProps> = ({
  category,
  setCategory,
  brand,
  setBrand,
  model,
  setModel,
}) => {
  // Filtered models based on selected brand
  const filteredModels = brand 
    ? carModels.filter((item) => item.brand === brand) 
    : [];

  return (
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
  );
};

export default VehicleSelectionSection;
