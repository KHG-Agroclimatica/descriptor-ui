import { DataGrid } from "devextreme-react";
import { Button } from "devextreme-react/button";
import {
  Column,
  Editing,
  Item,
  Scrolling,
  Toolbar,
} from "devextreme-react/data-grid";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DescriptorContext } from "./hooks/useDescriptorProvider";

const List = () => {
  const {descriptor} = useContext(DescriptorContext);
  const navigate = useNavigate();

  console.log(descriptor);

  return (
      <DataGrid dataSource={[]} keyExpr="_id">
        <Scrolling mode="virtual" />
        <Toolbar>
          <Item location="before">
            <Button
              icon="plus"
              type="success"
              text="New"
              onClick={(e) => navigate('./new')}
            />
          </Item>
        </Toolbar>
        <Editing allowDeleting={true} />
        <Column dataField="order" />
        <Column dataField="name" />
        <Column dataField="description" />
        <Column dataField="fields" />
      </DataGrid>
  );
};

export default List;
