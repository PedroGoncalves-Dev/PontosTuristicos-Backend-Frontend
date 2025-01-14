import { MapPinned } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { IpontosTuristicos } from "@/data-access/get-allPontosTuristicos";

interface IpropsDetalhesPontosTuristicos {
  pontos: IpontosTuristicos;
}
const DetalhesPontosTuristicos = ({
  pontos,
}: IpropsDetalhesPontosTuristicos) => {
  const endereco = [
    {
      label: "Logradouro",
      value: pontos.endereco.logradouro_end
        ? `${pontos.endereco.logradouro_end}, ${pontos.endereco.numero_end}`
        : "Não informado",
    },
    {
      label: "Bairro",
      value: pontos.endereco.bairro_end || " Não informado",
    },
    {
      label: "CEP",
      value: pontos.endereco.cep_end || "Não informado",
    },
    {
      label: "Complemento",
      value: pontos.endereco.complemento_end || "Não informado",
    },
  ];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="transition-all duration-300 ease-out bg-orange-600 hover:bg-orange-700 hover:scale-105 hover:shadow-xl">
          Detalhes
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl overflow-x-hidden !overflow-y-auto max-h-screen bg-white shadow-2xl rounded-xl">
        <div className="relative p-6">
          <DialogHeader className="pb-4 space-y-4 border-b border-orange-100">
            <DialogTitle className="text-2xl font-bold text-transparent bg-gradient-to-r from-amber-900 to-orange-700 bg-clip-text">
              {pontos.nome_pt}
            </DialogTitle>
            <Separator className="w-4/5" />
            <DialogDescription></DialogDescription>

            <div className="inline-flex items-center px-3 py-2 rounded-lg bg-amber-50">
              <MapPinned className="w-4 h-4 mr-2 text-orange-600" />
              <span className="text-sm font-medium text-orange-700">
                {pontos.endereco.cidade_end} - {pontos.endereco.uf_end}
              </span>
            </div>
          </DialogHeader>

          <div className="mt-8 space-y-6">
            <div className="flex justify-end bg-amber-900 rounded-s-lg">
              <div className="w-[98%] bg-slate-50 p-4 space-y-3 h-full ">
                <h2 className="text-lg font-bold text-amber-900">Descrição</h2>
                <Separator className="w-4/5 my-4" />
                <p
                  className="leading-relaxed text-slate-600 break-words hyphens-auto [text-align-last:left] [word-break:break-word]"
                  style={{
                    WebkitHyphens: "auto",
                    msHyphens: "auto",
                    hyphens: "auto",
                  }}
                  lang="pt-BR"
                >
                  {pontos.descricao_pt}
                </p>
              </div>
            </div>

            <div className="flex justify-end bg-amber-900 rounded-s-xl">
              <div className="bg-slate-50 p-5 w-[98%]">
                <h3 className="mb-4 text-lg font-bold text-amber-900">
                  Endereço
                </h3>

                <Separator className="w-4/5 my-4" />
                <div className="space-y-3">
                  {endereco.map((item, index) => (
                    <div
                      className="flex items-center p-3 transition-colors rounded-lg hover:bg-orange-100/50"
                      key={index}
                    >
                      <span className="font-semibold min-w-[120px]">
                        {item.label}:
                      </span>
                      <span className="text-slate-600">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex !flex-col gap-5 mt-8 ">
            <Button
              onClick={() =>
                window.open(
                  `https://maps.google.com/?q=${pontos.nome_pt},${pontos.endereco.logradouro_end},${pontos.endereco.cidade_end},${pontos.endereco.cep_end}`
                )
              }
              className="w-full bg-amber-900 hover:bg-amber-950 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
            >
              <MapPinned className="w-5 h-5" />
              Ver no Google Maps
            </Button>
            <DialogClose asChild>
              <Button variant={"secondary"} className="block lg:hidden">
                Fechar
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetalhesPontosTuristicos;
