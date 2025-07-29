import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

export const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div className={`flex gap-3 mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <Avatar className="w-8 h-8 border-2 border-brownie-gold">
          <AvatarImage src="/lovable-uploads/48e8f1bb-a386-4c6d-8b2e-8550ee5904e6.png" alt="Otto's Bot" />
          <AvatarFallback className="bg-brownie-gold text-brownie-dark">
            <Bot size={16} />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={`max-w-[80%] ${isUser ? 'order-first' : ''}`}>
        <Card className={`p-3 ${
          isUser 
            ? 'bg-chat-user-bg text-chat-user-text border-primary' 
            : 'bg-chat-bot-bg text-chat-bot-text border-brownie-light'
        }`}>
          <p className="text-sm leading-relaxed">{message}</p>
        </Card>
        <span className={`text-xs text-muted-foreground mt-1 block ${
          isUser ? 'text-right' : 'text-left'
        }`}>
          {timestamp}
        </span>
      </div>

      {isUser && (
        <Avatar className="w-8 h-8 border-2 border-primary">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <User size={16} />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};