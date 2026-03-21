import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, ArrowRight, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    });
    setSending(false);
    if (error) {
      toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
    } else {
      toast({ title: "Message Sent!", description: "We'll get back to you within 24 hours." });
      setForm({ name: "", email: "", subject: "", message: "" });
    }
  };

  const inputClasses = (field: string) =>
    `w-full bg-[hsl(var(--surface-glass)/0.3)] border rounded-xl px-4 py-3.5 font-body text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-all duration-400 ${
      focused === field
        ? "border-neon-purple/50 shadow-[0_0_20px_hsl(var(--neon-purple)/0.15)]"
        : "border-foreground/8 hover:border-foreground/15"
    }`;

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[hsl(var(--neon-purple)/0.05)] blur-[200px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-neon-pink mb-4">Contact Us</p>
          <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-4">
            Let's <span className="text-gradient-accent">Talk</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
            Have a question or want to discuss your next project? Drop us a message.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass rounded-2xl rim-light p-6 space-y-6">
              <h3 className="font-display text-xl font-bold text-foreground">Reach Out Directly</h3>

              {[
                { icon: Mail, label: "Email", value: "hello@innovategrow.com", color: "neon-purple" },
                { icon: Phone, label: "Phone", value: "+1 (234) 567-890", color: "neon-cyan" },
                { icon: MapPin, label: "Location", value: "Remote — Worldwide", color: "neon-pink" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className={`w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0 group-hover:bg-[hsl(var(--${item.color})/0.15)] transition-all duration-300`}>
                    <item.icon className={`w-4 h-4 text-muted-foreground group-hover:text-${item.color} transition-colors duration-300`} />
                  </div>
                  <div>
                    <p className="font-body text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-body text-foreground">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 glass rounded-2xl rim-light p-5 group hover:border-[hsl(142,70%,45%,0.3)] hover:shadow-[0_0_20px_hsl(142,70%,45%,0.1)] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-[hsl(142,70%,45%,0.1)] flex items-center justify-center shrink-0">
                <MessageCircle className="w-4 h-4 text-[hsl(142,70%,50%)]" />
              </div>
              <div className="flex-1">
                <p className="font-display text-sm font-semibold text-foreground">Chat on WhatsApp</p>
                <p className="font-body text-xs text-muted-foreground">Quick response guaranteed</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
            </motion.a>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl rim-light p-8 md:p-10 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  { key: "name", label: "Name", type: "text", placeholder: "John Doe", required: true },
                  { key: "email", label: "Email", type: "email", placeholder: "you@email.com", required: true },
                ].map((field, i) => (
                  <motion.div
                    key={field.key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-2">{field.label}</label>
                    <input
                      type={field.type}
                      required={field.required}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      onFocus={() => setFocused(field.key)}
                      onBlur={() => setFocused(null)}
                      className={inputClasses(field.key)}
                      placeholder={field.placeholder}
                    />
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-2">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  onFocus={() => setFocused("subject")}
                  onBlur={() => setFocused(null)}
                  className={inputClasses("subject")}
                  placeholder="What's this about?"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  className={`${inputClasses("message")} resize-none`}
                  placeholder="Tell us what you need..."
                />
              </motion.div>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                type="submit"
                disabled={sending}
                className="w-full group relative overflow-hidden rounded-2xl bg-gradient-to-r from-neon-purple via-primary to-neon-cyan px-8 py-4 font-display font-bold text-primary-foreground transition-all duration-400 hover:scale-[1.02] neon-glow-purple flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {sending ? (
                  <span className="relative z-10">Sending...</span>
                ) : (
                  <>
                    <span className="relative z-10">Send Message</span>
                    <Send className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-purple bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-rotate" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
