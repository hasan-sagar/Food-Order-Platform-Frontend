import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-[#F21C40]" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          <span>Hello User ! Please Login</span>
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex">
          <Button className="flex-1 p-6 font-bold bg-[#75A107] text-lg uppercase">
            Log In
          </Button>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}
