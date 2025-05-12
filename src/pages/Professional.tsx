
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SearchIcon, Filter, Calendar, Mail, Clock } from 'lucide-react';
import ContactsTable from '@/components/pro/ContactsTable';
import FollowupScheduler from '@/components/pro/FollowupScheduler';
import EmailTemplate from '@/components/pro/EmailTemplate';
import { toast } from 'sonner';

// Define the proper Contact type with string literal for status
type ContactStatus = "new" | "contacted" | "followup" | "closed";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  status: ContactStatus;
  lastContact: string;
  nextFollowup: string;
}

// Mock function for sending emails
const sendEmail = (contactId: string, subject: string, message: string) => {
  return new Promise<void>((resolve) => {
    // Simulate API call
    setTimeout(() => {
      console.log(`Email sent to contact ${contactId}`);
      console.log(`Subject: ${subject}`);
      console.log(`Message: ${message}`);
      resolve();
    }, 1000);
  });
};

const Professional = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  // Mock data for demonstration
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      phone: '06 12 34 56 78',
      vehicle: 'Renault Clio',
      status: 'new',
      lastContact: '2023-11-01',
      nextFollowup: '2023-11-08'
    },
    {
      id: '2',
      name: 'Marie Martin',
      email: 'marie.martin@example.com',
      phone: '07 23 45 67 89',
      vehicle: 'Peugeot 308',
      status: 'contacted',
      lastContact: '2023-10-25',
      nextFollowup: '2023-11-05'
    },
    {
      id: '3',
      name: 'Pierre Durand',
      email: 'pierre.durand@example.com',
      phone: '06 34 56 78 90',
      vehicle: 'Citroën C3',
      status: 'followup',
      lastContact: '2023-10-30',
      nextFollowup: '2023-11-10'
    },
    {
      id: '4',
      name: 'Sophie Bernard',
      email: 'sophie.bernard@example.com',
      phone: '07 45 67 89 01',
      vehicle: 'Dacia Duster',
      status: 'closed',
      lastContact: '2023-10-20',
      nextFollowup: ''
    },
    {
      id: '5',
      name: 'Lucas Petit',
      email: 'lucas.petit@example.com',
      phone: '06 56 78 90 12',
      vehicle: 'Volkswagen Golf',
      status: 'new',
      lastContact: '2023-11-02',
      nextFollowup: '2023-11-09'
    }
  ]);

  const handleUpdateStatus = (contactId: string, newStatus: ContactStatus) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === contactId ? { ...contact, status: newStatus } : contact
      )
    );
    toast.success('Statut mis à jour');
  };

  const handleScheduleFollowup = (contactId: string, date: string) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === contactId ? { ...contact, nextFollowup: date } : contact
      )
    );
    toast.success('Relance programmée');
  };

  const handleSendEmail = async (contactId: string, subject: string, message: string) => {
    try {
      await sendEmail(contactId, subject, message);
      // Update the contact's status and last contact date
      setContacts(
        contacts.map((contact) =>
          contact.id === contactId
            ? {
                ...contact,
                status: 'contacted',
                lastContact: new Date().toISOString().split('T')[0]
              }
            : contact
        )
      );
      toast.success('Email envoyé avec succès');
    } catch (error) {
      toast.error('Erreur lors de l\'envoi de l\'email');
    }
  };

  const filteredContacts = contacts
    .filter((contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.vehicle.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((contact) => statusFilter === 'all' || contact.status === statusFilter);

  const openEmailModal = (contact: Contact) => {
    setSelectedContact(contact);
    setIsEmailModalOpen(true);
  };

  const closeEmailModal = () => {
    setIsEmailModalOpen(false);
    setSelectedContact(null);
  };

  // Dashboard stats
  const newContactsCount = contacts.filter((c) => c.status === 'new').length;
  const contactedCount = contacts.filter((c) => c.status === 'contacted').length;
  const followupCount = contacts.filter((c) => c.status === 'followup').length;
  const closedCount = contacts.filter((c) => c.status === 'closed').length;

  // Get contacts with followups due in the next 7 days
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);
  
  const upcomingFollowups = contacts
    .filter((contact) => {
      if (!contact.nextFollowup) return false;
      const followupDate = new Date(contact.nextFollowup);
      return followupDate >= today && followupDate <= nextWeek;
    })
    .sort((a, b) => new Date(a.nextFollowup).getTime() - new Date(b.nextFollowup).getTime());

  return (
    <MainLayout>
      <div className="py-8 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Espace Professionnel</h1>

            <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-8 bg-white p-1 shadow-sm">
                <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
                <TabsTrigger value="leads">Demandes récentes</TabsTrigger>
                <TabsTrigger value="followups">Relances</TabsTrigger>
                <TabsTrigger value="account">Paramètres</TabsTrigger>
              </TabsList>

              {/* Dashboard Tab */}
              <TabsContent value="dashboard">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="py-4">
                      <CardTitle className="text-sm font-medium text-gray-500">Nouveaux contacts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{newContactsCount}</div>
                      <p className="text-xs text-muted-foreground">
                        +{Math.floor(Math.random() * 10)}% depuis la semaine dernière
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="py-4">
                      <CardTitle className="text-sm font-medium text-gray-500">Contacts en cours</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{contactedCount}</div>
                      <p className="text-xs text-muted-foreground">
                        +{Math.floor(Math.random() * 10)}% depuis la semaine dernière
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="py-4">
                      <CardTitle className="text-sm font-medium text-gray-500">Relances prévues</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{followupCount}</div>
                      <p className="text-xs text-muted-foreground">
                        +{Math.floor(Math.random() * 10)}% depuis la semaine dernière
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="py-4">
                      <CardTitle className="text-sm font-medium text-gray-500">Dossiers clos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{closedCount}</div>
                      <p className="text-xs text-muted-foreground">
                        +{Math.floor(Math.random() * 10)}% depuis la semaine dernière
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <div className="grid gap-6 md:grid-cols-2 mt-6">
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>Relances à venir</CardTitle>
                      <CardDescription>Relances prévues dans les 7 prochains jours</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {upcomingFollowups.length > 0 ? (
                        <div className="space-y-4">
                          {upcomingFollowups.map((contact) => (
                            <div key={contact.id} className="flex items-center justify-between border-b pb-2">
                              <div>
                                <p className="font-medium">{contact.name}</p>
                                <p className="text-sm text-gray-500">{contact.vehicle}</p>
                              </div>
                              <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{contact.nextFollowup}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">Aucune relance prévue pour les 7 prochains jours</p>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>Actions rapides</CardTitle>
                      <CardDescription>Accès rapide aux fonctionnalités principales</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button 
                        onClick={() => setActiveTab('leads')} 
                        variant="outline" 
                        className="w-full justify-start"
                      >
                        <SearchIcon className="mr-2 h-4 w-4" />
                        Voir les demandes récentes
                      </Button>
                      <Button 
                        onClick={() => setActiveTab('followups')} 
                        variant="outline" 
                        className="w-full justify-start"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Gérer les relances
                      </Button>
                      <Button 
                        onClick={() => {}} 
                        variant="outline" 
                        className="w-full justify-start"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Envoyer un email groupé
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Leads Tab */}
              <TabsContent value="leads">
                <Card>
                  <CardHeader>
                    <CardTitle>Demandes récentes</CardTitle>
                    <CardDescription>
                      Liste des recherches de véhicules récemment publiées
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6 space-y-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative w-full sm:w-auto sm:flex-1">
                          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Rechercher par nom, email, véhicule..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <div className="flex gap-2">
                          <select
                            className="border rounded p-2 bg-white"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                          >
                            <option value="all">Tous les statuts</option>
                            <option value="new">Nouveau</option>
                            <option value="contacted">Contacté</option>
                            <option value="followup">Relance</option>
                            <option value="closed">Clôturé</option>
                          </select>
                          <Button variant="outline">
                            <Filter className="h-4 w-4 mr-2" />
                            Filtres
                          </Button>
                        </div>
                      </div>
                    </div>

                    <ContactsTable
                      contacts={filteredContacts}
                      onUpdateStatus={handleUpdateStatus}
                      onScheduleFollowup={(contactId, contact) => {
                        setSelectedContact(contact);
                        setActiveTab('followups');
                      }}
                      onSendEmail={openEmailModal}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Followups Tab */}
              <TabsContent value="followups">
                <Card>
                  <CardHeader>
                    <CardTitle>Gérer les relances</CardTitle>
                    <CardDescription>Planifiez et suivez vos relances clients</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FollowupScheduler
                      contacts={contacts}
                      selectedContact={selectedContact}
                      onSchedule={handleScheduleFollowup}
                      onSendEmail={openEmailModal}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Account Tab */}
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Paramètres du compte</CardTitle>
                    <CardDescription>Gérez les informations de votre concession</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="company">Nom de l'entreprise</Label>
                      <Input
                        id="company"
                        placeholder="Auto Expert"
                        defaultValue="Auto Expert"
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Adresse</Label>
                      <Input
                        id="address"
                        placeholder="123 rue de la Concession"
                        defaultValue="123 rue de la Concession"
                        className="bg-white"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">Ville</Label>
                        <Input
                          id="city"
                          placeholder="Paris"
                          defaultValue="Lyon"
                          className="bg-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postal">Code postal</Label>
                        <Input
                          id="postal"
                          placeholder="75000"
                          defaultValue="69000"
                          className="bg-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="contact@autoexpert.fr"
                        defaultValue="contact@autoexpert.fr"
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        placeholder="04 12 34 56 78"
                        defaultValue="04 12 34 56 78"
                        className="bg-white"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button className="car-button-gradient text-white">Enregistrer les modifications</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      {selectedContact && (
        <EmailTemplate
          contactId={selectedContact.id}
          contactName={selectedContact.name}
          contactEmail={selectedContact.email}
          isOpen={isEmailModalOpen}
          onClose={closeEmailModal}
          onSend={handleSendEmail}
        />
      )}
    </MainLayout>
  );
};

export default Professional;
