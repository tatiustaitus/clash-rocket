import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(document.createElement("div"));

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const handleClickOverlay = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === modalRef.current) {
      onClose();
    }
  };

  const classes = classNames(
    "fixed",
    "top-0",
    "left-0",
    "right-0",
    "z-50",
    "flex",
    "items-center",
    "justify-center",
    "w-full",
    "h-full",
    { hidden: !isOpen }
  );

  const overlayClasses = classNames(
    "fixed",
    "top-0",
    "left-0",
    "right-0",
    "bottom-0",
    "z-50",
    "bg-black",
    "opacity-50",
    { hidden: !isOpen }
  );

  return ReactDOM.createPortal(
    <>
      <div className={overlayClasses} onClick={onClose} aria-hidden={!isOpen} />
      <div
        ref={modalRef}
        className={classes}
        onClick={handleClickOverlay}
        aria-hidden={!isOpen}
        tabIndex={-1}
      >
        <div className="relative w-full h-full max-w-2xl md:h-auto">
          {children}
        </div>
      </div>
    </>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
