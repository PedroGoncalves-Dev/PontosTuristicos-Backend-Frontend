import { api } from "@/Axios/api";

interface IpontosTuristicos {
  id: number;
  nome: string;
  descricao: string;
  cidade: string;
  estado: string;
}

export const getAllPontosTuristicos = async () => {
  const response = await api.get<IpontosTuristicos[]>("/api/PontosTuristicos");

  return response.data;
};
