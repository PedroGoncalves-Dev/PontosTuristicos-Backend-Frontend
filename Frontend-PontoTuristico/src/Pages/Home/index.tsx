import PontosComponent from "@/Components/PontosTuristicos/ListaDePontosTuristicos";
import NovoPontoTuristico from "@/Components/sheet-CadastrarNovoPonto/sheet-NovoPonto";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Separator } from "@/Components/ui/separator";
import { getAllPontosTuristicos } from "@/data-access/get-allPontosTuristicos";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pontos-turisticos"],
    queryFn: () => getAllPontosTuristicos(),
  });

  return (
    <div className="container mx-auto">
      <h1>Home</h1>

      <div className="flex flex-col items-center justify-around w-full h-20 mb-5 bg-white sm:flex-row">
        <Input
          placeholder="Digite um ponto turistico"
          className="w-4/5 mb-5 sm:w-2/4 sm:mb-0"
        />
        <NovoPontoTuristico />
      </div>

      <section className="py-6 bg-white">
        <h1 className="text-2xl font-bold text-center">Pontos turisticos</h1>
        <Separator className="w-1/2 mx-auto my-4 " />

        <PontosComponent data={data || []} />
      </section>
    </div>
  );
};

export default Home;
