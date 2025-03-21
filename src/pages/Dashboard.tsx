
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@/components/ui-custom/Container';
import { Card } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui-custom/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { 
  Home, 
  Mic, 
  History, 
  Settings, 
  FileText, 
  CreditCard, 
  HelpCircle, 
  Bell, 
  LogOut,
  ChevronRight,
  CloudUpload,
  PlayCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/Footer';

// Mock data for charts
const usageData = [
  { name: 'Mon', characters: 1200 },
  { name: 'Tue', characters: 1900 },
  { name: 'Wed', characters: 800 },
  { name: 'Thu', characters: 1600 },
  { name: 'Fri', characters: 2100 },
  { name: 'Sat', characters: 1000 },
  { name: 'Sun', characters: 500 },
];

const historyData = [
  { id: 1, text: "Welcome to Duplicate", date: "Today, 10:30 AM", duration: "00:32", status: "Completed" },
  { id: 2, text: "Product announcement for Q2", date: "Yesterday, 3:45 PM", duration: "01:15", status: "Completed" },
  { id: 3, text: "Meeting notes summary", date: "May 23, 2:20 PM", duration: "00:48", status: "Processing" },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
      duration: 3000,
    });
    
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Dashboard Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <Container className="flex justify-between items-center">
          <div className="flex items-center space-x-2 text-primary font-display font-bold">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="currentColor" />
              </svg>
            </div>
            <span>Duplicate</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-primary">
              <Bell size={20} />
            </button>
            <button 
              className="p-2 text-gray-500 hover:text-primary"
              onClick={handleLogout}
            >
              <LogOut size={20} />
            </button>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                U
              </div>
              <span className="font-medium">User</span>
            </div>
          </div>
        </Container>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
          <div className="p-4">
            <nav className="space-y-1">
              <button 
                className={`flex items-center space-x-3 w-full p-3 rounded-md ${activeTab === 'home' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('home')}
              >
                <Home size={18} />
                <span>Home</span>
              </button>
              <button 
                className={`flex items-center space-x-3 w-full p-3 rounded-md ${activeTab === 'voices' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('voices')}
              >
                <Mic size={18} />
                <span>Voices</span>
              </button>
              <button 
                className={`flex items-center space-x-3 w-full p-3 rounded-md ${activeTab === 'history' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('history')}
              >
                <History size={18} />
                <span>History</span>
              </button>
              <button 
                className={`flex items-center space-x-3 w-full p-3 rounded-md ${activeTab === 'documents' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('documents')}
              >
                <FileText size={18} />
                <span>Documents</span>
              </button>
              
              <div className="pt-4 mt-4 border-t border-gray-200">
                <button 
                  className={`flex items-center space-x-3 w-full p-3 rounded-md ${activeTab === 'billing' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
                  onClick={() => setActiveTab('billing')}
                >
                  <CreditCard size={18} />
                  <span>Billing</span>
                </button>
                <button 
                  className={`flex items-center space-x-3 w-full p-3 rounded-md ${activeTab === 'settings' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </button>
                <button 
                  className={`flex items-center space-x-3 w-full p-3 rounded-md ${activeTab === 'help' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
                  onClick={() => setActiveTab('help')}
                >
                  <HelpCircle size={18} />
                  <span>Help</span>
                </button>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          <Container>
            <Tabs defaultValue="overview" className="w-full">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="usage">Usage</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="overview">
                {/* Welcome and summary */}
                <Card className="mb-6">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2">Welcome back!</h2>
                    <p className="text-gray-600 mb-4">Here's a summary of your voice duplication activity.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="bg-primary/5 rounded-lg p-4">
                        <div className="font-medium text-gray-500">Characters Used</div>
                        <div className="text-2xl font-bold">8,120 / 10,000</div>
                        <div className="mt-2 h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-primary rounded-full" style={{ width: '81%' }}></div>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="font-medium text-gray-500">Active Voices</div>
                        <div className="text-2xl font-bold">3</div>
                      </div>
                      
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="font-medium text-gray-500">Recent Generations</div>
                        <div className="text-2xl font-bold">12</div>
                      </div>
                    </div>
                  </div>
                </Card>
                
                {/* Quick actions */}
                <Card className="mb-6">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="mr-4 h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                          <Mic size={20} />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Create New Voice</div>
                          <div className="text-sm text-gray-500">Clone your voice in minutes</div>
                        </div>
                        <ChevronRight className="ml-auto" size={18} />
                      </button>
                      
                      <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="mr-4 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                          <CloudUpload size={20} />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Upload Text</div>
                          <div className="text-sm text-gray-500">Convert text to speech</div>
                        </div>
                        <ChevronRight className="ml-auto" size={18} />
                      </button>
                    </div>
                  </div>
                </Card>
                
                {/* Recent activity */}
                <Card>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                    
                    <div className="overflow-hidden rounded-lg border border-gray-200">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Text</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {historyData.map((item) => (
                            <tr key={item.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.text}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.duration}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  item.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {item.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button className="text-primary hover:text-primary/80">
                                  <PlayCircle size={18} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="usage">
                <Card className="mb-6">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Character Usage</h2>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={usageData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="characters" fill="#8884d8" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </Card>
                
                <Card>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Usage Breakdown</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-700">Speech Generation</span>
                          <span className="text-gray-500">5,340 characters</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-blue-500 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-700">Voice Cloning</span>
                          <span className="text-gray-500">2,780 characters</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-purple-500 rounded-full" style={{ width: '35%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="activity">
                <Card>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Activity Timeline</h2>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={usageData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="characters" stroke="#8884d8" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </Container>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
