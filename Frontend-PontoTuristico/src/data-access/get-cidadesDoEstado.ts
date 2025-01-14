import axios from "axios";

export interface Icidades {
  id: number;
  nome: string;
}

export const getCidadesDoEstado = async (uf: string) => {
  try {
    const response = await axios.get<Icidades[]>(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error, "erro no getCidadesDoEstado");
  }
};
