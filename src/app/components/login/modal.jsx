
import { useState } from 'react';
import ContenidoModal from './contenidoModal';
//import 'react-responsive-modal/styles.css';
import './login.css'
import Modal from 'react-responsive-modal';

const Viewmodal = () => {
    // import './examples/custom-styling.css';
    const [open, setOpen] = useState(false);

    return (
        <>
            <button className="btn-login" onClick={() => setOpen(true)}>
                <i className="bi bi-person-circle"></i>
            </button>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                center
                classNames={{
                    root: 'react-responsive-modal-root',
                    overlay: 'react-responsive-modal-overlay',
                    modal: 'react-responsive-modal-container',
                    responsive: 'react-responsive-modal-modal',
                }}
            >
                <ContenidoModal />
            </Modal>
        </>
    );
};

export default Viewmodal;