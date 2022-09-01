import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { v4 as uuidv4 } from "uuid";
import {
  changeShowCreateTabPopover,
  changeShowView,
  changeToggleAddPropertyPopover,
} from "../../../../../features/showPopoversInfo/showPopoverInfoSlice";
import {
  addNewPropertyNames,
  addPropertyInToData,
  changeSelectedPropertyForEdit,
  changeSelectedPropertyType,
  changeToggleAddNewPropertyType,
  changeToggleEditTypeJsx,
} from "../../../../../features/tableDataInfo/tableDataInfoSlice";
import GoBackComponent from "../../../../goBackButton/GoBackButton";
import propertyIcons from "../../../../propertyIcons/propertyIcons";
import basicTypeProperties, {
  advancedTypeProperties,
} from "../../../../typeOfProperties/typeOfProperties";
import style from "./properties.module.scss";
import CustomInputWithValue from "../../../../custom/CustomInputWithValue";
import chekedNewTitle from "../../../../../utils/chekedNewTitle";

<<<<<<< Updated upstream:src/components/popovers/createEditTabpopovers/drawSelectedButton/properties/EditTypeDrawing.jsx
export default function EditTypeDrawing() {
=======
export default function EditTypeJsx() {
  const { selectedPropertyForEdit, toggleAddNewPropertyType, propertyNames } =
    useSelector((store) => store.tableDataInfo);
  const dispatch = useDispatch();
  const closeButton = () => {
    dispatch(changeShowCreateTabPopover(false));
    dispatch(changeShowView(false));
    dispatch(changeToggleAddPropertyPopover(false));
    dispatch(changeToggleEditTypeJsx(false));
  };

  const selectNewType = (type) => {
    if (toggleAddNewPropertyType) {
      const newTitle = chekedNewTitle(type, propertyNames);
      const id = uuidv4();
      dispatch(addNewPropertyNames({ id, value: newTitle }));
      dispatch(
        addPropertyInToData({
          id,
          type,
          title: newTitle,
          hide: false,
          deleted: false,
          data: [],
        })
      );
      dispatch(changeSelectedPropertyForEdit(id));
      dispatch(changeToggleAddNewPropertyType(false));
    } else {
      const newTitle = chekedNewTitle(type, propertyNames);
      dispatch(
        addNewPropertyNames({
          id: selectedPropertyForEdit?.id,
          value: newTitle,
        })
      );
      dispatch(
        changeSelectedPropertyType({
          id: selectedPropertyForEdit?.id,
          type: newTitle,
        })
      );
    }
    dispatch(changeToggleEditTypeJsx(false));
  };

>>>>>>> Stashed changes:src/components/popovers/createEditTabpopovers/drawSelectedButton/properties/EditTypeJsx.jsx
  return (
    <div className={style.edit_type_section}>
      <div className={style.go_back_container}>
        <GoBackComponent
          text="Choose property type"
          onChange={changeToggleEditTypeJsx}
        />
        <button
          type="submit"
          className={style.onclose_btn}
          onClick={closeButton}
        >
          <CloseIcon />
        </button>
      </div>
      <CustomInputWithValue placeholder="Search for a property type..." />
      <p>Basic</p>
      <div className={style.type_container}>
        {Object.entries(basicTypeProperties).map((e, i) => (
          <button
            // eslint-disable-next-line react/no-array-index-key
            key={e[0] + i}
            type="submit"
            onClick={() => selectNewType(e[0])}
          >
            <div>
              {propertyIcons[e[0]]}
              <p>{e[1]}</p>
            </div>
            {selectedPropertyForEdit?.type === e[0] &&
              !toggleAddNewPropertyType && <CheckIcon />}
          </button>
        ))}
      </div>
      <p>Advanced</p>
      <div className={style.type_container}>
        {Object.entries(advancedTypeProperties).map((e, i) => (
          <button
            // eslint-disable-next-line react/no-array-index-key
            key={e[0] + i}
            type="submit"
            onClick={() => selectNewType(e[0])}
          >
            <div>
              {propertyIcons[e[0]]}
              <p>{e[1]}</p>
            </div>
            {selectedPropertyForEdit?.type === e[0] &&
              !toggleAddNewPropertyType && <CheckIcon />}
          </button>
        ))}
      </div>
    </div>
  );
}
