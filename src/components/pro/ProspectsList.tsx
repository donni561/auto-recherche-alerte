
import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Calendar, Mail, Phone, MessageSquare } from "lucide-react";

interface Prospect {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  budget: string;
  date: Date;
  status: 'new' | 'contacted' | 'followup' | 'closed';
}

const ProspectsList = () => {
  const [prospects, setProspects] = useState<Prospect[]>([
    {
      id: "1",
      name: "Jean Dupont",
      email: "jean.dupont@example.com",
      phone: "06 12 34 56 78",
      vehicle: "Peugeot 3008",
      budget: "25 000 € - 30 000 €",
      date: new Date(),
      status: "new"
    },
    {
      id: "2",
      name: "Marie Martin",
      email: "marie.martin@example.com",
      phone: "07 98 76 54 32",
      vehicle: "Renault Clio",
      budget: "15 000 € - 20 000 €",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      status: "contacted"
    },
    {
      id: "3",
      name: "Pierre Durand",
      email: "pierre.durand@example.com",
      phone: "06 11 22 33 44",
      vehicle: "Citroën C5",
      budget: "20 000 € - 25 000 €",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      status: "followup"
    }
  ]);

  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [contactMethod, setContactMethod] = useState<'email' | 'phone' | 'sms'>('email');
  const [contactNote, setContactNote] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-green-500">Nouveau</Badge>;
      case 'contacted':
        return <Badge className="bg-blue-500">Contacté</Badge>;
      case 'followup':
        return <Badge className="bg-yellow-500">Relance prévue</Badge>;
      case 'closed':
        return <Badge className="bg-gray-400">Terminé</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  const handleContact = (prospect: Prospect) => {
    setSelectedProspect(prospect);
    setContactDialogOpen(true);
  };

  const handleSubmitContact = () => {
    if (selectedProspect) {
      // Update prospect status
      setProspects(prospects.map(p => 
        p.id === selectedProspect.id ? { ...p, status: 'contacted' as const } : p
      ));

      // Show notification
      toast.success(`Contact ${contactMethod} envoyé à ${selectedProspect.name}`);
      
      // Reset and close
      setContactNote('');
      setContactDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Demandes de prospects</h2>
        <Button className="car-button-gradient text-white">Exporter</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Prospect</TableHead>
            <TableHead>Véhicule</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prospects.map((prospect) => (
            <TableRow key={prospect.id}>
              <TableCell>
                <div className="font-medium">{prospect.name}</div>
                <div className="text-sm text-gray-500">{prospect.email}</div>
                <div className="text-sm text-gray-500">{prospect.phone}</div>
              </TableCell>
              <TableCell>{prospect.vehicle}</TableCell>
              <TableCell>{prospect.budget}</TableCell>
              <TableCell>{prospect.date.toLocaleDateString()}</TableCell>
              <TableCell>{getStatusBadge(prospect.status)}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" onClick={() => handleContact(prospect)} className="mr-2">
                  Contacter
                </Button>
                <Button variant="outline" size="sm">
                  Détails
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Contact Dialog */}
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Contacter le prospect</DialogTitle>
            <DialogDescription>
              {selectedProspect && (
                <p>Contact avec {selectedProspect.name}</p>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant={contactMethod === 'email' ? "default" : "outline"} 
                onClick={() => setContactMethod('email')}
                className="flex items-center justify-center gap-2"
              >
                <Mail className="h-4 w-4" /> Email
              </Button>
              <Button 
                variant={contactMethod === 'phone' ? "default" : "outline"} 
                onClick={() => setContactMethod('phone')}
                className="flex items-center justify-center gap-2"
              >
                <Phone className="h-4 w-4" /> Téléphone
              </Button>
              <Button 
                variant={contactMethod === 'sms' ? "default" : "outline"} 
                onClick={() => setContactMethod('sms')}
                className="flex items-center justify-center gap-2"
              >
                <MessageSquare className="h-4 w-4" /> SMS
              </Button>
            </div>

            {contactMethod === 'email' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="subject">Sujet</Label>
                  <Input id="subject" defaultValue="Votre recherche de véhicule" />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="note">Message</Label>
              <Textarea 
                id="note" 
                rows={5}
                value={contactNote}
                onChange={(e) => setContactNote(e.target.value)}
                placeholder="Saisissez votre message..."
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setContactDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSubmitContact}>
              Envoyer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProspectsList;
