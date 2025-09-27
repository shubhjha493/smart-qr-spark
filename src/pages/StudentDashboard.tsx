import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  QrCode,
  MapPin,
  Camera
} from 'lucide-react';
import { Label } from '@/components/ui/label';

const StudentDashboard = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [notices, setNotices] = useState<any[]>([]);
  const [studentProfile, setStudentProfile] = useState<any>(null);
  const [enabledAttendanceMethod, setEnabledAttendanceMethod] = useState<'face' | 'qr' | null>(null);
  const [isOnlineMode, setIsOnlineMode] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showCameraPreview, setShowCameraPreview] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [showLocationMismatch, setShowLocationMismatch] = useState(false);

  useEffect(() => {
    // Set dummy data
    setNotices(dummyNotices);
    setStudentProfile(dummyProfile);
    
    // Check teacher's choice for attendance method
    const attendanceMethod = localStorage.getItem('smartpresence_student_attendance_method') as 'face' | 'qr' | null;
    setEnabledAttendanceMethod(attendanceMethod);
    
    // Check admin mode setting
    const adminMode = localStorage.getItem('smartpresence_admin_mode') || 'offline';
    setIsOnlineMode(adminMode === 'online');
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

  const markStudentAttendance = (method: 'face' | 'qr') => {
    if (enabledAttendanceMethod !== method) {
      toast({
        title: `${method === 'face' ? 'Face' : 'QR'} Scan Disabled`,
        description: "This attendance method is not currently enabled by your teacher.",
        variant: "destructive",
      });
      return;
    }

    if (isOnlineMode) {
      // Skip location check in online mode - directly open camera
      handleCameraPreview(method);
    } else {
      // Show location permission modal in offline mode
      setShowLocationModal(true);
    }
  };

  const handleLocationPermission = (allowed: boolean) => {
    setShowLocationModal(false);
    
    if (allowed) {
      // Get real location using browser API
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const detectedLat = position.coords.latitude;
          const detectedLng = position.coords.longitude;
          setCurrentLocation({ lat: detectedLat, lng: detectedLng });
          
          // BIT Sindri coordinates
          const schoolLat = 23.7957;
          const schoolLng = 86.4304;
          
          // Calculate distance in kilometers
          const R = 6371; // Earth's radius in km
          const dLat = (detectedLat - schoolLat) * Math.PI / 180;
          const dLng = (detectedLng - schoolLng) * Math.PI / 180;
          const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(schoolLat * Math.PI / 180) * Math.cos(detectedLat * Math.PI / 180) *
                    Math.sin(dLng/2) * Math.sin(dLng/2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
          const distance = R * c; // Distance in km
          
          // If within 1km of school, consider it a match
          const isLocationMatch = distance < 1;
          
          if (isLocationMatch) {
            toast({
              title: "📍 Location matched with school premises",
              description: "Opening camera preview...",
            });
            
            setTimeout(() => {
              handleCameraPreview(enabledAttendanceMethod!);
            }, 1500);
          } else {
            setShowLocationMismatch(true);
            toast({
              title: "⚠️ Not present at school location",
              description: `Distance: ${distance.toFixed(2)}km from school. You must be within 1km of school premises.`,
              variant: "destructive",
            });
          }
        },
        (error) => {
          console.error('Location error:', error);
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please enable location services.",
            variant: "destructive",
          });
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    } else {
      toast({
        title: "Location Access Denied",
        description: "Location access is required for attendance marking.",
        variant: "destructive",
      });
    }
  };

  const handleCameraPreview = async (method: 'face' | 'qr') => {
    setShowCameraPreview(true);
    
    try {
      // Request real camera access
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      
      // Get video element and attach stream
      const videoElement = document.getElementById('student-camera-video') as HTMLVideoElement;
      if (videoElement) {
        videoElement.srcObject = stream;
        videoElement.play();
      }
      
      // Auto-close camera after 2 seconds and show success
      setTimeout(() => {
        // Stop camera stream
        stream.getTracks().forEach(track => track.stop());
        setShowCameraPreview(false);
        
        // Success notification
        toast({
          title: "✅ Attendance marked successfully",
          description: `${method === 'face' ? 'Face recognition' : 'QR code'} attendance recorded.`,
        });
      }, 2000);
      
    } catch (error) {
      console.error('Camera error:', error);
      setShowCameraPreview(false);
      toast({
        title: "Camera Access Denied",
        description: "Camera access is required for attendance marking.",
        variant: "destructive",
      });
    }
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

          <Card 
            className={`cursor-pointer transition-all duration-300 ${
              enabledAttendanceMethod === 'qr' 
                ? 'shadow-lg ring-2 ring-indigo-500 ring-opacity-50 animate-pulse' 
                : enabledAttendanceMethod === null 
                  ? 'hover:shadow-lg' 
                  : 'opacity-50 hover:shadow-sm'
            }`} 
            onClick={() => markStudentAttendance('qr')}
          >
            <CardHeader className="text-center">
              <QrCode className={`w-12 h-12 mx-auto mb-2 ${
                enabledAttendanceMethod === 'qr' ? 'text-indigo-500' : 'text-gray-400'
              }`} />
              <CardTitle>QR Scan</CardTitle>
              <CardDescription>
                {enabledAttendanceMethod === 'qr' 
                  ? 'Active - Mark attendance with QR code' 
                  : 'Mark attendance with QR code'
                }
              </CardDescription>
              {enabledAttendanceMethod === 'qr' && (
                <Badge className="mt-2 bg-indigo-500">Active</Badge>
              )}
            </CardHeader>
          </Card>

          <Card 
            className={`cursor-pointer transition-all duration-300 ${
              enabledAttendanceMethod === 'face' 
                ? 'shadow-lg ring-2 ring-cyan-500 ring-opacity-50 animate-pulse' 
                : enabledAttendanceMethod === null 
                  ? 'hover:shadow-lg' 
                  : 'opacity-50 hover:shadow-sm'
            }`} 
            onClick={() => markStudentAttendance('face')}
          >
            <CardHeader className="text-center">
              <Scan className={`w-12 h-12 mx-auto mb-2 ${
                enabledAttendanceMethod === 'face' ? 'text-cyan-500' : 'text-gray-400'
              }`} />
              <CardTitle>Face Scan</CardTitle>
              <CardDescription>
                {enabledAttendanceMethod === 'face' 
                  ? 'Active - Mark attendance with face scan' 
                  : 'Mark attendance with face scan'
                }
              </CardDescription>
              {enabledAttendanceMethod === 'face' && (
                <Badge className="mt-2 bg-cyan-500">Active</Badge>
              )}
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

      {/* Location Permission Modal */}
      <Dialog open={showLocationModal} onOpenChange={setShowLocationModal}>
        <DialogContent className="sm:max-w-md animate-scale-in">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Location Access Required
            </DialogTitle>
            <DialogDescription>
              To mark your attendance, we need to verify your location matches the school premises.
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-muted/50 p-4 rounded-lg border">
            <div className="text-sm text-muted-foreground mb-2">Current Location:</div>
            <div className="font-mono text-sm">
              <div>Latitude: {currentLocation.lat.toFixed(6)}</div>
              <div>Longitude: {currentLocation.lng.toFixed(6)}</div>
            </div>
          </div>
          
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

      {/* Location Mismatch Modal */}
      <Dialog open={showLocationMismatch} onOpenChange={setShowLocationMismatch}>
        <DialogContent className="sm:max-w-md animate-shake">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <MapPin className="w-5 h-5" />
              ⚠️ Location Mismatch
            </DialogTitle>
            <DialogDescription>
              You are not currently at the school premises. Please move to the school location to mark attendance.
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
            <div className="text-sm text-destructive mb-2">Your Location:</div>
            <div className="font-mono text-sm text-destructive">
              <div>Latitude: {currentLocation.lat.toFixed(6)}</div>
              <div>Longitude: {currentLocation.lng.toFixed(6)}</div>
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <Button 
              onClick={() => setShowLocationMismatch(false)}
              variant="outline"
            >
              Okay
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Camera Preview Modal */}
      <Dialog open={showCameraPreview} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md animate-scale-in">
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
            <video 
              id="student-camera-video"
              className="w-64 h-48 bg-black rounded-lg object-cover"
              autoPlay
              muted
              playsInline
            />
          </div>
          
          <div className="bg-muted/50 p-3 rounded-lg border text-center">
            <div className="text-xs text-muted-foreground mb-1">Current Location</div>
            <div className="font-mono text-xs">
              {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
            </div>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            {isOnlineMode ? "Online Mode Enabled – Location not required." : "Verifying your identity..."}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentDashboard;