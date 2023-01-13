import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import MainSectionLayout from "../../../layouts/MainSectionLayout";
import { ConfigEnv } from "../../../utils/configEnv";
import { sendRequest } from "../../../utils/request";
import {
  DescriptorContext,
  IValueDescriptor,
  useDescriptorContext,
} from "../context/DescriptorContext";

export const ItemLayoutSection = () => {
  const { name } = useDescriptorContext();

  return (
    <MainSectionLayout title={name}>
      <Outlet />
    </MainSectionLayout>
  );
};

const ItemLayout = () => {
  const location = useLocation();
  const [state, setState] = useState<IValueDescriptor>({
    id: "",
    name: "",
    countryIds: [],
  });

  useEffect(() => {
    sendRequest(`${ConfigEnv.DESCRIPTOR_API_URL}/descriptor/${location.state.id}`).then(
      (data) => {
        setState({
          id: location.state.id,
          name: location.state.name,
          countryIds: data.countryIds,
        });
      }
    );
  }, []);

  return (
    <DescriptorContext.Provider value={state}>
      <ItemLayoutSection />
    </DescriptorContext.Provider>
  );
};

export default ItemLayout;
