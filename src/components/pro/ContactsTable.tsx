
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Mail, Phone } from 'lucide-react';

// Types
interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  status: 'new' | 'contacted' | 'followup' | 'closed';
  lastContact: string;
  nextFollowup: string;
}

interface ContactsTableProps {
  contacts: Contact[];
  onContact: (id: string) => void;
  onScheduleFollowup: (id: string) => void;
}

const ContactsTable: React.FC<ContactsTableProps> = ({ 
  contacts, 
  onContact, 
  onScheduleFollowup 
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-green-500">Nouveau</Badge>;
      case 'contacted':
        return <Badge className="bg-blue-500">Contacté</Badge>;
      case 'followup':
        return <Badge className="bg-yellow-500">Relance prévue</Badge>;
      case 'closed':
        return <Badge className="bg-gray-500">Terminé</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left pb-4 pl-4">Contact</th>
            <th className="text-left pb-4">Véhicule recherché</th>
            <th className="text-left pb-4">Statut</th>
            <th className="text-left pb-4">Dernier contact</th>
            <th className="text-left pb-4">Prochaine relance</th>
            <th className="text-right pb-4 pr-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id} className="border-b hover:bg-gray-50">
              <td className="py-4 pl-4">
                <div className="font-medium">{contact.name}</div>
                <div className="text-sm text-gray-500">{contact.email}</div>
                <div className="text-sm text-gray-500">{contact.phone}</div>
              </td>
              <td className="py-4">{contact.vehicle}</td>
              <td className="py-4">{getStatusBadge(contact.status)}</td>
              <td className="py-4">{contact.lastContact}</td>
              <td className="py-4">{contact.nextFollowup || '—'}</td>
              <td className="py-4 pr-4 space-x-2 text-right">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="inline-flex items-center"
                  onClick={() => onContact(contact.id)}
                >
                  <Mail className="h-4 w-4 mr-1" />
                  <span>Contacter</span>
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="inline-flex items-center"
                  onClick={() => onScheduleFollowup(contact.id)}
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Relance</span>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsTable;
