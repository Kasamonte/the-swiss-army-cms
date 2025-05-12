
import React, { useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const SettingsPanel = () => {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'My CMS Website',
    siteDescription: 'A modern content management system',
    adminEmail: 'admin@example.com',
    postsPerPage: '10',
  });

  const [seoSettings, setSeoSettings] = useState({
    metaTitle: 'My CMS Website | Modern Content Management',
    metaDescription: 'A powerful, easy-to-use content management system for your website.',
    enableSitemap: true,
    enableRobots: true,
  });

  const [apiSettings, setApiSettings] = useState({
    enableApi: true,
    apiKey: 'sk_test_4eC39HqLyjWDarjtT1zdp7dc',
  });

  const { toast } = useToast();

  const handleSaveGeneral = () => {
    toast({
      title: "Settings Saved",
      description: "General settings have been updated successfully."
    });
  };

  const handleSaveSeo = () => {
    toast({
      title: "Settings Saved",
      description: "SEO settings have been updated successfully."
    });
  };

  const handleSaveApi = () => {
    toast({
      title: "Settings Saved",
      description: "API settings have been updated successfully."
    });
  };

  const regenerateApiKey = () => {
    const newApiKey = 'sk_test_' + Math.random().toString(36).substring(2, 15);
    setApiSettings({
      ...apiSettings,
      apiKey: newApiKey,
    });
    
    toast({
      title: "API Key Regenerated",
      description: "A new API key has been generated."
    });
  };

  return (
    <>
      <PageHeader 
        title="Settings" 
        description="Configure your CMS and website settings."
      />
      
      <Tabs defaultValue="general" className="w-full animate-fade-in">
        <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="api">API & Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure the basic information for your website.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-3">
                <Label htmlFor="site-name">Site Name</Label>
                <Input
                  id="site-name"
                  value={generalSettings.siteName}
                  onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                />
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="site-description">Site Description</Label>
                <Textarea
                  id="site-description"
                  value={generalSettings.siteDescription}
                  onChange={(e) => setGeneralSettings({...generalSettings, siteDescription: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="admin-email">Admin Email</Label>
                <Input
                  id="admin-email"
                  type="email"
                  value={generalSettings.adminEmail}
                  onChange={(e) => setGeneralSettings({...generalSettings, adminEmail: e.target.value})}
                />
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="posts-per-page">Posts Per Page</Label>
                <Input
                  id="posts-per-page"
                  type="number"
                  value={generalSettings.postsPerPage}
                  onChange={(e) => setGeneralSettings({...generalSettings, postsPerPage: e.target.value})}
                />
              </div>
              
              <Button onClick={handleSaveGeneral}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="seo" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>
                Configure search engine optimization settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-3">
                <Label htmlFor="meta-title">Default Meta Title</Label>
                <Input
                  id="meta-title"
                  value={seoSettings.metaTitle}
                  onChange={(e) => setSeoSettings({...seoSettings, metaTitle: e.target.value})}
                />
                <p className="text-sm text-muted-foreground">
                  Recommended: 50-60 characters
                </p>
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="meta-description">Default Meta Description</Label>
                <Textarea
                  id="meta-description"
                  value={seoSettings.metaDescription}
                  onChange={(e) => setSeoSettings({...seoSettings, metaDescription: e.target.value})}
                  rows={3}
                />
                <p className="text-sm text-muted-foreground">
                  Recommended: 150-160 characters
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex flex-row items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Generate Sitemap</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically create sitemap.xml
                    </p>
                  </div>
                  <Switch
                    checked={seoSettings.enableSitemap}
                    onCheckedChange={(checked) => 
                      setSeoSettings({...seoSettings, enableSitemap: checked})
                    }
                  />
                </div>
                
                <div className="flex flex-row items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Generate robots.txt</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically create robots.txt
                    </p>
                  </div>
                  <Switch
                    checked={seoSettings.enableRobots}
                    onCheckedChange={(checked) => 
                      setSeoSettings({...seoSettings, enableRobots: checked})
                    }
                  />
                </div>
              </div>
              
              <Button onClick={handleSaveSeo}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>API & Integrations</CardTitle>
              <CardDescription>
                Manage API access and third-party integrations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-row items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable API Access</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow external applications to access your CMS via API
                  </p>
                </div>
                <Switch
                  checked={apiSettings.enableApi}
                  onCheckedChange={(checked) => 
                    setApiSettings({...apiSettings, enableApi: checked})
                  }
                />
              </div>
              
              <Separator />
              
              <div className="grid gap-3">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="api-key"
                    value={apiSettings.apiKey}
                    readOnly
                    className="font-mono"
                  />
                  <Button variant="outline" onClick={regenerateApiKey}>
                    Regenerate
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  This key grants full access to your API. Keep it secure.
                </p>
              </div>
              
              <Button onClick={handleSaveApi}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default SettingsPanel;
