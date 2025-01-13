import { api } from "@/Axios/api";

interface IpontosTuristicos {
  id_pt: number;
  nome_pt: string;
  descricao_pt: string;
  cidade: string;
  estado: string;
}

export const getAllPontosTuristicos = async () => {
  const response = await api.get<IpontosTuristicos[]>("/api/PontosTuristicos");

  return response.data;
};
