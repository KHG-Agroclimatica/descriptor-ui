import { createBrowserRouter, Outlet } from "react-router-dom";
import { ListDescriptor } from "../pages/descriptor";
import { ListField } from "../pages/field";
import {
  ItemLayout as ItemContainerLayout,
  ListDescriptorItem,
  RegisterDescriptorItem,
} from "../pages/item";
import FileUploaderImage from "../pages/item/components/ImageField/FileUploaderImage";
import ImageFormUpload from "../pages/item/components/ImageField/ImageFormUpload";
import {
  ListScreenDescriptor,
  NewScreenDescriptor,
  ScreenLayout,
} from "../pages/screens";
import { DescriptorProvider } from "../pages/screens/hooks/useDescriptorProvider";

const AppRouter = createBrowserRouter([
  {
    index: true,
    element: <div>Home</div>,
  },
  {
    path: "field",
    element: <ListField />,
  },
  {
    path: "descriptor",
    element: <Outlet />,
    children: [
      {
        index: true,
        // element: <FileUploaderImage />,
        element: <ListDescriptor />,
      },
      {
        path: ":id/screens",
        element: (
          <DescriptorProvider>
            <ScreenLayout />
          </DescriptorProvider>
        ),
        children: [
          {
            index: true,
            element: <ListScreenDescriptor />,
          },
          {
            path: "new",
            element: <NewScreenDescriptor />,
          },
        ],
      },
    ],
  },
  {
    path: "screen",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <div>hello world</div>,
      },
    ],
  },
  {
    path: "descriptorItems",
    element: <ItemContainerLayout />,
    children: [
      {
        index: true,
        element: <ListDescriptorItem />,
        // element: <ImageFormUpload />,
      },
      {
        path: "new",
        element: <RegisterDescriptorItem />,
      },
      {
        path: ":id",
        element: <RegisterDescriptorItem />,
      },
    ],
  },
  {
    path: "*",
    element: <div>Not found</div>,
  },
]);

export default AppRouter;
