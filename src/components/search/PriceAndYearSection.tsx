
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PriceAndYearSectionProps {
  minYear: number;
  setMinYear: (value: number) => void;
  maxYear: number;
  setMaxYear: (value: number) => void;
  minPrice: number;
  setMinPrice: (value: number) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
}

const PriceAndYearSection: React.FC<PriceAndYearSectionProps> = ({
  minYear,
  setMinYear,
  maxYear,
  setMaxYear,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}) => {
  return (
    <>
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
    </>
  );
};

export default PriceAndYearSection;
