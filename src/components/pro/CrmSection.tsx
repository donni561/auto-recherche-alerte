
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { 
  Calendar as CalendarIcon, 
  Mail, 
  Phone, 
  MessageSquare, 
  CircleDotIcon, 
  CircleCheckIcon,
  CalendarPlusIcon
} from "lucide-react";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, isSameDay, isPast, isFuture, addDays } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FollowUp {
  id: string;
  contactId: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  date: Date;
  type: 'email' | 'phone' | 'sms';
  note: string;
  completed: boolean;
}

const CrmSection = () => {
  const [followUps, setFollowUps] = useState<FollowUp[]>([
    {
      id: "1",
      contactId: "1",
      contactName: "Jean Dupont",
      contactEmail: "jean.dupont@example.com",
      contactPhone: "06 12 34 56 78",
      date: addDays(new Date(), -2),
      type: "email",
      note: "Relancer suite à la demande de prix",
      completed: false
    },
    {
      id: "2",
      contactId: "2",
      contactName: "Marie Martin",
      contactEmail: "marie.martin@example.com",
      contactPhone: "07 98 76 54 32",
      date: new Date(),
      type: "phone",
      note: "Appeler pour confirmer le rendez-vous",
      completed: false
    },
    {
      id: "3",
      contactId: "3",
      contactName: "Pierre Durand",
      contactEmail: "pierre.durand@example.com",
      contactPhone: "06 11 22 33 44",
      date: addDays(new Date(), 3),
      type: "sms",
      note: "Rappeler la disponibilité du véhicule",
      completed: false
    }
  ]);

  // Dialog states
  const [isNewFollowUpOpen, setIsNewFollowUpOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedFollowUp, setSelectedFollowUp] = useState<FollowUp | null>(null);
  
  // New follow-up form state
  const [newFollowUp, setNewFollowUp] = useState({
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    date: new Date(),
    type: "email" as 'email' | 'phone' | 'sms',
    note: ""
  });
  
  // Contact form state
  const [contactMessage, setContactMessage] = useState("");

  const handleAddFollowUp = () => {
    const followUp: FollowUp = {
      id: Date.now().toString(),
      contactId: Date.now().toString(),
      contactName: newFollowUp.contactName,
      contactEmail: newFollowUp.contactEmail,
      contactPhone: newFollowUp.contactPhone,
      date: newFollowUp.date,
      type: newFollowUp.type,
      note: newFollowUp.note,
      completed: false
    };
    
    setFollowUps([...followUps, followUp]);
    toast.success("Relance planifiée avec succès");
    setIsNewFollowUpOpen(false);
    
    // Reset form
    setNewFollowUp({
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      date: new Date(),
      type: "email",
      note: ""
    });
  };
  
  const handleOpenContact = (followUp: FollowUp) => {
    setSelectedFollowUp(followUp);
    setIsContactOpen(true);
  };
  
  const handleCompleteContact = () => {
    if (!selectedFollowUp) return;
    
    setFollowUps(followUps.map(f => 
      f.id === selectedFollowUp.id ? { ...f, completed: true } : f
    ));
    
    toast.success(`${selectedFollowUp.type === 'email' ? 'Email envoyé' : 
                    selectedFollowUp.type === 'phone' ? 'Appel effectué' : 
                    'SMS envoyé'} à ${selectedFollowUp.contactName}`);
    setIsContactOpen(false);
    setContactMessage("");
  };
  
  const handleDeleteFollowUp = (id: string) => {
    setFollowUps(followUps.filter(f => f.id !== id));
    toast.success("Relance supprimée");
  };

  // Helper function to determine row background color based on date
  const getRowClassName = (date: Date, completed: boolean) => {
    if (completed) return "bg-gray-100";
    if (isPast(date) && !isSameDay(date, new Date())) return "bg-red-50";
    if (isSameDay(date, new Date())) return "bg-green-50";
    if (isFuture(date)) return "bg-purple-50";
    return "";
  };
  
  // Helper function to get icon based on date
  const getFollowupIcon = (date: Date, completed: boolean) => {
    if (completed) return null;
    if (isPast(date) && !isSameDay(date, new Date())) {
      return <CircleDotIcon className="h-4 w-4 text-red-500" />;
    }
    if (isSameDay(date, new Date())) {
      return <CircleCheckIcon className="h-4 w-4 text-green-500" />;
    }
    if (isFuture(date)) {
      return <CalendarPlusIcon className="h-4 w-4 text-purple-500" />;
    }
    return null;
  };
  
  // Helper function to get communication type icon
  const getCommunicationIcon = (type: 'email' | 'phone' | 'sms') => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'phone':
        return <Phone className="h-4 w-4" />;
      case 'sms':
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="all">Toutes les relances</TabsTrigger>
            <TabsTrigger value="past">
              <CircleDotIcon className="h-4 w-4 mr-2 text-red-500" />
              En retard
            </TabsTrigger>
            <TabsTrigger value="today">
              <CircleCheckIcon className="h-4 w-4 mr-2 text-green-500" />
              Aujourd'hui
            </TabsTrigger>
            <TabsTrigger value="future">
              <CalendarPlusIcon className="h-4 w-4 mr-2 text-purple-500" />
              À venir
            </TabsTrigger>
          </TabsList>
          
          <Button 
            onClick={() => setIsNewFollowUpOpen(true)} 
            className="car-button-gradient text-white"
          >
            Nouvelle relance
          </Button>
        </div>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Toutes les relances</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Note</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {followUps.map((followUp) => (
                    <TableRow key={followUp.id} className={getRowClassName(followUp.date, followUp.completed)}>
                      <TableCell>
                        {getFollowupIcon(followUp.date, followUp.completed)}
                        {followUp.completed && <span className="text-sm text-gray-500">Terminé</span>}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{followUp.contactName}</div>
                        <div className="text-sm text-gray-500">{followUp.contactEmail}</div>
                        <div className="text-sm text-gray-500">{followUp.contactPhone}</div>
                      </TableCell>
                      <TableCell>{format(followUp.date, 'dd/MM/yyyy', { locale: fr })}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getCommunicationIcon(followUp.type)}
                          <span className="capitalize">{followUp.type}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{followUp.note}</TableCell>
                      <TableCell className="text-right">
                        {!followUp.completed && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleOpenContact(followUp)} 
                            className="mr-2"
                          >
                            Contacter
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteFollowUp(followUp.id)}
                        >
                          Supprimer
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="past">
          <Card>
            <CardHeader>
              <CardTitle>Relances en retard</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Note</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {followUps
                    .filter(f => isPast(f.date) && !isSameDay(f.date, new Date()) && !f.completed)
                    .map((followUp) => (
                      <TableRow key={followUp.id} className="bg-red-50">
                        <TableCell>
                          <CircleDotIcon className="h-4 w-4 text-red-500" />
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{followUp.contactName}</div>
                          <div className="text-sm text-gray-500">{followUp.contactEmail}</div>
                          <div className="text-sm text-gray-500">{followUp.contactPhone}</div>
                        </TableCell>
                        <TableCell>{format(followUp.date, 'dd/MM/yyyy', { locale: fr })}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getCommunicationIcon(followUp.type)}
                            <span className="capitalize">{followUp.type}</span>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">{followUp.note}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleOpenContact(followUp)} 
                            className="mr-2"
                          >
                            Contacter
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDeleteFollowUp(followUp.id)}
                          >
                            Supprimer
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="today">
          <Card>
            <CardHeader>
              <CardTitle>Relances aujourd'hui</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Note</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {followUps
                    .filter(f => isSameDay(f.date, new Date()) && !f.completed)
                    .map((followUp) => (
                      <TableRow key={followUp.id} className="bg-green-50">
                        <TableCell>
                          <CircleCheckIcon className="h-4 w-4 text-green-500" />
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{followUp.contactName}</div>
                          <div className="text-sm text-gray-500">{followUp.contactEmail}</div>
                          <div className="text-sm text-gray-500">{followUp.contactPhone}</div>
                        </TableCell>
                        <TableCell>{format(followUp.date, 'dd/MM/yyyy', { locale: fr })}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getCommunicationIcon(followUp.type)}
                            <span className="capitalize">{followUp.type}</span>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">{followUp.note}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleOpenContact(followUp)} 
                            className="mr-2"
                          >
                            Contacter
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDeleteFollowUp(followUp.id)}
                          >
                            Supprimer
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="future">
          <Card>
            <CardHeader>
              <CardTitle>Relances à venir</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Note</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {followUps
                    .filter(f => isFuture(f.date) && !f.completed)
                    .map((followUp) => (
                      <TableRow key={followUp.id} className="bg-purple-50">
                        <TableCell>
                          <CalendarPlusIcon className="h-4 w-4 text-purple-500" />
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{followUp.contactName}</div>
                          <div className="text-sm text-gray-500">{followUp.contactEmail}</div>
                          <div className="text-sm text-gray-500">{followUp.contactPhone}</div>
                        </TableCell>
                        <TableCell>{format(followUp.date, 'dd/MM/yyyy', { locale: fr })}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getCommunicationIcon(followUp.type)}
                            <span className="capitalize">{followUp.type}</span>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">{followUp.note}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleOpenContact(followUp)} 
                            className="mr-2"
                          >
                            Contacter
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDeleteFollowUp(followUp.id)}
                          >
                            Supprimer
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* New Follow-up Dialog */}
      <Dialog open={isNewFollowUpOpen} onOpenChange={setIsNewFollowUpOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Nouvelle relance</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Nom du contact</Label>
                <Input 
                  id="contactName" 
                  value={newFollowUp.contactName}
                  onChange={(e) => setNewFollowUp({...newFollowUp, contactName: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Téléphone</Label>
                <Input 
                  id="contactPhone" 
                  value={newFollowUp.contactPhone}
                  onChange={(e) => setNewFollowUp({...newFollowUp, contactPhone: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email</Label>
              <Input 
                id="contactEmail" 
                type="email" 
                value={newFollowUp.contactEmail}
                onChange={(e) => setNewFollowUp({...newFollowUp, contactEmail: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Date de la relance</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(newFollowUp.date, "PPP", { locale: fr })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newFollowUp.date}
                    onSelect={(date) => date && setNewFollowUp({...newFollowUp, date})}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Type de communication</Label>
              <Select 
                value={newFollowUp.type}
                onValueChange={(value) => setNewFollowUp({...newFollowUp, type: value as 'email' | 'phone' | 'sms'})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Téléphone</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="note">Note</Label>
              <Textarea 
                id="note" 
                value={newFollowUp.note}
                onChange={(e) => setNewFollowUp({...newFollowUp, note: e.target.value})}
                placeholder="Détails de la relance..."
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewFollowUpOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleAddFollowUp}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Contact Dialog */}
      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {selectedFollowUp?.type === 'email' ? 'Envoyer un email' : 
               selectedFollowUp?.type === 'phone' ? 'Appel téléphonique' : 
               'Envoyer un SMS'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="bg-muted p-3 rounded-md">
              <div><strong>Contact:</strong> {selectedFollowUp?.contactName}</div>
              <div><strong>{selectedFollowUp?.type === 'email' ? 'Email' : 'Téléphone'}:</strong> {selectedFollowUp?.type === 'email' ? selectedFollowUp?.contactEmail : selectedFollowUp?.contactPhone}</div>
              <div><strong>Note:</strong> {selectedFollowUp?.note}</div>
            </div>
            
            {selectedFollowUp?.type === 'email' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="subject">Sujet</Label>
                  <Input id="subject" defaultValue="Votre demande de véhicule" />
                </div>
              </>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Saisissez votre message..."
                rows={5}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsContactOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleCompleteContact}>
              {selectedFollowUp?.type === 'email' ? 'Envoyer l\'email' : 
               selectedFollowUp?.type === 'phone' ? 'Confirmer l\'appel' : 
               'Envoyer le SMS'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CrmSection;
