import { createContext, useContext } from "react";

export interface IValueDescriptor {
  id: string;
  name: string;
  countryIds: Array<String>;
}

const initialState: IValueDescriptor = {
  id: "",
  name: "",
  countryIds: []
};

export const DescriptorContext = createContext<IValueDescriptor>(initialState);

export const useDescriptorContext = () => {
  const context = useContext(DescriptorContext);
  return context;
};
