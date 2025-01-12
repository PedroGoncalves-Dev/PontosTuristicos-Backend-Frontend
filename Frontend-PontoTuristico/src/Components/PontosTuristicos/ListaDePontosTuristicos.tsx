import React, { useState } from "react";
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
import { Button } from "@/Components/ui/button";
import { MapPinned } from "lucide-react";

interface PontosProps {
  id_pt: number;
  nome_pt: string;
}

const PontosComponent: React.FC<{ data: PontosProps[] }> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4 p-4">
        {currentItems.map((pontos) => (
          <Card key={pontos.id_pt} className="shadow-lg">
            <CardHeader>
              <CardTitle>{pontos.nome_pt}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <CardDescription>Tupã-SP</CardDescription>
              <MapPinned color="green" size={25} />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="transition-all duration-300 ease-out bg-orange-600 hover:bg-orange-700 hover:scale-105">
                Detalhes
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="cursor-pointer"
              aria-disabled={currentPage === 1}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }).map((_, index) => (
            <PaginationItem key={index + 1}>
              <PaginationLink
                onClick={() => setCurrentPage(index + 1)}
                isActive={currentPage === index + 1}
                className="cursor-pointer"
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="cursor-pointer"
              aria-disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PontosComponent;
