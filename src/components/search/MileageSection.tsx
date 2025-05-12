
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface MileageSectionProps {
  maxMileage: number;
  setMaxMileage: (value: number) => void;
}

const MileageSection: React.FC<MileageSectionProps> = ({
  maxMileage,
  setMaxMileage,
}) => {
  return (
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
  );
};

export default MileageSection;
