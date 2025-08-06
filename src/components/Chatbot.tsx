import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { ChatHeader } from "./ChatHeader";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { set } from "date-fns";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

export const Chatbot = () => {
  const [thread_id, setThread_id] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá! Bem-vindo à Otto's Brownie! 🍫 Sou seu assistente virtual e estou aqui para te ajudar com informações sobre nossos deliciosos brownies artesanais. Como posso te ajudar hoje?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollAreaRef.current) {
        const scrollElement = scrollAreaRef.current.querySelector(
          "[data-radix-scroll-area-viewport]"
        );
        if (scrollElement) {
          scrollElement.scrollTop = scrollElement.scrollHeight;
        }
      }
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const res = await fetch("https://assistant-response.onrender.com/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageText, thread_id: thread_id }),
      });

      const data = await res.json();

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || "Desculpe, não consegui entender. 😅",
        isUser: false,
        timestamp: new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botResponse]);
      setThread_id(data.thread_id || null);
    } catch (error) {
      console.error("Erro ao chamar assistant:", error);
      toast({
        title: "Erro",
        description: "Não foi possível obter resposta do assistente.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: "1",
        text: "Olá! Bem-vindo à Otto's Brownie! 🍫 Sou seu assistente virtual e estou aqui para te ajudar com informações sobre nossos deliciosos brownies artesanais. Como posso te ajudar hoje?",
        isUser: false,
        timestamp: new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setThread_id(null);
    toast({
      title: "Chat reiniciado",
      description: "A conversa foi reiniciada com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brownie-cream via-background to-brownie-light">
      <div className="container mx-auto max-w-4xl p-4">
        <Card className="h-[90vh] flex flex-col shadow-2xl border-brownie-light/50 overflow-hidden">
          <ChatHeader />

          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex justify-end p-3 border-b border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="border-brownie-light hover:bg-brownie-light/50"
              >
                <RotateCcw size={14} className="mr-2" />
                Reiniciar Chat
              </Button>
            </div>

            <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message.text}
                    isUser={message.isUser}
                    timestamp={message.timestamp}
                  />
                ))}

                {isTyping && (
                  <div className="flex gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-brownie-gold border-2 border-brownie-gold flex items-center justify-center">
                      <span className="text-brownie-dark text-xs">🤖</span>
                    </div>
                    <Card className="p-3 bg-chat-bot-bg border-brownie-light">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-brownie-brown rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-brownie-brown rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-brownie-brown rounded-full animate-bounce"></div>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
        </Card>
      </div>
    </div>
  );
};
