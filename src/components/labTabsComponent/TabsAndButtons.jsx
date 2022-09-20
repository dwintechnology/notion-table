import React, { useMemo, useEffect, useState } from "react";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import style from "./tabs.module.scss";
import {
  changeSelectedValueInView,
  changeShowCreateTabPopover,
  changeShowNewTabPopover,
  changeShowView,
} from "../../features/showPopoversInfo/showPopoverInfoSlice";
import TableFunctions from "../functionsForWorkingWithTable/TableFunctions";
import { LAYOUT } from "../../constants/headerContantes/headerConstantes";
import { changeSelectedType } from "../../features/tableTypeInfo/tableTypeInfoSlice";
import {
  addNewTab,
  changeSelectedTabId,
  dragAndDropTabsArray,
  updateTabArray,
} from "../../features/tableTabsInfo/tableTabsInfoSlice";
import setDataIntoStorage, {
  getDatainToStorage,
} from "../../utils/callLocalStorage";
import TabPopover from "./TabPopover";

export default function TabsAndButtons() {
  const dispatch = useDispatch();
  const { tabsArray, selectedTabId } = useSelector(
    (store) => store.tableTabsInfo
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChange = (event, newValue) => {
    dispatch(changeSelectedTabId(tabsArray[newValue]?.id));
    setDataIntoStorage("selectedTabId", tabsArray[newValue]?.id);
  };

  const currentTab = useMemo(() => {
    return tabsArray.findIndex((e) => e.id === selectedTabId);
  }, [selectedTabId, tabsArray]);

  useEffect(() => {
    const tabs = getDatainToStorage("tabs");
    const getSelectedTabId = getDatainToStorage("selectedTabId");
    if (tabs) {
      dispatch(updateTabArray(tabs));
    }
    if (getSelectedTabId) {
      dispatch(changeSelectedTabId(getSelectedTabId));
    } else {
      dispatch(changeSelectedTabId(tabsArray[0]?.id));
    }
  }, []);

  useEffect(() => {
    setDataIntoStorage("tabs", tabsArray);
  }, [tabsArray]);

  const addTabBtn = () => {
    dispatch(changeShowCreateTabPopover(true));
    dispatch(changeShowNewTabPopover(true));
    dispatch(changeSelectedValueInView(LAYOUT));
    dispatch(changeShowView(true));
    dispatch(changeSelectedType("table"));
    const id = uuid();
    setDataIntoStorage("selectedTabId", id);
    dispatch(changeSelectedTabId(id));
    dispatch(
      addNewTab({
        type: "table",
        name: "table",
        id,
      })
    );
  };

  useEffect(() => {
    setCurrentIndex(currentTab);
  }, [currentTab]);

  const handleOnDragEnd = (result) => {
    if (result.destination) {
      dispatch(
        dragAndDropTabsArray({
          sourceIndex: result.source.index,
          destinationIndex: result.destination.index,
        })
      );
    }
  };

  return (
    <div className={style.tabs_btns_section}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters" direction="horizontal">
          {(provided) => (
            <Tabs
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="characters"
              value={currentTab}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              aria-label="visible arrows tabs example"
              sx={{
                [`& .${tabsClasses.scrollButtons}`]: {
                  "&.Mui-disabled": { opacity: 0.3 },
                },
              }}
            >
              {tabsArray.map((e, i) => (
                <TabPopover
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                  item={e}
                  index={i}
                  key={e.id}
                />
              ))}
              {provided.placeholder}
            </Tabs>
          )}
        </Droppable>
      </DragDropContext>
      <button
        className={style.add_btn}
        type="submit"
        onClick={(e) => addTabBtn(e)}
      >
        <AddIcon />
      </button>
      <TableFunctions />
    </div>
  );
}
