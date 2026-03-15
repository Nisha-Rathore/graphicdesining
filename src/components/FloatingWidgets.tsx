import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const quickReplies = [
  "What services do you offer?",
  "How much does a brand identity cost?",
  "What's your turnaround time?",
  "I want to start a project",
];

const botResponses: Record<string, string> = {
  "what services do you offer?":
    "We offer **Brand Identity & Strategy**, **Logo Design**, **UI/UX & Product Design**, **Social Media Creatives**, **Packaging & Print**, and **Motion Graphics**. Each service is tailored to help your business grow. Would you like details on any specific service?",
  "how much does a brand identity cost?":
    "Our brand identity packages start from **$2,500** for startups and go up to **$15,000+** for enterprise-level projects. Every package includes strategy, logo design, brand guidelines, and collateral. Want a custom quote? Just share your requirements!",
  "what's your turnaround time?":
    "Most projects are delivered within **48-72 hours** for standard requests. Complex brand identity projects typically take **1-2 weeks**. We also offer rush delivery for urgent needs. ⚡",
  "i want to start a project":
    "Excellent! 🎉 We'd love to work with you. You can:\n\n1. Fill out the **contact form** below\n2. Message us on **WhatsApp** for a quick chat\n3. Tell me more about your project right here!\n\nWhat type of design work do you need?",
};

const getResponse = (input: string): string => {
  const lower = input.toLowerCase().trim();
  for (const [key, value] of Object.entries(botResponses)) {
    if (lower.includes(key) || key.includes(lower)) return value;
  }
  if (lower.includes("service")) return botResponses["what services do you offer?"];
  if (lower.includes("price") || lower.includes("cost") || lower.includes("pricing"))
    return botResponses["how much does a brand identity cost?"];
  if (lower.includes("time") || lower.includes("deliver") || lower.includes("fast"))
    return botResponses["what's your turnaround time?"];
  if (lower.includes("project") || lower.includes("start") || lower.includes("begin"))
    return botResponses["i want to start a project"];

  return "Thanks for reaching out! For detailed inquiries, please fill out the **contact form** or message us on **WhatsApp**. Our team typically responds within 1 hour during business hours. 😊";
};

const FloatingWidgets = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! 👋 Welcome to **Innovate Grow Designs**. I'm here to help you with any questions about our services. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getResponse(text),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full bg-[hsl(142,70%,45%)] flex items-center justify-center shadow-[0_4px_20px_hsl(142,70%,45%,0.4)] hover:scale-110 transition-transform duration-300"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-[hsl(0,0%,100%)]">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* AI Chat widget toggle */}
      <motion.button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-[0_4px_20px_hsl(var(--primary)/0.4)] hover:scale-110 transition-transform duration-300"
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI Chat"
      >
        {chatOpen ? <X className="w-6 h-6 text-primary-foreground" /> : <MessageSquare className="w-6 h-6 text-primary-foreground" />}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="fixed bottom-24 right-6 z-40 w-[360px] max-w-[calc(100vw-3rem)] rounded-2xl glass rim-light luxury-shadow overflow-hidden flex flex-col"
            style={{ height: "500px" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
              <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-display text-sm font-bold text-foreground">Design Assistant</p>
                <p className="font-body text-xs text-muted-foreground">Typically replies instantly</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="shrink-0 w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center mt-1">
                      <Bot className="w-3.5 h-3.5 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 font-body text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary/20 text-foreground rounded-br-md"
                        : "bg-white/5 text-foreground rounded-bl-md"
                    }`}
                  >
                    {msg.content.split("\n").map((line, i) => (
                      <span key={i}>
                        {line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
                          j % 2 === 1 ? (
                            <strong key={j} className="font-semibold">
                              {part}
                            </strong>
                          ) : (
                            part
                          )
                        )}
                        {i < msg.content.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                  {msg.role === "user" && (
                    <div className="shrink-0 w-7 h-7 rounded-lg bg-secondary/20 flex items-center justify-center mt-1">
                      <User className="w-3.5 h-3.5 text-secondary" />
                    </div>
                  )}
                </div>
              ))}

              {/* Quick replies */}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {quickReplies.map((qr) => (
                    <button
                      key={qr}
                      onClick={() => sendMessage(qr)}
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 font-body text-xs text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all"
                    >
                      {qr}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-white/5">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors disabled:opacity-30"
              >
                <Send className="w-4 h-4 text-primary" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingWidgets;
