import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const ChatHeader = () => {
  return (
    <Card className="p-6 border-0 rounded-b-none bg-gradient-to-r from-brownie-gold to-primary text-primary-foreground">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center border-2 border-background/30">
          <img 
            src="/lovable-uploads/48e8f1bb-a386-4c6d-8b2e-8550ee5904e6.png" 
            alt="Otto's Brownie" 
            className="w-12 h-12 object-contain"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-1">Otto's Brownie Assistant</h1>
          <p className="text-primary-foreground/80 text-sm">
            Seu assistente especializado em brownies artesanais
          </p>
          <div className="flex gap-2 mt-2">
            <Badge variant="secondary" className="bg-background/20 text-primary-foreground border-background/30">
              🍫 Brownies Artesanais
            </Badge>
            <Badge variant="secondary" className="bg-background/20 text-primary-foreground border-background/30">
              💬 Chat Online
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};