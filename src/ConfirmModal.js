import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { confirmable, createConfirmation } from "react-confirm";

class ConfirmModal extends React.Component {
  
    constructor(props) {
        super(props)
        this.state = {
            isOpen: true
        }
    }
    
    render() {
        const {
        proceedLabel,
        cancelLabel,
        proceedColor,
        cancelColor,
        header,
        body,
        proceed,
        } = this.props;

        return (
        <div className="modal">
            <Modal isOpen = {this.state.isOpen} toggle={()=>{proceed(false); this.setState({isOpen: false})}} onHide={() => {proceed(false); this.setState({isOpen: false});}}>
                    <ModalHeader>{header}</ModalHeader>
                    <ModalBody>
                    {body}
                    </ModalBody>
                    <ModalFooter>
                    <Button 
                        color={cancelColor}
                        onClick={() => {proceed(false); this.setState({isOpen: false})}}>
                            {cancelLabel}
                    </Button>
                    {' '}
                    <Button 
                        color={proceedColor}
                        onClick={() => {proceed(true); this.setState({isOpen: false})}}>
                            {proceedLabel}
                    </Button>
                    </ModalFooter>
                </Modal>
        </div>
    );
  }
}

export default function confirm (
    header,
    body,
    proceedColor = "secondary",
    cancelColor = "primary",
    proceedLabel = "Yes",
    cancelLabel = "Cancel",
    options = {}
) {
    return createConfirmation(confirmable(ConfirmModal))({
        header,
        body,
        proceedColor,
        cancelColor,
        proceedLabel,
        cancelLabel,
        ...options
  });
}
