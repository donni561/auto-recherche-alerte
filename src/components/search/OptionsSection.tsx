
import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface OptionsSectionProps {
  options: {
    airConditioning: boolean;
    leatherSeats: boolean;
    sunroof: boolean;
    navigation: boolean;
    bluetooth: boolean;
    parkingSensors: boolean;
    electricWindows: boolean;
    heatedSeats: boolean;
  };
  onOptionChange: (option: string) => void;
}

const OptionsSection: React.FC<OptionsSectionProps> = ({
  options,
  onOptionChange,
}) => {
  const optionLabels = {
    airConditioning: 'Climatisation',
    leatherSeats: 'Sièges cuir',
    sunroof: 'Toit ouvrant',
    navigation: 'Navigation GPS',
    bluetooth: 'Bluetooth',
    parkingSensors: 'Capteurs de parking',
    electricWindows: 'Vitres électriques',
    heatedSeats: 'Sièges chauffants',
  };

  return (
    <div className="space-y-4">
      <Label className="text-base font-medium">Options souhaitées</Label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(options).map(([key, value]) => (
          <div key={key} className="flex items-center space-x-2">
            <Checkbox
              id={key}
              checked={value}
              onCheckedChange={() => onOptionChange(key)}
            />
            <Label htmlFor={key} className="text-sm font-normal">
              {optionLabels[key]}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionsSection;
