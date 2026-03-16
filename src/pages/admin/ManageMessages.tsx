import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

type Message = Tables<"contact_messages">;

const ManageMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);
  const { toast } = useToast();

  const fetchAll = async () => {
    const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    setMessages(data ?? []);
  };

  useEffect(() => { fetchAll(); }, []);

  const markRead = async (m: Message) => {
    if (!m.is_read) {
      await supabase.from("contact_messages").update({ is_read: true }).eq("id", m.id);
    }
    setSelected(m);
    fetchAll();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("contact_messages").delete().eq("id", id);
    toast({ title: "Deleted" });
    setSelected(null);
    fetchAll();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground text-sm">Contact form submissions</p>
      </div>

      <div className="space-y-2">
        {messages.map((m) => (
          <Card
            key={m.id}
            className={`glass cursor-pointer transition-all hover:bg-muted/30 ${!m.is_read ? "glow-border" : ""}`}
            onClick={() => markRead(m)}
          >
            <CardContent className="p-4 flex items-center gap-4">
              {m.is_read ? (
                <MailOpen className="w-5 h-5 text-muted-foreground shrink-0" />
              ) : (
                <Mail className="w-5 h-5 text-primary shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`font-display text-sm ${!m.is_read ? "font-bold text-foreground" : "text-muted-foreground"}`}>{m.name}</span>
                  <span className="text-xs text-muted-foreground">{m.email}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{m.subject || m.message}</p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">
                {new Date(m.created_at).toLocaleDateString()}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      {messages.length === 0 && <div className="text-center py-12 text-muted-foreground">No messages yet</div>}

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="glass border-border">
          <DialogHeader>
            <DialogTitle className="font-display">{selected?.subject || "Message"}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3">
              <div className="flex gap-4 text-sm">
                <span className="text-muted-foreground">From:</span>
                <span className="text-foreground">{selected.name} ({selected.email})</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {new Date(selected.created_at).toLocaleString()}
              </div>
              <p className="text-sm text-foreground whitespace-pre-wrap">{selected.message}</p>
              <div className="flex justify-end">
                <Button variant="destructive" size="sm" onClick={() => handleDelete(selected.id)}>
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageMessages;
