import { createContext, useState } from "react";

interface IDescriptorState {
  descriptorId: string;
  descriptorName: string;
}

interface IDescriptorContextState {
  descriptor: IDescriptorState;
  setValue: (data?: any) => void;
}

const initialState: IDescriptorState = {
  descriptorId: "",
  descriptorName: "",
};

export const DescriptorContext = createContext<IDescriptorContextState>({
  descriptor: initialState,
  setValue: () => {},
});

export const DescriptorProvider = ({ children }: any) => {
  const [descriptor, setDescriptor] = useState<IDescriptorState>(initialState);

  const setDescriptorValues = (locationParams: any) => {
    setDescriptor({
      descriptorId: locationParams?.id ?? "",
      descriptorName: locationParams?.name,
    });
  };

  return (
    <DescriptorContext.Provider
      value={{
        descriptor,
        setValue: setDescriptorValues,
      }}
    >
      {children}
    </DescriptorContext.Provider>
  );
};
