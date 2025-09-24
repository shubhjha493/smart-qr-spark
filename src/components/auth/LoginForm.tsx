import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase, UserRole } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'

interface LoginFormProps {
  role: UserRole
  onClose: () => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ role, onClose }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Check if user has the correct role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role, approved')
        .eq('id', data.user.id)
        .single()

      if (!profile) {
        throw new Error('Profile not found')
      }

      if (profile.role !== role) {
        throw new Error(`This account is not registered as ${role}`)
      }

      if (!profile.approved && role !== 'admin') {
        throw new Error('Your account is pending admin approval')
      }

      toast({
        title: 'Login successful',
        description: `Welcome back, ${role}!`,
      })

      onClose()
    } catch (error: any) {
      toast({
        title: 'Login failed',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="capitalize">{role} Login</CardTitle>
        <CardDescription>
          Sign in to your {role} account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="submit"
              className="flex-1"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}