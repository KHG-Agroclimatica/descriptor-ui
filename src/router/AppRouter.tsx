import { createBrowserRouter } from "react-router-dom";
import { ListClassificationPage } from "../pages/classification";
import { ListDescriptor } from "../pages/descriptor";
import { ListField } from "../pages/field";
import {
  ItemLayout as ItemContainerLayout,
  ListDescriptorItem,
  RegisterDescriptorItem,
} from "../pages/item";

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
    element: <ListDescriptor />,
  },
  {
    path: "descriptorItems",
    element: <ItemContainerLayout />,
    children: [
      {
        index: true,
        element: <ListDescriptorItem />,
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
    path: 'classification',
    element: <ListClassificationPage/>
  },
  {
    path: "*",
    element: <div>Not found</div>,
  },
]);

export default AppRouter;
