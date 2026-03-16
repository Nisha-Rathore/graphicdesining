import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

type Project = Tables<"portfolio_projects">;

const ManagePortfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState({ title: "", category: "", description: "", image_url: "", client_name: "" });
  const { toast } = useToast();

  const fetchProjects = async () => {
    const { data } = await supabase.from("portfolio_projects").select("*").order("created_at", { ascending: false });
    setProjects(data ?? []);
  };

  useEffect(() => { fetchProjects(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ title: "", category: "", description: "", image_url: "", client_name: "" });
    setDialogOpen(true);
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({ title: p.title, category: p.category, description: p.description ?? "", image_url: p.image_url ?? "", client_name: p.client_name ?? "" });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.category) {
      toast({ title: "Title and category are required", variant: "destructive" });
      return;
    }
    if (editing) {
      const { error } = await supabase.from("portfolio_projects").update(form).eq("id", editing.id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    } else {
      const { error } = await supabase.from("portfolio_projects").insert(form);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    }
    toast({ title: editing ? "Updated" : "Created" });
    setDialogOpen(false);
    fetchProjects();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("portfolio_projects").delete().eq("id", id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Deleted" });
    fetchProjects();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Portfolio</h1>
          <p className="text-muted-foreground text-sm">Manage your design projects</p>
        </div>
        <Button onClick={openNew}><Plus className="w-4 h-4 mr-1" /> Add Project</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {projects.map((p) => (
            <motion.div key={p.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Card className="glass glow-border overflow-hidden">
                {p.image_url && (
                  <div className="h-40 overflow-hidden">
                    <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display font-semibold text-foreground">{p.title}</h3>
                      <span className="text-xs text-primary">{p.category}</span>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(p)}><Pencil className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                    </div>
                  </div>
                  {p.description && <p className="text-xs text-muted-foreground line-clamp-2">{p.description}</p>}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">No projects yet. Add your first one!</div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="glass border-border">
          <DialogHeader>
            <DialogTitle className="font-display">{editing ? "Edit Project" : "New Project"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="bg-muted/50" />
            <Input placeholder="Category (e.g., Branding)" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="bg-muted/50" />
            <Input placeholder="Image URL" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="bg-muted/50" />
            <Input placeholder="Client Name" value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} className="bg-muted/50" />
            <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="bg-muted/50" />
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave}>{editing ? "Update" : "Create"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManagePortfolio;
