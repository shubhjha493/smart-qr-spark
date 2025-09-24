import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/AuthContext'
import { 
  Users, 
  Settings, 
  Calendar, 
  CheckCircle, 
  CreditCard, 
  Megaphone,
  LogOut,
  Monitor,
  Wifi
} from 'lucide-react'

export const AdminDashboard = () => {
  const { profile, signOut } = useAuth()
  const [classMode, setClassMode] = useState<'online' | 'offline'>('offline')

  const adminFeatures = [
    {
      title: 'Publish Notice/Announcement',
      description: 'Create and send notifications to teachers and students',
      icon: Megaphone,
      color: 'bg-blue-500',
    },
    {
      title: 'Switch Mode',
      description: `Current: ${classMode.charAt(0).toUpperCase() + classMode.slice(1)} Class`,
      icon: classMode === 'online' ? Wifi : Monitor,
      color: classMode === 'online' ? 'bg-green-500' : 'bg-orange-500',
      action: () => setClassMode(prev => prev === 'online' ? 'offline' : 'online')
    },
    {
      title: 'Pay',
      description: 'Manage teacher salaries and student fee payments',
      icon: CreditCard,
      color: 'bg-purple-500',
    },
    {
      title: 'Holiday Calendar',
      description: 'Add and view holidays',
      icon: Calendar,
      color: 'bg-red-500',
    },
    {
      title: 'Approve Requests',
      description: 'Approve/reject teacher and student registrations',
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      title: 'User Management',
      description: 'Manage all users in the system',
      icon: Users,
      color: 'bg-indigo-500',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {profile?.full_name}</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Class Mode: {classMode.charAt(0).toUpperCase() + classMode.slice(1)}
            </Badge>
            <Button onClick={signOut} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminFeatures.map((feature, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={feature.action}
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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-gray-600">Total Teachers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-gray-600">Total Students</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-gray-600">Pending Approvals</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}