import Button from "devextreme-react/button";
import { Fragment } from "react";
import FormTemplate from "./components/FormTemplate";

const Register = () => {
  const onClickSave = () => {
    console.log("asdawdas");
  };

  return (
    <Fragment>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h4 className="fw-normal">New screen</h4>

        <Button
          width={120}
          text="Save"
          type="success"
          icon="save"
          stylingMode="contained"
          onClick={onClickSave}
        />
      </div>
      <FormTemplate />
    </Fragment>
  );
};

export default Register;
