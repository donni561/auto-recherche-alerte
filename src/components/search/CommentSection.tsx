
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface CommentSectionProps {
  additionalComments: string;
  setAdditionalComments: (value: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  additionalComments,
  setAdditionalComments,
}) => {
  return (
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
  );
};

export default CommentSection;
