import { api } from "@/Axios/api";

interface IpontosTuristicosEndereco {
  cep_end: string;
  logradouro_end: string;
  numero_end: string;
  bairro_end: string;
  cidade_end: string;
  uf_end: string;
  complemento_end: string;
  referencia_end: string;
}
export interface IpontosTuristicos {
  id_pt: number;
  nome_pt: string;
  descricao_pt: string;
  endereco: IpontosTuristicosEndereco;
}

export const getAllPontosTuristicos = async () => {
  const response = await api.get<IpontosTuristicos[]>("/api/PontosTuristicos");

  return response.data;
};
