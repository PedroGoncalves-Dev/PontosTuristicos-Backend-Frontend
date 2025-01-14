import MascaraInput from "@/Components/MascaraInput/mascaraInput";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { TypeAddNovoPonto } from "../sheet-NovoPonto";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
import { SheetClose } from "@/Components/ui/sheet";
import React, { useEffect } from "react";
import { Icidades } from "@/data-access/get-cidadesDoEstado";
import { IEstados } from "@/data-access/get-allEstados";
import axios from "axios";
import { RefreshCw } from "lucide-react";

interface IpropsForm {
  form: UseFormReturn<TypeAddNovoPonto>;
  onSubmit: (data: TypeAddNovoPonto) => void;
  loading: boolean;
  estadoSelecionado: string;
  setEstadoSelecionado: React.Dispatch<React.SetStateAction<string>>;
  cidades: Icidades[];
  estados: IEstados[];
}
const FormAddNovoPonto = ({
  onSubmit,
  form,
  loading,
  estadoSelecionado,
  setEstadoSelecionado,
  cidades,
  estados,
}: IpropsForm) => {
  const cepDigitado = form.watch("endereco.cep_end");

  useEffect(() => {
    const handleCepDigitado = async () => {
      if (cepDigitado?.length === 8) {
        // Busca dados do CEP
        const response = await axios.get(
          `https://viacep.com.br/ws/${cepDigitado}/json/`
        );

        const uf = response.data.uf;
        setEstadoSelecionado(uf);
        form.setValue("endereco.uf_end", uf);

        // Depois atualiza os outros campos incluindo a cidade
        form.setValue("endereco.logradouro_end", response.data.logradouro);
        form.setValue("endereco.bairro_end", response.data.bairro);
        form.setValue("endereco.complemento_end", response.data.complemento);

        setTimeout(() => {
          form.setValue("endereco.cidade_end", response.data.localidade, {
            shouldDirty: true,
          });
        }, 10);
      }
    };

    handleCepDigitado();
  }, [cepDigitado, form]);
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    max={50}
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
                <FormDescription>Maximo 100 caracteres</FormDescription>
                <FormControl>
                  <Textarea
                    maxLength={100}
                    placeholder="Digite a descrição do ponto turístico"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endereco.cep_end"
            render={() => (
              <FormItem className="flex flex-col">
                <FormLabel>CEP:</FormLabel>
                <FormControl>
                  <MascaraInput<TypeAddNovoPonto>
                    control={form.control}
                    name="endereco.cep_end"
                    mask="_____-___"
                    placeholder="00000-000"
                    className="w-1/3 border-b-2 outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endereco.logradouro_end"
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
              name="endereco.numero_end"
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endereco.bairro_end"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bairro:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o bairro"
                      {...field}
                      maxLength={50}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="endereco.referencia_end"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Referência de localização:</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Digite um ponto de referência "
                    maxLength={50}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2">
            <FormField
              control={form.control}
              name="endereco.uf_end"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>UF:</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setEstadoSelecionado(value);

                        form.setValue("endereco.cidade_end", "");
                      }}
                      value={field.value}
                    >
                      <SelectTrigger className="w-2/3">
                        <SelectValue placeholder="Selecione uma UF" />
                      </SelectTrigger>
                      <SelectContent className="w-2/3">
                        <SelectGroup>
                          {estados.map((estados) => (
                            <SelectItem key={estados.id} value={estados.sigla}>
                              {estados.sigla}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endereco.cidade_end"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade:</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      disabled={!estadoSelecionado}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            estadoSelecionado
                              ? "Selecione uma cidade"
                              : "Selecione uma UF"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {cidades.map((cidades) => (
                            <SelectItem key={cidades.id} value={cidades.nome}>
                              {cidades.nome}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <RefreshCw className="animate-spin" /> Carregando
              </>
            ) : (
              "Cadastrar"
            )}
          </Button>

          <SheetClose asChild className="block sm:hidden">
            <Button variant={"secondary"} className="w-full">
              Fechar
            </Button>
          </SheetClose>
        </form>
      </Form>
    </>
  );
};

export default FormAddNovoPonto;
