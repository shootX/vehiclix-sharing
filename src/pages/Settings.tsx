
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Settings = () => {
  return (
    <div className="space-y-6 p-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your application settings</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="api">API Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <div className="mt-4 space-y-4">
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage your application preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Application Settings</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="timezone">Default Timezone</Label>
                      <Select defaultValue="utc">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                          <SelectItem value="est">Eastern Time (GMT-5)</SelectItem>
                          <SelectItem value="pst">Pacific Time (GMT-8)</SelectItem>
                          <SelectItem value="cet">Central European (GMT+1)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="date-format">Date Format</Label>
                      <Select defaultValue="iso">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="iso">ISO (YYYY-MM-DD)</SelectItem>
                          <SelectItem value="us">US (MM/DD/YYYY)</SelectItem>
                          <SelectItem value="eu">EU (DD/MM/YYYY)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="dark-mode">Dark Mode</Label>
                        <p className="text-[0.8rem] text-muted-foreground">
                          Enable dark mode for the application
                        </p>
                      </div>
                      <Switch id="dark-mode" />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Data Display</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="items-per-page">Items Per Page</Label>
                      <Select defaultValue="10">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select number" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10 items</SelectItem>
                          <SelectItem value="25">25 items</SelectItem>
                          <SelectItem value="50">50 items</SelectItem>
                          <SelectItem value="100">100 items</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-refresh">Auto-refresh Data</Label>
                        <p className="text-[0.8rem] text-muted-foreground">
                          Automatically refresh data every 5 minutes
                        </p>
                      </div>
                      <Switch id="auto-refresh" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>API Settings</CardTitle>
                <CardDescription>Configure your API preferences and rate limits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">API Configuration</h3>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="api-key">Your API Key</Label>
                      <div className="flex gap-2">
                        <Input 
                          id="api-key" 
                          value="vehiclix_api_xxxxxxxxxxxxxxxxxxx" 
                          readOnly 
                          className="font-mono text-sm"
                        />
                        <Button variant="outline">Regenerate</Button>
                      </div>
                      <p className="text-[0.8rem] text-muted-foreground">
                        Your secret API key. Keep this secure.
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="api-version">API Version</Label>
                      <Select defaultValue="v1">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select version" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="v1">Version 1.0</SelectItem>
                          <SelectItem value="v2">Version 2.0 (Beta)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="webhook-enabled">Enable Webhooks</Label>
                        <p className="text-[0.8rem] text-muted-foreground">
                          Allow real-time updates via webhook
                        </p>
                      </div>
                      <Switch id="webhook-enabled" checked />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Rate Limiting</h3>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="rate-limit">Default Rate Limit</Label>
                      <div className="flex gap-2 items-center">
                        <Input 
                          id="rate-limit" 
                          type="number" 
                          defaultValue="1000" 
                        />
                        <span className="text-sm text-muted-foreground">requests per minute</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="throttling">Request Throttling</Label>
                        <p className="text-[0.8rem] text-muted-foreground">
                          Automatically slow down excessive requests
                        </p>
                      </div>
                      <Switch id="throttling" checked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure how you receive alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Email Notifications</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="daily-digest">Daily Digest</Label>
                        <p className="text-[0.8rem] text-muted-foreground">
                          Receive a daily summary of activity
                        </p>
                      </div>
                      <Switch id="daily-digest" checked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="expiry-alerts">Policy Expiry Alerts</Label>
                        <p className="text-[0.8rem] text-muted-foreground">
                          Get notified when policies are about to expire
                        </p>
                      </div>
                      <Switch id="expiry-alerts" checked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="api-failure">API Failure Alerts</Label>
                        <p className="text-[0.8rem] text-muted-foreground">
                          Receive notifications on API integration failures
                        </p>
                      </div>
                      <Switch id="api-failure" checked />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">In-App Notifications</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="real-time">Real-time Updates</Label>
                        <p className="text-[0.8rem] text-muted-foreground">
                          Show notifications for real-time events
                        </p>
                      </div>
                      <Switch id="real-time" checked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sound-alerts">Sound Alerts</Label>
                        <p className="text-[0.8rem] text-muted-foreground">
                          Play sound when notifications arrive
                        </p>
                      </div>
                      <Switch id="sound-alerts" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage security preferences and access controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Authentication</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                        <p className="text-[0.8rem] text-muted-foreground">
                          Require 2FA for all logins
                        </p>
                      </div>
                      <Switch id="two-factor" checked />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="session-timeout">Session Timeout</Label>
                      <Select defaultValue="60">
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeout" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Data Protection</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="audit-logging">Audit Logging</Label>
                        <p className="text-[0.8rem] text-muted-foreground">
                          Track all user actions and system changes
                        </p>
                      </div>
                      <Switch id="audit-logging" checked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="data-encryption">Data Encryption</Label>
                        <p className="text-[0.8rem] text-muted-foreground">
                          Enable end-to-end encryption for sensitive data
                        </p>
                      </div>
                      <Switch id="data-encryption" checked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Settings;
