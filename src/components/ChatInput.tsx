import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled = false }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t border-border bg-card">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Pergunte sobre nossos deliciosos brownies..."
        disabled={disabled}
        className="flex-1 border-brownie-light focus:border-brownie-gold focus:ring-brownie-gold/20"
      />
      <Button
        type="submit"
        disabled={!message.trim() || disabled}
        className="bg-brownie-gold hover:bg-brownie-gold/90 text-brownie-dark border border-brownie-gold/20"
      >
        <Send size={16} />
      </Button>
    </form>
  );
};