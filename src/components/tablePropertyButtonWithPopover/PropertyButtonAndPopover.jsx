/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import propertyIcons from "../propertyIcons/propertyIcons";
import style from "./popoverOfButton.module.scss";
import ContentOfPropertyPopover from "./ContentOfPropertyPopover";

export default function PropertyButtonAndPopover({ item, index }) {
  const [anchorEl, setAnchorElement] = useState(null);

  const handleClick = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "popover-of-property-buttons" : undefined;

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <button
            type="submit"
            className={
              snapshot.isDragging
                ? style.ondrag_btn_property
                : style.btn_property
            }
            onClick={handleClick}
            {...provided.dragHandleProps}
          >
            <span className={style.propert_icons}>
              {propertyIcons[item.type]}
            </span>
            <p>{item.title}</p>
          </button>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            PaperProps={{
              style: {
                display: "flex",
                flexDirection: "column",
                width: "220px",
                minWidth: "180px",
                maxWidth: "calc(100vw - 24px)",
                maxHeight: "70vh",
                padding: "10px",
              },
            }}
          >
            <Typography component="div" sx={{ p: 2 }}>
              <ContentOfPropertyPopover
                setAnchorElement={setAnchorElement}
                item={item}
              />
            </Typography>
          </Popover>
        </div>
      )}
    </Draggable>
  );
}

PropertyButtonAndPopover.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
