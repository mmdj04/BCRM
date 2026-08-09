"use client";

import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

export function WhatsAppContact() {
  return (
    <Button size="icon" variant="outline" asChild aria-label="Contato via WhatsApp">
      <a href="https://wa.me/5521974699723" target="_blank" rel="noreferrer">
        <MessageCircle className="size-4" />
      </a>
    </Button>
  );
}
