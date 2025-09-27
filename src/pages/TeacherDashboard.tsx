import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  BookOpen,
  MapPin,
  Camera,
  Scan,
  Mic
} from 'lucide-react';
import { Label } from '@/components/ui/label';

const TeacherDashboard = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [notices, setNotices] = useState<any[]>([]);
  const [teacherProfile, setTeacherProfile] = useState<any>(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showCameraPreview, setShowCameraPreview] = useState(false);
  const [showPostAttendanceOptions, setShowPostAttendanceOptions] = useState(false);
  const [isOnlineMode, setIsOnlineMode] = useState(false);

  useEffect(() => {
    // Set dummy data
    setNotices(dummyNotices);
    setTeacherProfile(dummyProfile);
    
    // Check admin mode setting
    const adminMode = localStorage.getItem('smartpresence_admin_mode') || 'offline';
    setIsOnlineMode(adminMode === 'online');
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
    if (isOnlineMode) {
      // Skip location check in online mode
      handleCameraPreview();
    } else {
      // Show location permission modal in offline mode
      setShowLocationModal(true);
    }
  };

  const handleLocationPermission = (allowed: boolean) => {
    setShowLocationModal(false);
    
    if (allowed) {
      // Show location matched animation
      toast({
        title: "📍 Location matched with school premises",
        description: "Opening camera preview...",
      });
      
      setTimeout(() => {
        handleCameraPreview();
      }, 1500);
    } else {
      toast({
        title: "Location Access Denied",
        description: "Location access is required for attendance marking.",
        variant: "destructive",
      });
    }
  };

  const handleCameraPreview = () => {
    setShowCameraPreview(true);
    
    // Auto-close camera after 2 seconds and show success
    setTimeout(() => {
      setShowCameraPreview(false);
      
      // Success notification with animation
      toast({
        title: "✅ Attendance marked successfully",
        description: "Your attendance has been recorded",
      });
      
      // Show post-attendance options
      setTimeout(() => {
        setShowPostAttendanceOptions(true);
      }, 1000);
    }, 2000);
  };

  const handleStudentAttendanceChoice = (method: 'face' | 'qr') => {
    setShowPostAttendanceOptions(false);
    
    // Store choice for student dashboard
    localStorage.setItem('smartpresence_student_attendance_method', method);
    
    toast({
      title: "Student Attendance Method Set",
      description: `${method === 'face' ? 'Face Recognition' : 'QR Code'} is now enabled in the Student Dashboard.`,
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
                  <Button size="sm" variant="outline" onClick={markAttendance}>
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

      {/* Location Permission Modal */}
      <Dialog open={showLocationModal} onOpenChange={setShowLocationModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Location Access Required
            </DialogTitle>
            <DialogDescription>
              To mark your attendance, we need to verify your location matches the school premises.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={() => handleLocationPermission(false)}
            >
              Deny
            </Button>
            <Button 
              onClick={() => handleLocationPermission(true)}
              className="bg-green-600 hover:bg-green-700"
            >
              Allow Location Access
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Camera Preview Modal */}
      <Dialog open={showCameraPreview} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Camera Preview
            </DialogTitle>
            <DialogDescription>
              Please look at the camera for attendance verification.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-8">
            <div className="w-64 h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center animate-pulse">
              <Camera className="w-12 h-12 text-white" />
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            {isOnlineMode ? "Online Mode Enabled – Location not required." : "Verifying your identity..."}
          </div>
        </DialogContent>
      </Dialog>

      {/* Post-Attendance Options Modal */}
      <Dialog open={showPostAttendanceOptions} onOpenChange={setShowPostAttendanceOptions}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enable Student Attendance</DialogTitle>
            <DialogDescription>
              Choose how students should mark their attendance today.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 pt-4">
            <Button 
              onClick={() => handleStudentAttendanceChoice('face')}
              className="w-full justify-start gap-3 h-12 animate-fade-in"
              variant="outline"
            >
              <Scan className="w-5 h-5 text-cyan-500" />
              Mark Student Attendance via Face Recognition
            </Button>
            <Button 
              onClick={() => handleStudentAttendanceChoice('qr')}
              className="w-full justify-start gap-3 h-12 animate-fade-in"
              variant="outline"
            >
              <QrCode className="w-5 h-5 text-indigo-500" />
              Mark Student Attendance via QR Code
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherDashboard;