import { List } from "devextreme-react";
import { ItemDragging } from "devextreme-react/list";
import { useContext, useEffect, useState } from "react";
import { sendRequest } from "../../../utils/request";
import { DescriptorContext } from "../hooks/useDescriptorProvider";
import "../styles/listDragDrop.css";

interface ArrayItem {
  _id: string;
  text: string;
}

interface initialState {
  fields: Array<ArrayItem>;
  results: Array<ArrayItem>;
}

interface eventHandlerProps {
  fromData: "fields" | "results";
  fromIndex: number;
  itemData: any;
  toData: "fields" | "results";
  toIndex: number;
}

const ListFields = () => {
  const { descriptor } = useContext(DescriptorContext);
  const [fieldList, setFieldList] = useState<initialState>({
    fields: [],
    results: [],
  });

  useEffect(() => {
    sendRequest(
      "http://localhost:3000/descriptor/fields/" + descriptor.descriptorId
    ).then((resp) => {
      setFieldList({
        fields: resp,
        results: [],
      });
    });
  }, []);

  const onDragStart = (e: eventHandlerProps) => {
    e.itemData = fieldList[e?.fromData][e.fromIndex];
  };

  const onAdd = (e: eventHandlerProps) => {
    setFieldList((dataPrevious) => {
      const tasks = dataPrevious[e.toData];

      return {
        ...dataPrevious,
        [e.toData]: [
          ...tasks.slice(0, e.toIndex),
          e.itemData,
          ...tasks.slice(e.toIndex),
        ],
      };
    });
  };

  const onRemove = (e: eventHandlerProps) => {
    const tasks = fieldList[e.fromData];

    setFieldList((dataPrevious) => ({
      ...dataPrevious,
      [e.fromData]: [
        ...tasks.slice(0, e.fromIndex),
        ...tasks.slice(e.fromIndex + 1),
      ],
    }));
  };

  const onReorder = (e: any) => {
    onRemove(e);
    onAdd(e);
  };

  return (
    <>
      <p className="fw-bolder label-field" >Drag fields from left to right</p>
      <div className="widget-container">
        <div>
          <h3></h3>
          <List
            dataSource={fieldList.fields}
            keyExpr="_id"
            displayExpr="name"
            repaintChangesOnly={true}
          >
            <ItemDragging
              allowReordering={true}
              group="tasks"
              data="fields"
              onDragStart={onDragStart}
              onAdd={onAdd}
              onRemove={onRemove}
              onReorder={onReorder}
            ></ItemDragging>
          </List>
        </div>
        <div>
          <List
            dataSource={fieldList.results}
            keyExpr="_id"
            displayExpr="name"
            repaintChangesOnly={true}
          >
            <ItemDragging
              allowReordering={true}
              group="tasks"
              data="results"
              onDragStart={onDragStart}
              onAdd={onAdd}
              onRemove={onRemove}
              onReorder={onReorder}
            ></ItemDragging>
          </List>
        </div>
      </div>
    </>
  );
};

export default ListFields;
