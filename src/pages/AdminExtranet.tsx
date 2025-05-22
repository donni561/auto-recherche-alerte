
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'professional' | 'admin';
  verified: boolean;
  createdAt: Date;
}

interface EmailSettings {
  fromName: string;
  fromEmail: string;
  confirmationSubject: string;
  welcomeSubject: string;
  smtpServer: string;
  smtpPort: string;
  smtpUsername: string;
  smtpPassword: string;
}

const AdminExtranet = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');
  
  // Utilisateurs simulés
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Guillaume Peycli',
      email: 'guillaume.peycli@gmail.com',
      role: 'professional',
      verified: true,
      createdAt: new Date(2023, 2, 15)
    },
    {
      id: '2',
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      role: 'user',
      verified: true,
      createdAt: new Date(2023, 4, 10)
    },
    {
      id: '3',
      name: 'Marie Martin',
      email: 'marie.martin@example.com',
      role: 'user',
      verified: false,
      createdAt: new Date(2023, 5, 22)
    },
    {
      id: '4',
      name: 'Admin Test',
      email: 'admin@autosearch.fr',
      role: 'admin',
      verified: true,
      createdAt: new Date(2023, 1, 1)
    }
  ]);
  
  // Formulaire pour créer un nouvel utilisateur pro
  const [newProName, setNewProName] = useState('');
  const [newProEmail, setNewProEmail] = useState('');
  const [newProPassword, setNewProPassword] = useState('');
  
  // Paramètres email
  const [emailSettings, setEmailSettings] = useState<EmailSettings>({
    fromName: 'AutoSearch',
    fromEmail: 'noreply@carsearch.live',
    confirmationSubject: 'Confirmez votre adresse email - AutoSearch',
    welcomeSubject: 'Bienvenue sur AutoSearch !',
    smtpServer: 'smtp.hostinger.fr',
    smtpPort: '587',
    smtpUsername: 'noreply@carsearch.live',
    smtpPassword: '********'
  });
  
  // Vérifier si l'utilisateur est connecté en tant qu'admin
  React.useEffect(() => {
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      toast.error('Accès non autorisé');
      navigate('/connexion');
    }
  }, [navigate]);
  
  const handleCreatePro = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation de base
    if (!newProName || !newProEmail || !newProPassword) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    
    // Création d'un nouvel utilisateur professionnel
    const newUser: User = {
      id: (users.length + 1).toString(),
      name: newProName,
      email: newProEmail,
      role: 'professional',
      verified: true, // Les pros sont automatiquement vérifiés
      createdAt: new Date()
    };
    
    setUsers([...users, newUser]);
    
    // Notification de succès
    toast.success(`Compte professionnel créé pour ${newProName}`);
    
    // Réinitialiser le formulaire
    setNewProName('');
    setNewProEmail('');
    setNewProPassword('');
  };
  
  const handleVerifyUser = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, verified: true } : user
    ));
    
    const userName = users.find(user => user.id === userId)?.name;
    toast.success(`L'utilisateur ${userName} a été vérifié`);
  };
  
  const handleDeleteUser = (userId: string) => {
    const userToDelete = users.find(user => user.id === userId);
    
    if (userToDelete && userToDelete.role === 'admin') {
      toast.error('Impossible de supprimer un compte administrateur');
      return;
    }
    
    setUsers(users.filter(user => user.id !== userId));
    toast.success('Utilisateur supprimé avec succès');
  };
  
  const handleSaveEmailSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Paramètres email enregistrés');
  };
  
  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Card>
            <CardHeader className="border-b">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl font-bold text-car-blue">
                    AutoSearch Extranet
                  </CardTitle>
                  <CardDescription>
                    Administration du site et gestion des utilisateurs
                  </CardDescription>
                </div>
                <Button 
                  onClick={() => {
                    sessionStorage.removeItem('isAdmin');
                    navigate('/connexion');
                  }}
                  variant="outline"
                >
                  Déconnexion
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="pt-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="users">Utilisateurs</TabsTrigger>
                  <TabsTrigger value="pros">Professionnels</TabsTrigger>
                  <TabsTrigger value="emails">Emails</TabsTrigger>
                  <TabsTrigger value="stats">Statistiques</TabsTrigger>
                </TabsList>
                
                <TabsContent value="users">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-medium">Liste des utilisateurs</h2>
                      <div className="flex gap-2">
                        <Input placeholder="Rechercher..." className="w-64" />
                        <Button>Rechercher</Button>
                      </div>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nom</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Rôle</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Date d'inscription</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map(user => (
                          <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              {user.role === 'admin' && <Badge className="bg-red-500">Admin</Badge>}
                              {user.role === 'professional' && <Badge className="bg-blue-500">Pro</Badge>}
                              {user.role === 'user' && <Badge>Utilisateur</Badge>}
                            </TableCell>
                            <TableCell>
                              {user.verified ? 
                                <Badge className="bg-green-500">Vérifié</Badge> : 
                                <Badge className="bg-yellow-500">En attente</Badge>
                              }
                            </TableCell>
                            <TableCell>{user.createdAt.toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                              {!user.verified && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="mr-2"
                                  onClick={() => handleVerifyUser(user.id)}
                                >
                                  Vérifier
                                </Button>
                              )}
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-red-500 hover:bg-red-50"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                Supprimer
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="pros">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h2 className="text-lg font-medium mb-4">Créer un compte professionnel</h2>
                      <form onSubmit={handleCreatePro} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="pro-name">Nom complet</Label>
                          <Input 
                            id="pro-name" 
                            value={newProName}
                            onChange={e => setNewProName(e.target.value)}
                            placeholder="Nom du professionnel"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pro-email">Email</Label>
                          <Input 
                            id="pro-email" 
                            type="email"
                            value={newProEmail}
                            onChange={e => setNewProEmail(e.target.value)}
                            placeholder="email@exemple.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pro-password">Mot de passe</Label>
                          <Input 
                            id="pro-password" 
                            type="password"
                            value={newProPassword}
                            onChange={e => setNewProPassword(e.target.value)}
                            placeholder="Mot de passe"
                          />
                        </div>
                        <Button type="submit" className="car-button-gradient text-white">
                          Créer le compte
                        </Button>
                      </form>
                    </div>
                    
                    <div>
                      <h2 className="text-lg font-medium mb-4">Professionnels inscrits</h2>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nom</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users
                            .filter(user => user.role === 'professional')
                            .map(pro => (
                              <TableRow key={pro.id}>
                                <TableCell>{pro.name}</TableCell>
                                <TableCell>{pro.email}</TableCell>
                                <TableCell className="text-right">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="mr-2"
                                  >
                                    Éditer
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="text-red-500 hover:bg-red-50"
                                    onClick={() => handleDeleteUser(pro.id)}
                                  >
                                    Supprimer
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="emails">
                  <div className="space-y-6">
                    <h2 className="text-lg font-medium">Configuration des emails</h2>
                    <p className="text-sm text-gray-500">
                      Configurez les paramètres d'envoi d'emails automatiques pour la confirmation d'inscription, 
                      les notifications et les communications avec les utilisateurs.
                    </p>
                    
                    <form onSubmit={handleSaveEmailSettings} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="from-name">Nom d'expéditeur</Label>
                          <Input 
                            id="from-name"
                            value={emailSettings.fromName}
                            onChange={e => setEmailSettings({...emailSettings, fromName: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="from-email">Email d'expéditeur</Label>
                          <Input 
                            id="from-email"
                            type="email"
                            value={emailSettings.fromEmail}
                            onChange={e => setEmailSettings({...emailSettings, fromEmail: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="confirm-subject">Objet email de confirmation</Label>
                          <Input 
                            id="confirm-subject"
                            value={emailSettings.confirmationSubject}
                            onChange={e => setEmailSettings({...emailSettings, confirmationSubject: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="welcome-subject">Objet email de bienvenue</Label>
                          <Input 
                            id="welcome-subject"
                            value={emailSettings.welcomeSubject}
                            onChange={e => setEmailSettings({...emailSettings, welcomeSubject: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Paramètres SMTP</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="smtp-server">Serveur SMTP</Label>
                            <Input 
                              id="smtp-server"
                              value={emailSettings.smtpServer}
                              onChange={e => setEmailSettings({...emailSettings, smtpServer: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="smtp-port">Port SMTP</Label>
                            <Input 
                              id="smtp-port"
                              value={emailSettings.smtpPort}
                              onChange={e => setEmailSettings({...emailSettings, smtpPort: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="smtp-username">Utilisateur SMTP</Label>
                            <Input 
                              id="smtp-username"
                              value={emailSettings.smtpUsername}
                              onChange={e => setEmailSettings({...emailSettings, smtpUsername: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="smtp-password">Mot de passe SMTP</Label>
                            <Input 
                              id="smtp-password"
                              type="password"
                              value={emailSettings.smtpPassword}
                              onChange={e => setEmailSettings({...emailSettings, smtpPassword: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <Button type="submit" className="car-button-gradient text-white">
                        Enregistrer les paramètres
                      </Button>
                    </form>
                  </div>
                </TabsContent>
                
                <TabsContent value="stats">
                  <div className="space-y-6">
                    <h2 className="text-lg font-medium">Statistiques du site</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card>
                        <CardContent className="p-6">
                          <p className="text-sm text-gray-500">Utilisateurs inscrits</p>
                          <p className="text-3xl font-bold">{users.filter(u => u.role === 'user').length}</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-6">
                          <p className="text-sm text-gray-500">Professionnels</p>
                          <p className="text-3xl font-bold">{users.filter(u => u.role === 'professional').length}</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-6">
                          <p className="text-sm text-gray-500">Recherches postées</p>
                          <p className="text-3xl font-bold">28</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-6">
                          <p className="text-sm text-gray-500">Ventes réalisées</p>
                          <p className="text-3xl font-bold">12</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminExtranet;
