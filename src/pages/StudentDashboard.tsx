import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useAuth } from '@/contexts/AuthContext'
import { 
  Calendar, 
  BarChart3, 
  FileText, 
  MessageSquare, 
  CreditCard, 
  Bell,
  LogOut,
  Clock,
  CheckCircle
} from 'lucide-react'

export const StudentDashboard = () => {
  const { profile, signOut } = useAuth()

  const studentFeatures = [
    {
      title: "Today's Classes",
      description: 'View scheduled classes for today',
      icon: Calendar,
      color: 'bg-blue-500',
    },
    {
      title: 'Attendance Records',
      description: 'View daily, weekly, and monthly attendance',
      icon: BarChart3,
      color: 'bg-green-500',
    },
    {
      title: 'Apply for Leave',
      description: 'Submit leave applications',
      icon: FileText,
      color: 'bg-orange-500',
    },
    {
      title: 'Register Complaint',
      description: 'Submit complaints or feedback',
      icon: MessageSquare,
      color: 'bg-red-500',
    },
    {
      title: 'Pay Fees',
      description: 'Online fee payment',
      icon: CreditCard,
      color: 'bg-purple-500',
    },
    {
      title: 'Notifications',
      description: 'View notices and announcements',
      icon: Bell,
      color: 'bg-indigo-500',
    },
  ]

  // Mock data for today's classes
  const todaysClasses = [
    { time: '09:00 AM', subject: 'Mathematics', teacher: 'Mr. Smith', room: 'Room 101' },
    { time: '11:00 AM', subject: 'Physics', teacher: 'Mrs. Johnson', room: 'Lab 1' },
    { time: '02:00 PM', subject: 'English', teacher: 'Ms. Davis', room: 'Room 203' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
            <p className="text-gray-600">Welcome back, {profile?.full_name}</p>
          </div>
          <Button onClick={signOut} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Features */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {studentFeatures.map((feature, index) => (
                <Card 
                  key={index} 
                  className="hover:shadow-lg transition-shadow cursor-pointer group"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${feature.color}`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Attendance Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Attendance Overview</CardTitle>
                <CardDescription>Your attendance statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Attendance</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>This Month</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>This Week</span>
                    <span>80%</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Today's Classes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {todaysClasses.map((classItem, index) => (
                  <div 
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg border-l-4 border-purple-500"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium">{classItem.subject}</p>
                      <span className="text-sm font-medium text-purple-600">
                        {classItem.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {classItem.teacher} • {classItem.room}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="text-lg font-bold">18/22</p>
                      <p className="text-sm text-gray-600">Days Present</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-lg font-bold">3</p>
                      <p className="text-sm text-gray-600">Classes Today</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Bell className="w-8 h-8 text-orange-500" />
                    <div>
                      <p className="text-lg font-bold">2</p>
                      <p className="text-sm text-gray-600">New Notices</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}