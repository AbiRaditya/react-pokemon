import React, { useEffect } from "react";
import ReactDom from "react-dom";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";

const Modal = ({ open, children, onClose, modalTitle }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px";
      return () => {
        document.body.style.paddingRight = "0px";
        document.body.style.overflow = "unset";
      };
    }
  }, [open]);
  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div className="modal__overlay"></div>
      <div className="modal">
        <div className="modal__header">
          <h3
            className="pokemon__name"
            style={{
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            {modalTitle.name}
          </h3>
          <Button onClick={onClose} variant="contained">
            {" "}
            <CloseIcon />{" "}
          </Button>
        </div>
        <div className="modal__body">{children}</div>
        <div className="modal__footer"></div>
      </div>
    </>,
    document.getElementById("main-modal")
  );
};

export default Modal;
