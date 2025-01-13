import { InputMask, format } from "@react-input/mask";

import { Control, Controller } from "react-hook-form";
import { TypeAddNovoPonto } from "../sheet-CadastrarNovoPonto/sheet-NovoPonto";

interface IpropsMask {
  mask: string;
  name: keyof TypeAddNovoPonto;
  placeholder?: string;
  className?: string;
  control: Control<TypeAddNovoPonto>;
  valor?: string;
}

const MascaraInput = ({
  mask,
  name,
  placeholder,
  className,
  control,
  valor,
}: IpropsMask) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value, ...field } }) => {
      const maskOptions = { mask, replacement: { _: /\d/ } };
      const formattedValue = value ? format(value, maskOptions) : "";

      return (
        <InputMask
          {...field}
          value={formattedValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            // Remove caracteres não numéricos para outros campos
            const numericValue = e.target.value.replace(/\D/g, "");
            onChange(numericValue);
          }}
          mask={mask}
          replacement="_"
          placeholder={placeholder}
          className={`${className}`}
          showMask={false}
          separate
        />
      );
    }}
  />
);

export default MascaraInput;
