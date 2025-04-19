import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const InvoicesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.companyId)) {
                error["companyId"] = `CompanyId field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.itemId)) {
                error["itemId"] = `ItemId field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            companyId: _entity?.companyId,itemId: _entity?.itemId,quantity: _entity?.quantity,subTotal: _entity?.subTotal,discount: _entity?.discount,total: _entity?.total,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("invoices").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Invoices created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Invoices" });
        }
        setLoading(false);
    };

    

    

    

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    

    return (
        <Dialog header="Create Invoices" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="invoices-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="companyId">CompanyId:</label>
                <InputText id="companyId" className="w-full mb-3 p-inputtext-sm" value={_entity?.companyId} onChange={(e) => setValByKey("companyId", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["companyId"]) ? (
              <p className="m-0" key="error-companyId">
                {error["companyId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="itemId">ItemId:</label>
                <InputText id="itemId" className="w-full mb-3 p-inputtext-sm" value={_entity?.itemId} onChange={(e) => setValByKey("itemId", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["itemId"]) ? (
              <p className="m-0" key="error-itemId">
                {error["itemId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="quantity">Quantity:</label>
                <InputNumber id="quantity" className="w-full mb-3 p-inputtext-sm" value={_entity?.quantity} onChange={(e) => setValByKey("quantity", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["quantity"]) ? (
              <p className="m-0" key="error-quantity">
                {error["quantity"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="subTotal">SubTotal:</label>
                <InputNumber id="subTotal" className="w-full mb-3" mode="currency" currency="MYR" locale="en-US" value={_entity?.subTotal} onValueChange={(e) => setValByKey("subTotal", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["subTotal"]) ? (
              <p className="m-0" key="error-subTotal">
                {error["subTotal"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="discount">Discount:</label>
                <InputNumber id="discount" className="w-full mb-3" mode="currency" currency="MYR" locale="en-US" value={_entity?.discount} onValueChange={(e) => setValByKey("discount", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["discount"]) ? (
              <p className="m-0" key="error-discount">
                {error["discount"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="total">Total:</label>
                <InputNumber id="total" className="w-full mb-3" mode="currency" currency="MYR" locale="en-US" value={_entity?.total} onValueChange={(e) => setValByKey("total", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["total"]) ? (
              <p className="m-0" key="error-total">
                {error["total"]}
              </p>
            ) : null}
          </small>
            </div>
            <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(InvoicesCreateDialogComponent);
