import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Shield, 
  Bell, 
  Settings, 
  CreditCard, 
  Calendar, 
  UserCheck, 
  Users, 
  BookOpen,
  LogOut,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [classMode, setClassMode] = useState<'online' | 'offline'>('offline');
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPendingRequests();
    fetchSystemSettings();
  }, []);

  const fetchSystemSettings = async () => {
    const { data, error } = await supabase
      .from('system_settings')
      .select('setting_value')
      .eq('setting_key', 'class_mode')
      .single();
    
    if (data) {
      setClassMode(data.setting_value as 'online' | 'offline');
    }
  };

  const fetchPendingRequests = async () => {
    const { data, error } = await supabase
      .from('user_roles')
      .select(`
        *,
        profiles(full_name, email),
        teacher_profiles(mobile_number, grade_level, subjects),
        student_profiles(class, roll_number, section)
      `)
      .eq('status', 'pending');

    if (data) {
      setPendingRequests(data);
    }
  };

  const handleModeToggle = async (online: boolean) => {
    const newMode = online ? 'online' : 'offline';
    setClassMode(newMode);
    
    const { error } = await supabase
      .from('system_settings')
      .upsert({ 
        setting_key: 'class_mode', 
        setting_value: newMode,
        updated_by: user?.id 
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update class mode",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `Class mode switched to ${newMode}`,
      });
    }
  };

  const handleApproval = async (userId: string, approved: boolean) => {
    const status = approved ? 'approved' : 'rejected';
    
    const { error } = await supabase
      .from('user_roles')
      .update({ status })
      .eq('user_id', userId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update request status",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `Request ${status} successfully`,
      });
      fetchPendingRequests();
    }
  };

  const publishNotice = async () => {
    if (!noticeTitle || !noticeContent) {
      toast({
        title: "Error",
        description: "Please fill in both title and content",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from('notices')
      .insert([
        {
          title: noticeTitle,
          content: noticeContent,
          created_by: user?.id,
        }
      ]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to publish notice",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Notice published successfully",
      });
      setNoticeTitle('');
      setNoticeContent('');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-glassmorphism backdrop-blur-glass border-b border-border shadow-glass">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">SmartPresence Administration</p>
            </div>
          </div>
          <Button onClick={signOut} variant="outline" className="gap-2">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingRequests.length}</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Mode</CardTitle>
              {classMode === 'online' ? 
                <ToggleRight className="h-4 w-4 text-green-500" /> : 
                <ToggleLeft className="h-4 w-4 text-blue-500" />
              }
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{classMode}</div>
              <p className="text-xs text-muted-foreground">Class mode</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Teachers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Active teachers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Students</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">248</div>
              <p className="text-xs text-muted-foreground">Active students</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Publish Notice */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Publish Notice
              </CardTitle>
              <CardDescription>
                Send announcements to all users
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="noticeTitle">Title</Label>
                <Input
                  id="noticeTitle"
                  placeholder="Enter notice title"
                  value={noticeTitle}
                  onChange={(e) => setNoticeTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="noticeContent">Content</Label>
                <Textarea
                  id="noticeContent"
                  placeholder="Enter notice content"
                  value={noticeContent}
                  onChange={(e) => setNoticeContent(e.target.value)}
                  rows={4}
                />
              </div>
              <Button 
                onClick={publishNotice} 
                disabled={loading} 
                className="w-full bg-gradient-to-r from-red-500 to-orange-500"
              >
                {loading ? 'Publishing...' : 'Publish Notice'}
              </Button>
            </CardContent>
          </Card>

          {/* Switch Mode */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Class Mode Settings
              </CardTitle>
              <CardDescription>
                Toggle between online and offline classes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Online Classes</h3>
                  <p className="text-sm text-muted-foreground">Enable remote learning mode</p>
                </div>
                <Switch
                  checked={classMode === 'online'}
                  onCheckedChange={(checked) => handleModeToggle(checked)}
                />
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm">
                  <strong>Current Mode:</strong> <Badge variant="outline" className="ml-2 capitalize">{classMode}</Badge>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  This setting affects attendance marking and class scheduling for all users.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <CreditCard className="w-12 h-12 mx-auto text-green-500 mb-2" />
              <CardTitle>Payment Management</CardTitle>
              <CardDescription>
                Manage teacher salaries and student fees
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Calendar className="w-12 h-12 mx-auto text-blue-500 mb-2" />
              <CardTitle>Holiday Calendar</CardTitle>
              <CardDescription>
                Add and manage academic holidays
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <UserCheck className="w-12 h-12 mx-auto text-purple-500 mb-2" />
              <CardTitle>User Reports</CardTitle>
              <CardDescription>
                View detailed user analytics
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Pending Approvals */}
        {pendingRequests.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="w-5 h-5" />
                Pending Approvals ({pendingRequests.length})
              </CardTitle>
              <CardDescription>
                Review and approve teacher/student registrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="capitalize">
                          {request.role}
                        </Badge>
                        <h3 className="font-medium">{request.profiles?.full_name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{request.profiles?.email}</p>
                      {request.teacher_profiles && (
                        <p className="text-xs text-muted-foreground">
                          Grade: {request.teacher_profiles.grade_level} | 
                          Subjects: {request.teacher_profiles.subjects?.join(', ')}
                        </p>
                      )}
                      {request.student_profiles && (
                        <p className="text-xs text-muted-foreground">
                          Class: {request.student_profiles.class} | 
                          Roll: {request.student_profiles.roll_number} | 
                          Section: {request.student_profiles.section}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleApproval(request.user_id, false)}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleApproval(request.user_id, true)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Approve
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;