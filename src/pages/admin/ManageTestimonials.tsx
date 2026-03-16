import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

type Testimonial = Tables<"testimonials">;

const ManageTestimonials = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState({ client_name: "", company: "", content: "", rating: 5, is_active: true });
  const { toast } = useToast();

  const fetchAll = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
    setItems(data ?? []);
  };

  useEffect(() => { fetchAll(); }, []);

  const openNew = () => { setEditing(null); setForm({ client_name: "", company: "", content: "", rating: 5, is_active: true }); setDialogOpen(true); };
  const openEdit = (t: Testimonial) => { setEditing(t); setForm({ client_name: t.client_name, company: t.company ?? "", content: t.content, rating: t.rating ?? 5, is_active: t.is_active ?? true }); setDialogOpen(true); };

  const handleSave = async () => {
    if (!form.client_name || !form.content) { toast({ title: "Name and content required", variant: "destructive" }); return; }
    if (editing) {
      await supabase.from("testimonials").update(form).eq("id", editing.id);
    } else {
      await supabase.from("testimonials").insert(form);
    }
    toast({ title: editing ? "Updated" : "Created" });
    setDialogOpen(false);
    fetchAll();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("testimonials").delete().eq("id", id);
    toast({ title: "Deleted" });
    fetchAll();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Testimonials</h1>
          <p className="text-muted-foreground text-sm">Manage client testimonials</p>
        </div>
        <Button onClick={openNew}><Plus className="w-4 h-4 mr-1" /> Add Testimonial</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((t) => (
          <Card key={t.id} className="glass glow-border">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display font-semibold text-foreground">{t.client_name}</h3>
                  {t.company && <span className="text-xs text-muted-foreground">{t.company}</span>}
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(t)}><Pencil className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(t.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </div>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating ?? 5 }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground italic">"{t.content}"</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {items.length === 0 && <div className="text-center py-12 text-muted-foreground">No testimonials yet</div>}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="glass border-border">
          <DialogHeader><DialogTitle className="font-display">{editing ? "Edit Testimonial" : "New Testimonial"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Client Name" value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} className="bg-muted/50" />
            <Input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="bg-muted/50" />
            <Textarea placeholder="Testimonial content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="bg-muted/50" />
            <Input type="number" placeholder="Rating (1-5)" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) || 5 })} className="bg-muted/50" />
            <div className="flex items-center gap-2">
              <Switch checked={form.is_active} onCheckedChange={(v) => setForm({ ...form, is_active: v })} />
              <span className="text-sm text-muted-foreground">Active</span>
            </div>
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

export default ManageTestimonials;
