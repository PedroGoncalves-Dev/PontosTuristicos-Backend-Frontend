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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import MascaraInput from "../MascaraInput/mascaraInput";
import { useEffect, useState } from "react";
import { getAllEstados, IEstados } from "@/data-access/get-allEstados";

const schemaAddNooPonto = z.object({
  nome_pt: z
    .string()
    .min(2, "O nome do ponto turístico deve ter no mínimo 2 caracteres")
    .trim(),
  descricao_pt: z
    .string()
    .min(2, "A descrição do ponto turístico deve ter no mínimo 2 caracteres")
    .max(
      100,
      "A descrição do ponto turístico deve ter no máximo 100 caracteres"
    )
    .trim(),
  cep_end: z
    .string()
    .max(8, "O CEP deve ter no máximo 8 caracteres")
    .optional(),
  logradouro_end: z
    .string()
    .max(50, "O logradouro deve ter no máximo 50 caracteres"),
  numero_end: z
    .string()
    .max(10, "O número deve ter no máximo 10 caracteres")
    .optional(),
  bairro_end: z.string().max(50, "O bairro deve ter no máximo 50 caracteres"),
  cidade_end: z.string().max(50, "A cidade deve ter no máximo 50 caracteres"),
  uf_end: z.string().max(2, "A UF deve ter no máximo 2 caracteres"),
  complemento_end: z
    .string()
    .max(50, "O complemento deve ter no máximo 50 caracteres")
    .optional(),
  referencia_end: z
    .string()
    .max(50, "A referência deve ter no máximo 50 caracteres")
    .optional(),
});

export type TypeAddNovoPonto = z.infer<typeof schemaAddNooPonto>;
const NovoPontoTuristico = () => {
  const [estados, setEstados] = useState<IEstados[]>([]);

  useEffect(() => {
    const allEstados = async () => {
      const estados = await getAllEstados();

      if (estados) {
        setEstados(estados);
      }
    };

    allEstados();
  }, []);
  const form = useForm<TypeAddNovoPonto>({
    resolver: zodResolver(schemaAddNooPonto),
    defaultValues: {
      nome_pt: "",
      descricao_pt: "",
      cep_end: "",
      logradouro_end: "",
      numero_end: "",
      bairro_end: "",
      cidade_end: "",
      uf_end: "",
      complemento_end: "",
      referencia_end: "",
    },
  });
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button>
            Novo ponto turístico <Plus className="scale-110" />
          </Button>
        </SheetTrigger>
        <SheetContent side={"right"} className="overflow-y-auto">
          <SheetHeader className="py-4 space-y-2">
            <SheetTitle className="font-bold text-blue-900">
              Cadastrar Novo Ponto Turístico
            </SheetTitle>
            <SheetDescription>
              Cadastre um novo ponto turistico com as informações necessárias...
            </SheetDescription>
          </SheetHeader>
          <Separator className="w-1/2 mx-auto my-4" />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => console.log(data))}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="nome_pt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do ponto turístico:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o nome do ponto turístico"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="descricao_pt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição do ponto turístico:</FormLabel>
                    <FormDescription>Maximo de 100 caracteres</FormDescription>
                    <FormControl>
                      <Textarea
                        maxLength={100}
                        placeholder="Digite a descrição do ponto turístico"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* <Switch /> */}

              <FormField
                control={form.control}
                name="cep_end"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>CEP:</FormLabel>
                    <FormControl>
                      <MascaraInput
                        control={form.control}
                        name="cep_end"
                        mask="_____-___"
                        placeholder="00000-000"
                        className="w-1/3 border-b-2 outline-none"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="logradouro_end"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logradouro:</FormLabel>
                    <FormControl>
                      <Input placeholder="Rua, Avenida, etc" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-6 sm:grid-cols-2 sm:grid sm:space-y-0">
                <FormField
                  control={form.control}
                  name="numero_end"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número:</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o número"
                          {...field}
                          className="w-2/3 border-t-0 border-b-2 border-l-0 border-r-0 !shadow-none rounded-none"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bairro_end"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bairro:</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o bairro" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="uf_end"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UF:</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma UF" />
                        </SelectTrigger>
                        <SelectContent>
                          {estados.map((estados) => (
                            <SelectItem key={estados.id} value={estados.sigla}>
                              {estados.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Cadastrar
              </Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default NovoPontoTuristico;
