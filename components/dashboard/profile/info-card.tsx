import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Pin } from "lucide-react";

const InfoCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Info</CardTitle>
        <CardContent className="px-0 text-slate-600">
          <ul className="flex flex-col gap-2 text-sm">
            <li className="flex items-center gap-2">
              <Pin className="size-4" /> Jl. Gresik ppi 6 no. 22, Surabaya.
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4" /> mochammadfahmiks@gmail.com
            </li>
          </ul>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default InfoCard;
