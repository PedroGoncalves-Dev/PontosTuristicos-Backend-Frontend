import { InputMask, format } from "@react-input/mask";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface IpropsMask<T extends FieldValues> {
  mask: string;
  name: Path<T>;
  placeholder?: string;
  className?: string;
  control: Control<T>;
  valor?: string;
}

function MascaraInput<T extends FieldValues>({
  mask,
  name,
  placeholder,
  className,
  control,
}: IpropsMask<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field } }) => {
        const maskOptions = { mask, replacement: { _: /\d/ } };
        const formattedValue = value
          ? format(value.toString(), maskOptions)
          : "";

        return (
          <InputMask
            {...field}
            value={formattedValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const numericValue = e.target.value.replace(/\D/g, "");
              onChange(numericValue);
            }}
            mask={mask}
            replacement="_"
            placeholder={placeholder}
            className={`${className}`}
            showMask={false}
            separate
            autoComplete="off"
          />
        );
      }}
    />
  );
}

export default MascaraInput;
