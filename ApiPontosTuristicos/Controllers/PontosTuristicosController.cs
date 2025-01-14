using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Dapper;
using System.Linq;
using ApiPontosTuristicos.DTOs;

[ApiController]
[Route("api/[controller]")]
public class PontosTuristicosController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly string _connectionString;

    public  PontosTuristicosController(IConfiguration configuration)
    {
        _configuration = configuration;
        _connectionString = _configuration.GetConnectionString("DefaultConnection");
    }

   [HttpGet]
public ActionResult<IEnumerable<PontoTuristico>> Get()
{
    try
    {
        using (SqlConnection conexao = new SqlConnection(_connectionString))
        {
            conexao.Open();
            var query = @"SELECT pt.id_pt, pt.nome_pt, pt.descricao_pt, pt.id_end,
                         e.id_end, e.logradouro_end, e.numero_end, e.bairro_end, 
                         e.cidade_end, e.uf_end, e.cep_end, e.complemento_end 
                         FROM pontos_turisticos pt 
                         INNER JOIN enderecos e ON pt.id_end = e.id_end  order by pt.id_pt desc";
            
            var pontosTuristicos = conexao.Query<PontoTuristico, Endereco, PontoTuristico>(
                query,
                (pontoTuristico, endereco) =>
                {
                    pontoTuristico.Endereco = endereco;
                    return pontoTuristico;
                },
                splitOn: "id_end"
            );

            return Ok(pontosTuristicos);
        }
    }
    catch (Exception ex)
    {
        // Log do erro para debug
        Console.WriteLine(ex.Message);
        return StatusCode(500, new ErroResponse 
        {
            Erro = "Erro interno do servidor",
            Mensagem = ex.Message,
            Timestamp = DateTime.Now
        } );
    }
}

    [HttpGet("{id}")]
    public ActionResult<PontoTuristico> Get(int id)
    {
        try
        {
            using (SqlConnection conexao = new SqlConnection(_connectionString))
            {
                conexao.Open();
                var query = @"SELECT pt.*, e.* 
                            FROM pontos_turisticos pt 
                            INNER JOIN enderecos e ON pt.id_end = e.id_end 
                            WHERE pt.id_pt = @Id";
                
                var pontoTuristico = conexao.Query<PontoTuristico, Endereco, PontoTuristico>(
                    query,
                    (pontoTuristico, endereco) =>
                    {
                        pontoTuristico.Endereco = endereco;
                        return pontoTuristico;
                    },
                    new { Id = id },
                    splitOn: "id_end"
                ).FirstOrDefault();

                if (pontoTuristico == null)
                    return NotFound(new {
                        Erro = "id não encontrado",
                        Mensagem = "Ponto turístico não encontrado",
                        Timestamp = DateTime.Now
                    });

                return Ok(pontoTuristico);
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ErroResponse
            {
                Erro = "Erro interno do servidor",
                Mensagem = ex.Message,
                Timestamp = DateTime.Now
            });
        }
    }

    [HttpPost]
    public ActionResult<PontoTuristico> Post([FromBody] PontoTuristicoDTO pontoTuristicoDto)
    {
        try
        {
            using (SqlConnection conexao = new SqlConnection(_connectionString))
            {
                conexao.Open();
                using (var transaction = conexao.BeginTransaction())
                {
                    try
                    {
                        var enderecoId = conexao.QuerySingle<int>(
                            @"INSERT INTO enderecos (cep_end, logradouro_end, numero_end, 
                            bairro_end, cidade_end, uf_end, complemento_end) 
                            VALUES (@Cep_end, @Logradouro_end, @Numero_end, @Bairro_end, 
                            @Cidade_end, @Uf_end, @Complemento_end); 
                            SELECT CAST(SCOPE_IDENTITY() as int)",
                            pontoTuristicoDto.Endereco,
                            transaction);

                        var pontoTuristicoId = conexao.QuerySingle<int>(
                            @"INSERT INTO pontos_turisticos (nome_pt, descricao_pt, id_end) 
                            VALUES (@Nome_pt, @Descricao_pt, @Id_end); 
                            SELECT CAST(SCOPE_IDENTITY() as int)",
                            new
                            {
                                pontoTuristicoDto.Nome_pt,
                                pontoTuristicoDto.Descricao_pt,
                                Id_end = enderecoId
                            },
                            transaction);

                        transaction.Commit();
                        return CreatedAtAction(nameof(Get), new { id = pontoTuristicoId }, pontoTuristicoDto);
                    }
                    catch
                    {
                        transaction.Rollback();
                        throw;
                    }
                }
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ErroResponse 
            {
                Erro = "Erro interno do servidor",
                Mensagem = ex.Message,
                Timestamp = DateTime.Now
            });
        }
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody] PontoTuristicoDTO pontoTuristicoDto)
    {
        try
        {
            using (SqlConnection conexao = new SqlConnection(_connectionString))
            {
                conexao.Open();
                using (var transaction = conexao.BeginTransaction())
                {
                    try
                    {
                        var pontoTuristico = conexao.QueryFirstOrDefault<PontoTuristico>(
                            "SELECT * FROM pontos_turisticos WHERE id_pt = @Id",
                            new { Id = id },
                            transaction);

                        if (pontoTuristico == null)
                            return NotFound();

                        conexao.Execute(
                            @"UPDATE pontos_turisticos 
                            SET nome_pt = @Nome_pt, descricao_pt = @Descricao_pt 
                            WHERE id_pt = @Id",
                            new
                            {
                                Id = id,
                                pontoTuristicoDto.Nome_pt,
                                pontoTuristicoDto.Descricao_pt
                            },
                            transaction);

                        conexao.Execute(
                            @"UPDATE enderecos 
                            SET cep_end = @Cep_end, logradouro_end = @Logradouro_end, 
                            numero_end = @Numero_end, bairro_end = @Bairro_end, 
                            cidade_end = @Cidade_end, uf_end = @Uf_end, 
                            complemento_end = @Complemento_end 
                            WHERE id_end = @Id_end",
                            new
                            {
                                Id_end = pontoTuristico.Id_end,
                                pontoTuristicoDto.Endereco.Cep_end,
                                pontoTuristicoDto.Endereco.Logradouro_end,
                                pontoTuristicoDto.Endereco.Numero_end,
                                pontoTuristicoDto.Endereco.Bairro_end,
                                pontoTuristicoDto.Endereco.Cidade_end,
                                pontoTuristicoDto.Endereco.Uf_end,
                                pontoTuristicoDto.Endereco.Complemento_end
                            },
                            transaction);

                        transaction.Commit();
                        return NoContent();
                    }
                    catch
                    {
                        transaction.Rollback();
                        throw;
                    }
                }
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ErroResponse 
            {
                Erro = "Erro interno do servidor",
                Mensagem = ex.Message,
                Timestamp = DateTime.Now
            });
        }
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        try
        {
            using (SqlConnection conexao = new SqlConnection(_connectionString))
            {
                conexao.Open();
                using (var transaction = conexao.BeginTransaction())
                {
                    try
                    {
                        var pontoTuristico = conexao.QueryFirstOrDefault<PontoTuristico>(
                            "SELECT * FROM pontos_turisticos WHERE id_pt = @Id",
                            new { Id = id },
                            transaction);

                        if (pontoTuristico == null)
                            return NotFound();

                        conexao.Execute(
                            "DELETE FROM pontos_turisticos WHERE id_pt = @Id",
                            new { Id = id },
                            transaction);

                        conexao.Execute(
                            "DELETE FROM enderecos WHERE id_end = @Id_end",
                            new { Id_end = pontoTuristico.Id_end },
                            transaction);

                        transaction.Commit();
                        return NoContent();
                    }
                    catch
                    {
                        transaction.Rollback();
                        throw;
                    }
                }
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ErroResponse 
            {
                Erro = "Erro interno do servidor",
                Mensagem = ex.Message,
                Timestamp = DateTime.Now
            });
        }
    }
}
