import { useState } from "react";
import { Shield, GraduationCap, BookOpen, Users, BarChart3, Settings, Calendar, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { LoginForm } from "@/components/auth/LoginForm";
import { AdminRegisterForm } from "@/components/auth/AdminRegisterForm";
import { TeacherRegisterForm } from "@/components/auth/TeacherRegisterForm";
import { StudentRegisterForm } from "@/components/auth/StudentRegisterForm";
import { UserRole } from "@/lib/supabase";

const loginPortals = [
  {
    role: "Admin",
    title: "Administrative Portal",
    description: "Complete system oversight and institutional analytics",
    icon: Shield,
    gradient: "from-red-500 to-orange-500",
    features: [
      { icon: BarChart3, text: "System Analytics" },
      { icon: Users, text: "User Management" },
      { icon: Settings, text: "System Configuration" },
    ],
    bgPattern: "bg-gradient-to-br from-red-50 to-orange-50"
  },
  {
    role: "Teacher",
    title: "Faculty Portal",
    description: "Attendance management and student analytics",
    icon: GraduationCap,
    gradient: "from-blue-500 to-indigo-500",
    features: [
      { icon: Users, text: "Class Management" },
      { icon: BarChart3, text: "Student Reports" },
      { icon: Calendar, text: "Schedule Control" },
    ],
    bgPattern: "bg-gradient-to-br from-blue-50 to-indigo-50"
  },
  {
    role: "Student",
    title: "Student Portal",
    description: "QR scanning, notifications, and schedule access",
    icon: BookOpen,
    gradient: "from-green-500 to-emerald-500",
    features: [
      { icon: BookOpen, text: "Attendance Tracking" },
      { icon: Bell, text: "Notifications" },
      { icon: Calendar, text: "Class Schedule" },
    ],
    bgPattern: "bg-gradient-to-br from-green-50 to-emerald-50"
  }
];

const LoginCards = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<'login' | 'register'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleRoleAction = (role: UserRole, action: 'login' | 'register') => {
    setSelectedRole(role);
    setDialogContent(action);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedRole(null);
  };

  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Choose Your{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Access Portal
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Role-specific dashboards designed for administrators, teachers, and students 
            with tailored features for optimal productivity.
          </p>
        </div>

        {/* Login Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {loginPortals.map((portal) => (
            <div
              key={portal.role}
              className="group relative bg-gradient-glassmorphism backdrop-blur-glass border border-white/20 rounded-3xl shadow-glass hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden"
            >
              {/* Background Pattern */}
              <div className={`absolute inset-0 ${portal.bgPattern} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Gradient Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${portal.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <div className="relative p-8 text-center space-y-6">
                {/* Icon */}
                <div className="relative mx-auto w-20 h-20">
                  <div className={`w-20 h-20 bg-gradient-to-br ${portal.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <portal.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${portal.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300`}></div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-foreground">
                    {portal.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {portal.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  {portal.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors duration-300"
                    >
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${portal.gradient} shadow-sm`}>
                        <feature.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button
                    className={`w-full bg-gradient-to-r ${portal.gradient} hover:scale-105 transition-transform shadow-lg text-white font-semibold`}
                    size="lg"
                    onClick={() => handleRoleAction(portal.role.toLowerCase() as UserRole, 'login')}
                  >
                    Login as {portal.role}
                  </Button>
                  {portal.role !== 'Admin' && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleRoleAction(portal.role.toLowerCase() as UserRole, 'register')}
                    >
                      Register as {portal.role}
                    </Button>
                  )}
                </div>

                {/* Role Badge */}
                <div className="absolute top-4 right-4">
                  <div className={`bg-gradient-to-r ${portal.gradient} text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg`}>
                    {portal.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Don't have an account? Contact your institution administrator.
          </p>
          <Button variant="outline" className="backdrop-blur-glass bg-gradient-glassmorphism border-white/20">
            Request Access
          </Button>
        </div>

        {/* Auth Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedRole && (
              <>
                {dialogContent === 'login' ? (
                  <LoginForm role={selectedRole} onClose={closeDialog} />
                ) : selectedRole === 'admin' ? (
                  <AdminRegisterForm onClose={closeDialog} />
                ) : selectedRole === 'teacher' ? (
                  <TeacherRegisterForm onClose={closeDialog} />
                ) : (
                  <StudentRegisterForm onClose={closeDialog} />
                )}
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default LoginCards;