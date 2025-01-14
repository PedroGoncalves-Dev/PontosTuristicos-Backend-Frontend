import PontosComponent from "@/Components/PontosTuristicos/ListaDePontosTuristicos";
import NovoPontoTuristico from "@/Components/sheet-CadastrarNovoPonto/sheet-NovoPonto";
import { Input } from "@/Components/ui/input";
import { Separator } from "@/Components/ui/separator";
import { TextAnimate } from "@/Components/ui/text-animate";
import { getAllPontosTuristicos } from "@/data-access/get-allPontosTuristicos";
import { getPesquisaPontosTuristicos } from "@/data-access/get-pesquisaPontosTuristicos";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

const Home = () => {
  const [pesquisa, setPesquisa] = useState("");
  const { data, isLoading, error } = useQuery({
    queryKey: ["pontos-turisticos"],
    queryFn: () => getAllPontosTuristicos(),
  });

  const { data: pontosDaPesquisa, isLoading: isLoadingPesquisa } = useQuery({
    queryKey: ["pontos-turisticos-pesquisa", pesquisa],
    queryFn: () => getPesquisaPontosTuristicos(pesquisa),
  });

  const memorizadoTitulo = useMemo(() => {
    return (
      <>
        <TextAnimate
          animation="fadeIn"
          by="character"
          className="text-2xl font-bold text-center"
        >
          Pontos turisticos
        </TextAnimate>
        <Separator className="w-1/2 mx-auto my-4 " />
      </>
    );
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center w-full mb-5 bg-white rounded-md sm:justify-evenly justify-evenly h-36 sm:h-20 sm:flex-row">
        <Input
          placeholder="Digite um ponto turistico"
          className="w-4/5 mb-5 sm:w-2/4 sm:mb-0"
          onChange={(e) => setPesquisa(e.target.value)}
        />

        <NovoPontoTuristico />
      </div>

      <section className="py-6 bg-white rounded-md min-h-[400px]">
        {memorizadoTitulo}

        <Separator className="w-1/3 mx-auto my-4 " />

        <PontosComponent
          data={pontosDaPesquisa ? pontosDaPesquisa : data ?? []}
          loadingPesquisa={pesquisa.length > 0 && isLoadingPesquisa}
          loading={isLoading}
          error={error}
        />
      </section>
    </div>
  );
};

export default Home;
