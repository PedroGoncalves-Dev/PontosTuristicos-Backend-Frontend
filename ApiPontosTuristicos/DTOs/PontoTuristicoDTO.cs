namespace ApiPontosTuristicos.DTOs
{
    public class PontoTuristicoDTO
    {
        public required string Nome_pt { get; set; }
        public required string Descricao_pt { get; set; }
        public required EnderecoDTO Endereco { get; set; }
    }
}