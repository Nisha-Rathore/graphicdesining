import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Image, Wrench, MessageSquare, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Stats {
  projects: number;
  services: number;
  messages: number;
  testimonials: number;
  unreadMessages: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({ projects: 0, services: 0, messages: 0, testimonials: 0, unreadMessages: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [p, s, m, t, u] = await Promise.all([
        supabase.from("portfolio_projects").select("id", { count: "exact", head: true }),
        supabase.from("services").select("id", { count: "exact", head: true }),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }),
        supabase.from("testimonials").select("id", { count: "exact", head: true }),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("is_read", false),
      ]);
      setStats({
        projects: p.count ?? 0,
        services: s.count ?? 0,
        messages: m.count ?? 0,
        testimonials: t.count ?? 0,
        unreadMessages: u.count ?? 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { title: "Total Projects", value: stats.projects, icon: Image, color: "text-primary" },
    { title: "Total Services", value: stats.services, icon: Wrench, color: "text-secondary" },
    { title: "New Messages", value: stats.unreadMessages, icon: MessageSquare, color: "text-gold" },
    { title: "Testimonials", value: stats.testimonials, icon: Star, color: "text-glow-purple" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Overview of your agency</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="glass glow-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-body text-muted-foreground">{card.title}</CardTitle>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-display font-bold text-foreground">{card.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
