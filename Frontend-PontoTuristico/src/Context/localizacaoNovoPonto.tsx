import React, { useContext, createContext, useState } from "react";

interface IlocalizacaoNovoPonto {
  localNovoPonto: boolean;
  setLocalNovoPonto: React.Dispatch<React.SetStateAction<boolean>>;
}

const LocalNovoPontoContext = createContext<IlocalizacaoNovoPonto>({
  localNovoPonto: false,
  setLocalNovoPonto: () => {},
});

export const LocalNovoPontoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [localNovoPonto, setLocalNovoPonto] = useState(false);

  return (
    <LocalNovoPontoContext.Provider
      value={{ localNovoPonto, setLocalNovoPonto }}
    >
      {children}
    </LocalNovoPontoContext.Provider>
  );
};

export const UseSheetNovoPonto = () => {
  return useContext(LocalNovoPontoContext);
};
