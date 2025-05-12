import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Professional = () => {
  const [contacts, setContacts] = useState([
    {
      id: '1',
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      phone: '06 12 34 56 78',
      status: 'pending',
      followup: {
        date: new Date(),
        note: 'Relancer pour proposition',
        method: 'email',
        completed: false
      }
    },
    {
      id: '2',
      name: 'Sophie Martin',
      email: 'sophie.martin@example.com',
      phone: '06 98 76 54 32',
      status: 'contacted',
      followup: {
        date: new Date(),
        note: 'Appeler pour RDV',
        method: 'phone',
        completed: false
      }
    },
    {
      id: '3',
      name: 'Luc Durand',
      email: 'luc.durand@example.com',
      phone: '07 45 67 89 10',
      status: 'responded',
      followup: {
        date: new Date(),
        note: 'Préparer le dossier',
        method: 'meeting',
        completed: true
      }
    },
  ]);

  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [note, setNote] = React.useState('');
  const [method, setMethod] = React.useState('email');
  const [selectedContactId, setSelectedContactId] = useState(null);

  // Update handleStatusChange to match the expected function signature (id: string) => void
  const handleStatusChange = (contactId: string) => {
    // Original logic but adapted to single parameter
    // You may need to get the contact from the contacts array using the contactId
    const contact = contacts.find(c => c.id === contactId);
    if (!contact) return;
    
    // Then continue with your logic
    const newStatus = contact.status === 'pending' ? 'contacted' : 
                      contact.status === 'contacted' ? 'responded' : 'pending';
    
    // Update the contact status
    setContacts(contacts.map(c => 
      c.id === contactId ? { ...c, status: newStatus } : c
    ));
    
    toast.success(`Statut mis à jour : ${newStatus}`);
  };

  // Update handleScheduleFollowup to match the expected function signature
  // (contactId: string, date: Date, note: string, method: string) => void
  const handleScheduleFollowup = (contactId: string, date: Date, note: string, method: string) => {
    // Implement the new version of the function with all four parameters
    setContacts(contacts.map(c => 
      c.id === contactId ? { 
        ...c, 
        followup: { 
          date: date,
          note: note,
          method: method,
          completed: false 
        } 
      } : c
    ));
    
    toast.success(`Relance planifiée pour le ${date.toLocaleDateString()}`);
  };

  const openFollowupModal = (contactId) => {
    setSelectedContactId(contactId);
    setOpen(true);
  };

  const closeFollowupModal = () => {
    setSelectedContactId(null);
    setOpen(false);
  };

  const saveFollowup = () => {
    if (selectedContactId && date && note && method) {
      handleScheduleFollowup(selectedContactId, date, note, method);
      closeFollowupModal();
    } else {
      toast.error('Veuillez remplir tous les champs de la relance.');
    }
  };

  return (
    <MainLayout>
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-car-blue">
                Espace Professionnel
              </CardTitle>
              <CardDescription>
                Suivez ici vos prospects et planifiez vos relances.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nom
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Téléphone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Relance
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {contacts.map((contact) => (
                      <tr key={contact.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {contact.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {contact.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {contact.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {contact.status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {contact.followup ? (
                            <>
                              <div>Date: {contact.followup.date.toLocaleDateString()}</div>
                              <div>Note: {contact.followup.note}</div>
                              <div>Méthode: {contact.followup.method}</div>
                            </>
                          ) : (
                            'Aucune relance planifiée'
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button 
                            variant="outline" 
                            onClick={() => handleStatusChange(contact.id)}
                          >
                            Changer Statut
                          </Button>
                          <Button 
                            className="ml-2 car-button-gradient text-white"
                            onClick={() => openFollowupModal(contact.id)}
                          >
                            Planifier Relance
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Followup Modal */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">Planifier une relance</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium leading-none">
                Planifier une relance
              </h4>
              <p className="text-sm text-muted-foreground">
                Choisissez la date et la méthode de relance.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Choisir une date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) =>
                      date < new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="note">Note</Label>
              <Textarea 
                id="note" 
                placeholder="Ajouter une note" 
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="method">Méthode</Label>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger id="method">
                  <SelectValue placeholder="Choisir une méthode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Téléphone</SelectItem>
                  <SelectItem value="meeting">RDV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={closeFollowupModal}>Annuler</Button>
            <Button onClick={saveFollowup}>Enregistrer</Button>
          </div>
        </PopoverContent>
      </Popover>
    </MainLayout>
  );
};

export default Professional;
