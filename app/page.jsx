"use client"
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const {toast} = useToast();
  return (
    <main className={"h-screen w-full "}>
      <Button
        variant="default"
        onClick={() => {
          toast({
            title: "Hello",
            description: "This is a toast message",
            status: "success",
          });
        }}
      >Click me</Button>
    </main>
  );
}
