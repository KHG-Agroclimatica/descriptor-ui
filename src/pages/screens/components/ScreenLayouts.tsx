import { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import MainSectionLayout from "../../../layouts/MainSectionLayout";
import {
  DescriptorContext,
} from "../hooks/useDescriptorProvider";

const ScreenLayouts = () => {
  const { descriptor, setValue } = useContext(DescriptorContext);
  const { state: locationParams } = useLocation();

  useEffect(() => {
    setValue({
      id: locationParams?.id,
      name: locationParams?.name,
    });
  }, []);

  return (
    
      <MainSectionLayout title={descriptor.descriptorName + " / Screens"}>
        <Outlet context={descriptor} />
      </MainSectionLayout>
  );
};

export default ScreenLayouts;
