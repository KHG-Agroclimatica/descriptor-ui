import DataGrid, { Column, Editing, Toolbar, Item, Button } from 'devextreme-react/data-grid'
import { Button as ButtonToolbar } from "devextreme-react/button";

const ImageMasterTable = ({ onClickAdd, dataSource, onClickEdit, onClickDelete }: any) => {
  return (

    <DataGrid dataSource={dataSource} keyExpr='_id'>
      <Editing allowAdding={true} allowUpdating={true} allowDeleting={true}></Editing>
      <Toolbar>
        <Item location="before">
          <ButtonToolbar icon="plus" onClick={onClickAdd} />
        </Item>
      </Toolbar>
      <Column dataField="name" />
      <Column dataField="uri" />
      <Column type="buttons" width={110}>
        <Button icon="edit" onClick={onClickEdit}></Button>
        <Button name="delete" icon="trash" onClick={onClickDelete} />
      </Column>
    </DataGrid>
  )
}

export default ImageMasterTable
