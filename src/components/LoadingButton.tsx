import { LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";

export default function LoadingButton() {
  return (
    <div>
        <Button>
        <LoaderCircle className="mx-2 h-4 w-4 animate-spin"/>
        Loading
        </Button>
      
    </div>
  )
}
