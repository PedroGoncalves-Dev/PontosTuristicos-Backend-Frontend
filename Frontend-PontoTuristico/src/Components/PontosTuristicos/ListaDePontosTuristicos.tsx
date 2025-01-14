import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/Components/ui/card";

import { Skeleton } from "@/Components/ui/skeleton";
import DetalhesPontosTuristicos from "./detalhesPontosTuristicos";
import { IpontosTuristicos } from "@/data-access/get-allPontosTuristicos";
import { Frown, MapPinned } from "lucide-react";
interface IpropsPontosTuristicos {
  data: IpontosTuristicos[];
  loading: boolean;
  loadingPesquisa: boolean;
  error: Error | null;
}

const PontosComponent = ({
  data,
  loading,
  error,
  loadingPesquisa,
}: IpropsPontosTuristicos) => {
  const [paginaAtual, setpaginaAtual] = useState(1);
  const itemsPorPagina = 6;

  const indexDoUltimoItem = paginaAtual * itemsPorPagina;
  const indexdoPrimeiroItem = indexDoUltimoItem - itemsPorPagina;
  const itemsAtuais = data.slice(indexdoPrimeiroItem, indexDoUltimoItem);
  const totalPaginas = Math.ceil(data.length / itemsPorPagina);

  const esqueletoDeLoaidng = [
    {
      skeleton: () => (
        <>
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </>
      ),
    },
    {
      skeleton: () => (
        <>
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </>
      ),
    },
    {
      skeleton: () => (
        <>
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 p-4 lg:grid-cols-2 xl:grid-cols-3">
        {loading &&
          esqueletoDeLoaidng.map((esqueleto, index) => (
            <div className="flex flex-col space-y-3" key={index}>
              {esqueleto.skeleton()}
            </div>
          ))}

        {error && <p>Não foi possivel carregar os pontos turisticos</p>}

        {!loadingPesquisa ? (
          itemsAtuais.length > 0 ? (
            itemsAtuais.map((pontos) => (
              <Card
                key={pontos.id_pt}
                className="flex flex-col justify-between shadow-lg "
              >
                <CardHeader>
                  <CardTitle>{pontos.nome_pt}</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                  <CardDescription>
                    {pontos.endereco.cidade_end} - {pontos.endereco.uf_end}
                  </CardDescription>
                  <MapPinned color="green" size={25} />
                </CardContent>

                <CardFooter className="flex justify-end">
                  <DetalhesPontosTuristicos pontos={pontos} />
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="flex items-center text-slate-500">
              Nenhum ponto turístico encontrado <Frown size={50} />
            </p>
          )
        ) : (
          esqueletoDeLoaidng.map((esqueleto, index) => (
            <div className="flex flex-col space-y-3" key={index}>
              {esqueleto.skeleton()}
            </div>
          ))
        )}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setpaginaAtual((prev) => Math.max(prev - 1, 1))}
              className="cursor-pointer"
              aria-disabled={paginaAtual === 1}
            />
          </PaginationItem>

          {Array.from({ length: totalPaginas }).map((_, index) => (
            <PaginationItem key={index + 1}>
              <PaginationLink
                onClick={() => setpaginaAtual(index + 1)}
                isActive={paginaAtual === index + 1}
                className="cursor-pointer"
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setpaginaAtual((prev) => Math.min(prev + 1, totalPaginas))
              }
              className="cursor-pointer"
              aria-disabled={paginaAtual === totalPaginas}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PontosComponent;
