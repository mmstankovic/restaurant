import classes from './Modal.module.css'
import { Fragment } from 'react'
import ReactDOM  from 'react-dom'

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClose}></div>
}
const ModalOverlay = (props) => {
    return <div className={`${classes.modal} ${props.className}`}>{props.children}</div>
}
const portalElement = document.querySelector('#overlays')

const Modal = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay className={props.className}>{props.children}</ModalOverlay>, portalElement)}
                                                    {/*ovde je bila caka nisam prosledjivao className */}
        </Fragment>                              
    )
}
export default Modal