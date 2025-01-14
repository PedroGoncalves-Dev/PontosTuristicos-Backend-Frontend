import { api } from "@/Axios/api";
import { IpontosTuristicos } from "./get-allPontosTuristicos";

export const getPesquisaPontosTuristicos = async (pesquisa: string) => {
  if (pesquisa.length > 0) {
    const response = await api.get<IpontosTuristicos[]>(
      `/api/PontosTuristicos/search?query=${pesquisa}`
    );

    return response.data;
  } else {
    throw new Error("pesquisa vazia");
  }
};
