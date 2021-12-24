import React from 'react'
import { Modal, Row, Col } from 'react-bootstrap'
import { faTrash, faTimes } from '@fortawesome/free-solid-svg-icons'
import StyledButton from '../StyledButton'
import styles from '../../../styles/AdminPanel.module.css'

interface AdminDeleteModalProps {
    show: boolean,
    handleClose: (success: boolean) => void,
    target: string
}

const AdminDeleteModal: React.FC<AdminDeleteModalProps> = ({show, handleClose, target}) => {
  return (
    <Modal show={show} onHide={handleClose} className={styles.modal} animation={true}>
      <Modal.Body className={styles.modal_body}>
        Tem certeza que deseja excluir este {target}?
        <Row>
          <Col lg={6} xs>
            <div onClick={() => handleClose(true)}>
              <StyledButton icon={faTrash} action={"Excluir"} type_button="red" />
            </div>
          </Col>

          <Col lg={6} xs>
            <div onClick={() => handleClose(false)}>
              <StyledButton icon={faTimes} action={"Cancelar"} type_button="blue" />
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  )
}

export default AdminDeleteModal
