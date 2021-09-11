import React, { CSSProperties } from "react";
import { CSSTransition } from "react-transition-group";

import Backdrop from "../Backdrop/Backdrop";
import "./Modal.css";

export interface IModal {
  className?: string;
  style?: CSSProperties;
  headerClass?: string;
  header?: string;
  onSubmit?: () => void;
  contentClass?: string;
  footerClass?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  show?: boolean;
  onCancel?: () => void;
  innerRef?: any;
}

const ModalOverlay = (props: IModal) => {
  const content = (
    <div
      ref={props.innerRef}
      className={`modal ${props.className}`}
      style={props.style}
    >
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );

  return content;
};

const Modal = (props: IModal) => {
  const modalNodeRef = React.useRef(null);

  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        nodeRef={modalNodeRef}
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay innerRef={modalNodeRef} {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
