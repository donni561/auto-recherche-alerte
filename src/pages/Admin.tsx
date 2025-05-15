
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { PlusIcon, XIcon, CheckIcon, UserIcon } from 'lucide-react';

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');
  
  // Mock users data
  const [users, setUsers] = useState([
    { id: 1, name: 'Guillaume Peycli', email: 'guillaume.peycli@gmail.com', role: 'professional', verified: true },
    { id: 2, name: 'Jean Dupont', email: 'jean.dupont@example.com', role: 'user', verified: true },
    { id: 3, name: 'Marie Martin', email: 'marie.martin@example.com', role: 'user', verified: false },
    { id: 4, name: 'Auto Excellence', email: 'contact@autoexcellence.fr', role: 'professional', verified: true }
  ]);
  
  // Form state for new professional
  const [newProName, setNewProName] = useState('');
  const [newProEmail, setNewProEmail] = useState('');
  const [newProPassword, setNewProPassword] = useState('');
  
  useEffect(() => {
    // Check if user is admin
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      navigate('/connexion');
    }
  }, [navigate]);
  
  const handleAddProfessional = (e) => {
    e.preventDefault();
    
    if (!newProName || !newProEmail || !newProPassword) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    
    // Add new professional to the list
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    setUsers([...users, {
      id: newId,
      name: newProName,
      email: newProEmail,
      role: 'professional',
      verified: true
    }]);
    
    toast.success('Compte professionnel créé avec succès');
    
    // Reset form
    setNewProName('');
    setNewProEmail('');
    setNewProPassword('');
  };
  
  const handleVerifyUser = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, verified: true } : user
    ));
    toast.success('Utilisateur vérifié avec succès');
  };
  
  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
    toast.success('Utilisateur supprimé avec succès');
  };
  
  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('isAdmin');
    navigate('/connexion');
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-car-blue">AutoSearch Extranet</h1>
          <Button variant="outline" onClick={handleLogout}>Déconnexion</Button>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-car-blue">Administration</CardTitle>
            <CardDescription>
              Gérez les utilisateurs et les professionnels de la plateforme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="users">Utilisateurs</TabsTrigger>
                <TabsTrigger value="professionals">Professionnels</TabsTrigger>
                <TabsTrigger value="stats">Statistiques</TabsTrigger>
              </TabsList>
              
              <TabsContent value="users">
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold">Liste des utilisateurs</h2>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Rôle</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map(user => (
                        <TableRow key={user.id}>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            {user.role === 'professional' ? (
                              <Badge className="bg-car-blue">Professionnel</Badge>
                            ) : (
                              <Badge variant="outline">Utilisateur</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {user.verified ? (
                              <Badge className="bg-green-500">Vérifié</Badge>
                            ) : (
                              <Badge variant="secondary">En attente</Badge>
                            )}
                          </TableCell>
                          <TableCell className="space-x-2">
                            {!user.verified && (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-8 w-8 p-0" 
                                onClick={() => handleVerifyUser(user.id)}
                              >
                                <CheckIcon className="h-4 w-4" />
                              </Button>
                            )}
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-600" 
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <XIcon className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="professionals">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold mb-4">Ajouter un professionnel</h2>
                    <form onSubmit={handleAddProfessional} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nom de la concession</Label>
                          <Input 
                            id="name" 
                            value={newProName} 
                            onChange={e => setNewProName(e.target.value)} 
                            placeholder="Auto Excellence"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={newProEmail} 
                            onChange={e => setNewProEmail(e.target.value)} 
                            placeholder="contact@autoexcellence.fr"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Mot de passe</Label>
                          <Input 
                            id="password" 
                            type="password" 
                            value={newProPassword} 
                            onChange={e => setNewProPassword(e.target.value)}
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                      <Button type="submit" className="car-button-gradient text-white">
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Ajouter un professionnel
                      </Button>
                    </form>
                  </div>
                  
                  <div>
                    <h2 className="text-lg font-semibold mb-4">Liste des professionnels</h2>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nom</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users
                          .filter(user => user.role === 'professional')
                          .map(pro => (
                          <TableRow key={pro.id}>
                            <TableCell>{pro.name}</TableCell>
                            <TableCell>{pro.email}</TableCell>
                            <TableCell>
                              {pro.verified ? (
                                <Badge className="bg-green-500">Vérifié</Badge>
                              ) : (
                                <Badge variant="secondary">En attente</Badge>
                              )}
                            </TableCell>
                            <TableCell className="space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-600" 
                                onClick={() => handleDeleteUser(pro.id)}
                              >
                                <XIcon className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="stats">
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold mb-4">Statistiques de la plateforme</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{users.filter(u => u.role === 'user').length}</div>
                        <p className="text-xs text-muted-foreground">Utilisateurs inscrits</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Professionnels</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{users.filter(u => u.role === 'professional').length}</div>
                        <p className="text-xs text-muted-foreground">Concessionnaires partenaires</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Validation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{users.filter(u => !u.verified).length}</div>
                        <p className="text-xs text-muted-foreground">Utilisateurs à valider</p>
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
  );
};

export default Admin;
