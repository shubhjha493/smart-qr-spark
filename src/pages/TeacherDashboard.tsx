import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  GraduationCap, 
  QrCode, 
  Calendar, 
  FileText, 
  BarChart3, 
  Bell,
  LogOut,
  Clock,
  Users,
  CheckCircle,
  BookOpen
} from 'lucide-react';
import { Label } from '@/components/ui/label';

const TeacherDashboard = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [notices, setNotices] = useState<any[]>([]);
  const [teacherProfile, setTeacherProfile] = useState<any>(null);

  useEffect(() => {
    // Set dummy data
    setNotices(dummyNotices);
    setTeacherProfile(dummyProfile);
  }, []);

  // Dummy data for demo
  const dummyNotices = [
    { id: 1, title: "Admin published exam schedule", content: "Mid-term exams start from Oct 15th", created_at: new Date().toISOString() },
    { id: 2, title: "Extra class tomorrow at 3 PM", content: "Additional Physics class scheduled", created_at: new Date().toISOString() },
    { id: 3, title: "Holiday on Friday", content: "School closed for Diwali celebration", created_at: new Date().toISOString() }
  ];

  const dummyProfile = {
    full_name: "Dr. Johnson Smith",
    grade_level: "Secondary",
    subjects: ["Mathematics", "Physics"],
    leave_balance: 15
  };

  useEffect(() => {
    // Set dummy data
    setNotices(dummyNotices);
    setTeacherProfile(dummyProfile);
  }, []);

  const markAttendance = () => {
    toast({
      title: "Attendance Feature",
      description: "QR-based attendance marking will be available soon!",
    });
  };

  const requestLeave = () => {
    toast({
      title: "Leave Request",
      description: "Leave request system coming soon!",
    });
  };

  // Mock data for today's classes
  const todaysClasses = [
    { time: "09:00 AM", subject: "Mathematics", class: "10-A", room: "Room 101" },
    { time: "11:00 AM", subject: "Physics", class: "11-B", room: "Room 203" },
    { time: "02:00 PM", subject: "Mathematics", class: "9-C", room: "Room 105" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-glassmorphism backdrop-blur-glass border-b border-border shadow-glass">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {teacherProfile?.full_name || 'Teacher'}</p>
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
              <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todaysClasses.length}</div>
              <p className="text-xs text-muted-foreground">Scheduled for today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subjects</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teacherProfile?.subjects?.length || 0}</div>
              <p className="text-xs text-muted-foreground">Teaching subjects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87</div>
              <p className="text-xs text-muted-foreground">Total students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={markAttendance}>
            <CardHeader className="text-center">
              <QrCode className="w-12 h-12 mx-auto text-blue-500 mb-2" />
              <CardTitle>QR Attendance</CardTitle>
              <CardDescription>
                Scan QR code to mark attendance quickly
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => toast({ title: "Student Reports", description: "Detailed attendance analytics coming soon!" })}>
            <CardHeader className="text-center">
              <BarChart3 className="w-12 h-12 mx-auto text-green-500 mb-2" />
              <CardTitle>Student Reports</CardTitle>
              <CardDescription>
                Daily, weekly, and monthly attendance reports
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={requestLeave}>
            <CardHeader className="text-center">
              <FileText className="w-12 h-12 mx-auto text-orange-500 mb-2" />
              <CardTitle>Request Leave</CardTitle>
              <CardDescription>
                Submit leave requests for approval
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => toast({ title: "Class Management", description: "Advanced class management tools coming soon!" })}>
            <CardHeader className="text-center">
              <Users className="w-12 h-12 mx-auto text-purple-500 mb-2" />
              <CardTitle>Class Management</CardTitle>
              <CardDescription>
                Manage your classes and student groups
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Today's Schedule
            </CardTitle>
            <CardDescription>
              Your classes for today, {new Date().toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaysClasses.map((classItem, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="font-semibold">{classItem.time}</div>
                    </div>
                    <div>
                      <h3 className="font-medium">{classItem.subject}</h3>
                      <p className="text-sm text-muted-foreground">
                        Class {classItem.class} • {classItem.room}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Mark Attendance
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Recent Notifications
            </CardTitle>
            <CardDescription>
              Latest announcements and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notices.length > 0 ? (
                notices.map((notice) => (
                  <div key={notice.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium">{notice.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notice.content}
                        </p>
                      </div>
                      <Badge variant="outline">
                        {new Date(notice.created_at).toLocaleDateString()}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No notifications yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Teacher Profile Info */}
        {teacherProfile && (
          <Card>
            <CardHeader>
              <CardTitle>Your Teaching Profile</CardTitle>
              <CardDescription>Your assigned subjects and performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label className="text-sm font-medium">Grade Level</Label>
                  <Badge variant="outline" className="mt-1">
                    {teacherProfile.grade_level}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Classes Today</Label>
                  <Badge variant="outline" className="mt-1">
                    {todaysClasses.length}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Attendance Rate</Label>
                  <Badge variant="outline" className="mt-1 text-green-600">
                    92%
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Leave Balance</Label>
                  <Badge variant="outline" className="mt-1">
                    12 days
                  </Badge>
                </div>
              </div>
              <div className="mt-4">
                <Label className="text-sm font-medium">Subjects</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {teacherProfile.subjects?.map((subject: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>This Week Overview</CardTitle>
            <CardDescription>Your teaching statistics for the current week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">18</div>
                <div className="text-sm text-blue-600">Classes Taught</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">156</div>
                <div className="text-sm text-green-600">Students Present</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">12</div>
                <div className="text-sm text-orange-600">Assignments Given</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">94%</div>
                <div className="text-sm text-purple-600">Avg Attendance</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;