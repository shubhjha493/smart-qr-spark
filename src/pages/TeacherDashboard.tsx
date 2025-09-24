import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import { 
  QrCode, 
  Calendar, 
  FileText, 
  BarChart3, 
  Bell,
  LogOut,
  Clock
} from 'lucide-react'

export const TeacherDashboard = () => {
  const { profile, signOut } = useAuth()

  const teacherFeatures = [
    {
      title: 'Mark Attendance',
      description: 'QR-based or manual attendance marking',
      icon: QrCode,
      color: 'bg-green-500',
    },
    {
      title: "Today's Classes",
      description: 'View scheduled classes for today',
      icon: Calendar,
      color: 'bg-blue-500',
    },
    {
      title: 'Request Leave',
      description: 'Submit leave applications',
      icon: FileText,
      color: 'bg-orange-500',
    },
    {
      title: 'Student Reports',
      description: 'View attendance reports (daily/weekly/monthly)',
      icon: BarChart3,
      color: 'bg-purple-500',
    },
    {
      title: 'Notifications',
      description: 'Receive notifications from admin',
      icon: Bell,
      color: 'bg-red-500',
    },
  ]

  // Mock data for today's classes
  const todaysClasses = [
    { time: '09:00 AM', subject: 'Mathematics', class: '10-A', room: 'Room 101' },
    { time: '11:00 AM', subject: 'Physics', class: '12-B', room: 'Lab 1' },
    { time: '02:00 PM', subject: 'Chemistry', class: '11-C', room: 'Lab 2' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teacherFeatures.map((feature, index) => (
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
          </div>

          {/* Today's Schedule */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Classes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {todaysClasses.map((classItem, index) => (
                  <div 
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{classItem.subject}</p>
                        <p className="text-sm text-gray-600">
                          Class {classItem.class} • {classItem.room}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-blue-600">
                        {classItem.time}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="mt-6 space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">95%</p>
                    <p className="text-sm text-gray-600">Average Attendance</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">3</p>
                    <p className="text-sm text-gray-600">Classes Today</p>
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