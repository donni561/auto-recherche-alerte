
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form state
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [isProfessional, setIsProfessional] = useState(false);
  
  const handleLogin = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!loginEmail || !loginPassword) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    
    // Mock login logic - in a real app this would call an API
    toast.success('Connexion réussie!');
    
    // For demo, we'll simulate a successful login
    sessionStorage.setItem('isLoggedIn', 'true');
    
    // Redirect based on user type - for demo we'll detect professionals by email
    if (loginEmail.includes('pro') || isProfessional) {
      navigate('/professionnels');
    } else {
      navigate('/');
    }
  };
  
  const handleRegister = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!registerEmail || !registerPassword || !registerConfirmPassword || !registerName) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    if (registerPassword !== registerConfirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }
    
    // Mock registration logic
    toast.success('Compte créé avec succès!');
    
    // Switch to login tab
    setActiveTab('login');
    setLoginEmail(registerEmail);
  };

  return (
    <MainLayout>
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-car-blue text-center">
                Accès à votre compte
              </CardTitle>
              <CardDescription className="text-center">
                Connectez-vous pour accéder à votre espace personnel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Connexion</TabsTrigger>
                  <TabsTrigger value="register">Inscription</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="mt-6">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        className="bg-white"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="password">Mot de passe</Label>
                        <a href="#" className="text-sm text-car-blue hover:underline">
                          Mot de passe oublié?
                        </a>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="bg-white"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                    </div>
                    <Button 
                      type="submit"
                      className="car-button-gradient w-full text-white"
                    >
                      Se connecter
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="register" className="mt-6">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">Nom complet</Label>
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="Prénom Nom"
                        className="bg-white"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="votre@email.com"
                        className="bg-white"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-phone">Téléphone (optionnel)</Label>
                      <Input
                        id="register-phone"
                        type="tel"
                        placeholder="06 12 34 56 78"
                        className="bg-white"
                        value={registerPhone}
                        onChange={(e) => setRegisterPhone(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Mot de passe</Label>
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="••••••••"
                        className="bg-white"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-confirm-password">Confirmer le mot de passe</Label>
                      <Input
                        id="register-confirm-password"
                        type="password"
                        placeholder="••••••••"
                        className="bg-white"
                        value={registerConfirmPassword}
                        onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        id="professional"
                        type="checkbox"
                        className="rounded border-gray-300 text-car-blue focus:ring-car-blue"
                        checked={isProfessional}
                        onChange={(e) => setIsProfessional(e.target.checked)}
                      />
                      <Label htmlFor="professional" className="text-sm">
                        Je suis un professionnel de l'automobile
                      </Label>
                    </div>
                    <div className="text-xs text-gray-500">
                      En vous inscrivant, vous acceptez les conditions générales d'utilisation et notre politique de confidentialité.
                    </div>
                    <Button
                      type="submit"
                      className="car-button-gradient w-full text-white"
                    >
                      Créer mon compte
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
