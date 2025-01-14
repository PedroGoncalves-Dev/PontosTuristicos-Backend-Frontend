import { z } from "zod";

export const schemaAddNooPonto = z
  .object({
    nome_pt: z
      .string()
      .min(2, "O nome do ponto turístico deve ter no mínimo 2 caracteres")
      .trim(),
    descricao_pt: z
      .string()
      .min(2, "A descrição do ponto turístico deve ter no mínimo 2 caracteres")
      .max(
        100,
        "A descrição do ponto turístico deve ter no máximo 100 caracteres"
      )
      .trim(),

    endereco: z.object({
      cep_end: z
        .string()
        .max(8, "O CEP deve ter no máximo 8 caracteres")
        .optional(),
      logradouro_end: z
        .string()
        .max(50, "O logradouro deve ter no máximo 50 caracteres")
        .optional(),
      numero_end: z
        .string()
        .max(10, "O número deve ter no máximo 10 caracteres")
        .optional(),
      bairro_end: z
        .string()
        .max(50, "O bairro deve ter no máximo 50 caracteres")
        .optional(),
      cidade_end: z
        .string()
        .min(2, "A cidade deve ter no mínimo 2 caracteres")
        .max(50, "A cidade deve ter no máximo 50 caracteres"),
      uf_end: z
        .string()
        .min(2, "A UF deve ter no mínimo 2 caracteres")
        .max(2, "A UF deve ter no máximo 2 caracteres"),
      complemento_end: z
        .string()
        .max(50, "O complemento deve ter no máximo 50 caracteres")
        .optional(),
      referencia_end: z
        .string()
        .max(50, "A referência deve ter no máximo 50 caracteres")
        .optional(),
    }),
  })
  .superRefine((data, ctx) => {
    const temEnderecoCompleto =
      data.endereco.logradouro_end && data.endereco.bairro_end;

    const temReferencia = data.endereco.referencia_end;

    if (!temEnderecoCompleto && !temReferencia) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "É necessário preencher o endereço completo (logradouro, bairro e número) ou a referência",
        path: ["endereco.logradouro_end"],
      });

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "É necessário preencher o endereço completo (logradouro, bairro e número) ou a referência",
        path: ["endereco.referencia_end"],
      });
    }
  });
