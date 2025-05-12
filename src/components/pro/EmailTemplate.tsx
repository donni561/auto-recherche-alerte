
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle
} from '@/components/ui/dialog';

interface EmailTemplateProps {
  contactId: string;
  contactName: string;
  contactEmail: string;
  isOpen: boolean;
  onClose: () => void;
  onSend: (contactId: string, subject: string, message: string) => void;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({
  contactId,
  contactName,
  contactEmail,
  isOpen,
  onClose,
  onSend
}) => {
  const [subject, setSubject] = useState('Votre recherche de véhicule');
  const [message, setMessage] = useState(`Bonjour ${contactName},\n\nSuite à votre recherche de véhicule, nous avons plusieurs modèles susceptibles de vous intéresser.\n\nN'hésitez pas à me contacter pour plus d'informations.\n\nCordialement,\nVotre concessionnaire`);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend(contactId, subject, message);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Envoyer un email</DialogTitle>
          <DialogDescription>
            Envoi d'un email à {contactName} ({contactEmail})
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Sujet</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[200px] bg-white"
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={onClose} type="button">
              Annuler
            </Button>
            <Button type="submit" className="car-button-gradient text-white">
              Envoyer l'email
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmailTemplate;
