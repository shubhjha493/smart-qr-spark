import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  CreditCard, 
  Bell,
  BarChart3,
  LogOut,
  Clock,
  CheckCircle,
  AlertCircle,
  PieChart,
  Scan,
  QrCode
} from 'lucide-react';
import { Label } from '@/components/ui/label';

const StudentDashboard = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [notices, setNotices] = useState<any[]>([]);
  const [studentProfile, setStudentProfile] = useState<any>(null);

  useEffect(() => {
    // Set dummy data
    setNotices(dummyNotices);
    setStudentProfile(dummyProfile);
  }, []);

  // Dummy data for demo
  const dummyNotices = [
    { id: 1, title: "Extra class tomorrow at 3 PM", content: "Additional Physics class scheduled", created_at: new Date().toISOString() },
    { id: 2, title: "Fee payment reminder", content: "Exam fees due by Oct 15th", created_at: new Date().toISOString() },
    { id: 3, title: "Holiday announcement", content: "School closed for Diwali on Oct 12th", created_at: new Date().toISOString() }
  ];

  const dummyProfile = {
    full_name: "Alex Johnson",
    class: "10",
    roll_number: "25",
    section: "A"
  };

  useEffect(() => {
    // Set dummy data
    setNotices(dummyNotices);
    setStudentProfile(dummyProfile);
  }, []);

  const applyForLeave = () => {
    toast({
      title: "Leave Application",
      description: "Leave application system coming soon!",
    });
  };

  const registerComplaint = () => {
    toast({
      title: "Complaint System",
      description: "Complaint registration system coming soon!",
    });
  };

  const payFees = () => {
    toast({
      title: "Fee Payment",
      description: "Online fee payment system coming soon!",
    });
  };

  const faceScan = () => {
    toast({
      title: "Face Scan",
      description: "Face recognition attendance system coming soon!",
    });
  };

  const qrScan = () => {
    toast({
      title: "QR Scan",
      description: "QR code attendance system coming soon!",
    });
  };

  // Mock data for today's classes
  const todaysClasses = [
    { time: "09:00 AM", subject: "Mathematics", teacher: "Mr. Smith", room: "Room 101" },
    { time: "10:30 AM", subject: "Physics", teacher: "Dr. Johnson", room: "Room 203" },
    { time: "12:00 PM", subject: "English", teacher: "Ms. Brown", room: "Room 105" },
    { time: "02:00 PM", subject: "Chemistry", teacher: "Prof. Wilson", room: "Room 301" },
  ];

  // Mock attendance data
  const attendanceData = {
    present: 18,
    absent: 2,
    total: 20,
    percentage: 90
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-glassmorphism backdrop-blur-glass border-b border-border shadow-glass">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Student Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {studentProfile?.full_name || 'Student'}
              </p>
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
              <CardTitle className="text-sm font-medium">Attendance</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceData.percentage}%</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Present Days</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceData.present}</div>
              <p className="text-xs text-muted-foreground">Out of {attendanceData.total} days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Notifications</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notices.length}</div>
              <p className="text-xs text-muted-foreground">Unread notices</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={applyForLeave}>
            <CardHeader className="text-center">
              <FileText className="w-12 h-12 mx-auto text-blue-500 mb-2" />
              <CardTitle>Apply for Leave</CardTitle>
              <CardDescription>
                Submit leave applications quickly
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={registerComplaint}>
            <CardHeader className="text-center">
              <AlertCircle className="w-12 h-12 mx-auto text-orange-500 mb-2" />
              <CardTitle>Register Complaint</CardTitle>
              <CardDescription>
                Report issues or concerns
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={payFees}>
            <CardHeader className="text-center">
              <CreditCard className="w-12 h-12 mx-auto text-green-500 mb-2" />
              <CardTitle>Pay Fees Online</CardTitle>
              <CardDescription>
                Secure online fee payments
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={qrScan}>
            <CardHeader className="text-center">
              <QrCode className="w-12 h-12 mx-auto text-indigo-500 mb-2" />
              <CardTitle>QR Scan</CardTitle>
              <CardDescription>
                Mark attendance with QR code
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={faceScan}>
            <CardHeader className="text-center">
              <Scan className="w-12 h-12 mx-auto text-cyan-500 mb-2" />
              <CardTitle>Face Scan</CardTitle>
              <CardDescription>
                Mark attendance with face scan
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => toast({ title: "Academic Progress", description: "Detailed academic reports coming soon!" })}>
            <CardHeader className="text-center">
              <PieChart className="w-12 h-12 mx-auto text-purple-500 mb-2" />
              <CardTitle>Academic Progress</CardTitle>
              <CardDescription>
                View grades and performance
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Attendance Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Attendance Overview
            </CardTitle>
            <CardDescription>
              Your attendance record for this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Monthly Attendance</span>
                <span className="text-sm text-muted-foreground">
                  {attendanceData.present}/{attendanceData.total} days
                </span>
              </div>
              <Progress value={attendanceData.percentage} className="h-3" />
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{attendanceData.present}</div>
                  <div className="text-sm text-green-600">Present</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{attendanceData.absent}</div>
                  <div className="text-sm text-red-600">Absent</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{attendanceData.percentage}%</div>
                  <div className="text-sm text-blue-600">Rate</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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
                        {classItem.teacher} • {classItem.room}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">Scheduled</Badge>
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

        {/* Student Profile Info & Academic Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {studentProfile && (
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>Student information and academic details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Class</Label>
                    <Badge variant="outline" className="mt-1">
                      {studentProfile.class}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Roll Number</Label>
                    <Badge variant="outline" className="mt-1">
                      {studentProfile.roll_number}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Section</Label>
                    <Badge variant="outline" className="mt-1">
                      {studentProfile.section}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Academic Performance</CardTitle>
              <CardDescription>Your current semester overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">A-</div>
                  <div className="text-sm text-green-600">Overall Grade</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">7th</div>
                  <div className="text-sm text-blue-600">Class Rank</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">86%</div>
                  <div className="text-sm text-purple-600">Test Average</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">12</div>
                  <div className="text-sm text-orange-600">Assignments</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fee Status & Important Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Fee Status</CardTitle>
              <CardDescription>Your current fee payment status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium">Tuition Fee</span>
                  <Badge variant="outline" className="text-green-600">Paid</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="text-sm font-medium">Exam Fee</span>
                  <Badge variant="outline" className="text-yellow-600">Due Oct 15</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium">Library Fee</span>
                  <Badge variant="outline" className="text-blue-600">Paid</Badge>
                </div>
                <div className="text-center pt-2">
                  <span className="text-sm text-muted-foreground">Outstanding: </span>
                  <span className="font-bold text-orange-600">₹2,500</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Important Dates</CardTitle>
              <CardDescription>Upcoming events and deadlines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium text-sm">Mid-term Exams</p>
                    <p className="text-xs text-muted-foreground">Oct 15 - Oct 25</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <FileText className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium text-sm">Project Submission</p>
                    <p className="text-xs text-muted-foreground">Oct 30</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <CreditCard className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="font-medium text-sm">Fee Payment Due</p>
                    <p className="text-xs text-muted-foreground">Nov 5</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;