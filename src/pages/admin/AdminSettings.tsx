import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, User } from "lucide-react";

const AdminSettings = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm">Account and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="glass glow-border">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <User className="w-5 h-5 text-primary" />
            <CardTitle className="text-sm font-body">Account</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="text-foreground">{user?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">User ID</span>
                <span className="text-foreground text-xs font-mono">{user?.id?.slice(0, 8)}...</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass glow-border">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <Shield className="w-5 h-5 text-primary" />
            <CardTitle className="text-sm font-body">Role</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary font-semibold">Admin</span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
