-- Criar o banco de dados
CREATE DATABASE banco_teste_sinqia;
GO

-- Usar o banco de dados criado
USE banco_teste_sinqia;
GO

-- Criar tabela de endereços
CREATE TABLE enderecos (
    id_end INT IDENTITY(1,1) PRIMARY KEY,
    cep_end VARCHAR(9) NULL,
    logradouro_end VARCHAR(100) NULL,
    numero_end VARCHAR(10) NULL,
    bairro_end VARCHAR(50) NULL,
    cidade_end VARCHAR(100) NOT NULL,
    uf_end VARCHAR(2) NOT NULL,
    complemento_end VARCHAR(100) NULL,
    referencia_end VARCHAR(100) NULL
);

-- Criar tabela de pontos turísticos
CREATE TABLE pontos_turisticos (
    id_pt INT IDENTITY(1,1) PRIMARY KEY,
    nome_pt VARCHAR(100) NOT NULL,
    descricao_pt VARCHAR(100) NOT NULL,
    id_end INT NOT NULL,
    FOREIGN KEY (id_end) REFERENCES enderecos(id_end)
);
