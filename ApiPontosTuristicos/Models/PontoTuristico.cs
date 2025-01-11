public class PontoTuristico
{
    public int Id_pt { get; set; }
    public required string Nome_pt { get; set; }
    public required string Descricao_pt { get; set; }
    public int Id_end { get; set; }
    public required virtual Endereco Endereco { get; set; }
}
