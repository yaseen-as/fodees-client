import { Restourent } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
  restourant: Restourent;
};

export default function RestourantInfo({ restourant }: Props) {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {restourant.restaurantName}
          <CardDescription>
            {restourant.city},{restourant.country}
          </CardDescription>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex">
        {restourant.cuisines.map((item, index) => (
          <span className="flex">
            <span>{item}</span>
            {index < restourant.cuisines.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
}
