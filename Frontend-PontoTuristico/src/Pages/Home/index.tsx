import PontosComponent from "@/Components/PontosTuristicos/ListaDePontosTuristicos";
import NovoPontoTuristico from "@/Components/sheet-CadastrarNovoPonto/sheet-NovoPonto";
import { Input } from "@/Components/ui/input";
import { Separator } from "@/Components/ui/separator";
import { TextAnimate } from "@/Components/ui/text-animate";
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

      <div className="flex flex-col items-center w-full mb-5 bg-white rounded-md sm:justify-around justify-evenly h-36 sm:h-20 sm:flex-row">
        <Input
          placeholder="Digite um ponto turistico"
          className="w-4/5 mb-5 sm:w-2/4 sm:mb-0"
        />
        <NovoPontoTuristico />
      </div>

      <section className="py-6 bg-white rounded-md">
        <TextAnimate
          animation="fadeIn"
          by="character"
          className="text-2xl font-bold text-center"
        >
          Pontos turisticos
        </TextAnimate>

        <Separator className="w-1/2 mx-auto my-4 " />

        <PontosComponent data={data || []} loading={isLoading} error={error} />
      </section>
    </div>
  );
};

export default Home;
