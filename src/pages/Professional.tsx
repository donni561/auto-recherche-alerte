
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';
import {
  UsersIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  BellIcon,
  CircleDotIcon,
  CircleCheckIcon,
  CalendarPlusIcon
} from "lucide-react";

import ProspectsList from '@/components/pro/ProspectsList';
import Dashboard from '@/components/pro/Dashboard';
import Settings from '@/components/pro/Settings';
import CrmSection from '@/components/pro/CrmSection';

const Professional = () => {
  const [activeTab, setActiveTab] = useState("prospects");

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen py-6">
        <div className="container mx-auto px-4">
          <Card className="p-6">
            <h1 className="text-2xl font-bold text-car-blue mb-6">Espace Professionnel</h1>
            
            <Tabs defaultValue="prospects" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="prospects" className="flex items-center gap-2">
                  <UsersIcon className="h-4 w-4" />
                  <span>Demandes</span>
                </TabsTrigger>
                <TabsTrigger value="dashboard" className="flex items-center gap-2">
                  <LayoutDashboardIcon className="h-4 w-4" />
                  <span>Tableau de bord</span>
                </TabsTrigger>
                <TabsTrigger value="crm" className="flex items-center gap-2">
                  <BellIcon className="h-4 w-4" />
                  <span>CRM</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <SettingsIcon className="h-4 w-4" />
                  <span>Paramètres</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="prospects">
                <ProspectsList />
              </TabsContent>
              
              <TabsContent value="dashboard">
                <Dashboard />
              </TabsContent>
              
              <TabsContent value="crm">
                <CrmSection />
              </TabsContent>
              
              <TabsContent value="settings">
                <Settings />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Professional;
