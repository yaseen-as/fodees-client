// import { Sheet } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "./ui/sheet"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"
  
export default function MobilNav() {
  return (
    <div>
      <Sheet>
  <SheetTrigger><Menu className="text-orange-500"/></SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Foodees</SheetTitle>
      <SheetDescription className="flex">
        <Button className="flex-1 bg-orange-500 font-bold">Login</Button>
      </SheetDescription >
    </SheetHeader>
  </SheetContent>
</Sheet>
    </div>
  )
}
