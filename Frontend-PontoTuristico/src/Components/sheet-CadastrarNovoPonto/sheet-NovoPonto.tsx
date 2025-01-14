import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet";
import { Button } from "../ui/button";
import { CircleCheckBig, Plus } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { getAllEstados, IEstados } from "@/data-access/get-allEstados";
import {
  getCidadesDoEstado,
  Icidades,
} from "@/data-access/get-cidadesDoEstado";
import { schemaAddNooPonto } from "@/Schema/addNovoPontoTuristico";
import FormAddNovoPonto from "./form-NovoPonto/form";
import { Separator } from "../ui/separator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/Axios/api";
import { UseSheetNovoPonto } from "@/Context/localizacaoNovoPonto";

export type TypeAddNovoPonto = z.infer<typeof schemaAddNooPonto>;
const NovoPontoTuristico = () => {
  const [estados, setEstados] = useState<IEstados[]>([]);
  const [cidades, setCidades] = useState<Icidades[]>([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { localNovoPonto, setLocalNovoPonto } = UseSheetNovoPonto();

  const form = useForm<TypeAddNovoPonto>({
    resolver: zodResolver(schemaAddNooPonto),
    defaultValues: {
      nome_pt: "",
      descricao_pt: "",
      endereco: {
        cep_end: "",
        logradouro_end: "",
        numero_end: "",
        bairro_end: "",
        cidade_end: "",
        uf_end: "",
        complemento_end: "",
        referencia_end: "",
      },
    },
  });

  useEffect(() => {
    const allEstados = async () => {
      const estados = await getAllEstados();

      if (estados) {
        setEstados(estados.sort((a, b) => a.sigla.localeCompare(b.sigla)));
      }
    };

    allEstados();
  }, []);

  useEffect(() => {
    const getCidades = async () => {
      const ufEstado = estadoSelecionado;
      try {
        const cidadesEstadoSelecionado = await getCidadesDoEstado(ufEstado);

        if (cidadesEstadoSelecionado) {
          setCidades(
            cidadesEstadoSelecionado.sort((a, b) =>
              a.nome.localeCompare(b.nome)
            )
          );
        }
      } catch (error) {
        console.log(error, "erro no getCidades");
      }
    };

    getCidades();
  }, [estadoSelecionado]);

  const mutation = useMutation({
    mutationFn: async (data: TypeAddNovoPonto) => {
      const response = await api.post("/api/PontosTuristicos", data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pontos-turisticos"] });
      toast({
        description: (
          <div className="flex items-center gap-2">
            <CircleCheckBig color="green" size={25} />{" "}
            <h2 className="text-base font-bold">Ponto turistico cadastrado</h2>
          </div>
        ),
        duration: 4000,
        position: "top-center",
      });

      form.reset();

      setLocalNovoPonto(false);
    },
    onError: () => {
      toast({
        title: "Erro ao cadastrar novo ponto turístico",
        description: "Tente novamente mais tarde.",
        duration: 4000,
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: TypeAddNovoPonto) => {
    mutation.mutate(data);
  };
  return (
    <>
      <Sheet open={localNovoPonto} onOpenChange={setLocalNovoPonto}>
        <SheetTrigger asChild>
          <Button>
            Novo ponto turístico <Plus className="scale-110" />
          </Button>
        </SheetTrigger>
        <SheetContent side={"right"} className="overflow-y-auto ">
          <SheetHeader className="py-4 space-y-2">
            <SheetTitle className="font-bold text-blue-900">
              Cadastrar Novo Ponto Turístico
            </SheetTitle>
            <SheetDescription>
              Cadastre um novo ponto turístico com as informações necessárias...
            </SheetDescription>
          </SheetHeader>
          <Separator className="w-1/2 mx-auto my-4" />

          <FormAddNovoPonto
            form={form}
            onSubmit={onSubmit}
            loading={mutation.isPending}
            estados={estados}
            setEstadoSelecionado={setEstadoSelecionado}
            cidades={cidades}
            estadoSelecionado={estadoSelecionado}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default NovoPontoTuristico;
