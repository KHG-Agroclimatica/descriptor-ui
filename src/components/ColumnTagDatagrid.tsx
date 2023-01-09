import TagBox from "devextreme-react/tag-box";

export const cellTemplate = (container: any, options: any) => {
  const noBreakStore = "\u00A0";
  const text = (options.value || [])
    .map((element: any) => options.column.lookup.calculateCellValue(element))
    .join(", ");
  container.textContent = text || noBreakStore;
  container.title = text;
};

const TagBoxDatagrid = (props: any) => {
  const onValueChanged = (e) => {
    props.data.setValue(e.value);
  };

  const onSelectionChanged = () => {
    props.data.component.updateDimensions();
  };

  return (
    <TagBox
      dataSource={props?.data.column.lookup.dataSource}
      defaultValue={props.data.value}
      valueExpr="_id"
      displayExpr="name"
      showSelectionControls={true}
      maxDisplayedTags={2}
      showMultiTagOnly={false}
      applyValueMode="useButtons"
      searchEnabled={false}
      onValueChanged={onValueChanged}
      onSelectionChanged={onSelectionChanged}
    />
  );
};

export default TagBoxDatagrid;
