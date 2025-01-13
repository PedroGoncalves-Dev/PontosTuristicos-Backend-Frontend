import axios from "axios";

export interface IEstados {
  id: number;
  sigla: string;
  nome: string;
}

export async function getAllEstados() {
  try {
    const response = await axios.get<IEstados[]>(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error, "erro no getAllEstados");
  }
}
