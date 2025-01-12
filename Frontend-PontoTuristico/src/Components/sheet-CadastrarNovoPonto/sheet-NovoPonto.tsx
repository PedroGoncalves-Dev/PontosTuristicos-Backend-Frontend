import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

const NovoPontoTuristico = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button>
            Novo ponto turístico <Plus className="scale-110" />
          </Button>
        </SheetTrigger>
        <SheetContent side={"right"}>
          <SheetHeader>
            <SheetTitle>Cadastrar Novo Ponto Turístico</SheetTitle>
            <SheetDescription>
              Cadastre um novo ponto turistico com as informações necessárias...
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default NovoPontoTuristico;
