import { useEffect, useState } from "react"
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ModalFooter, Button} from "reactstrap"



const modeloContado = {
    idContacto: 0,
    nombre : "",
    correo : "",
    telefono : ""
}
const ModalContacto = ({ MostrarModal, SetMostrarModal, GuardarContacto, editar, setEditar, editarContacto }) => {


    const [contacto, setContacto] = useState(modeloContado);

    const actualizarDato = (e) => {
        console.log(e.target.name + " : " + e.target.value)

        setContacto(
            {
                ...contacto,
                [e.target.name]: e.target.value

            }
        )
    }

    const enviarDatos = () => {
        if (contacto.idContacto == 0) {
            GuardarContacto(contacto);
        } else {
            editarContacto(contacto);
        }
        setContacto(modeloContado)
    }

    useEffect(() => {
        if (editar != null) {
            setContacto(editar)
        } else {
            setContacto(modeloContado)
        }

    }, [editar])

    const cerrarModal = () => {
        SetMostrarModal(!MostrarModal)
        setEditar(null)
    }


    return (
        <Modal isOpen={MostrarModal}>

            <ModalHeader>
                {contacto.idContacto == 0 ? "Nuevo contacto" : "Editar contacto"}
                
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input name="nombre"  onChange={(e) => actualizarDato(e)} value={contacto.nombre} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Correo</Label>
                        <Input name="correo" onChange={(e) => actualizarDato(e)} value={contacto.correo} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Telefono</Label>
                        <Input name="telefono" onChange={(e) => actualizarDato(e)} value={contacto.telefono} />
                    </FormGroup>
                </Form>

            </ModalBody>

            <ModalFooter>
                <Button color="primary" size="sm" onClick={enviarDatos}> Guardar </Button>
                <Button color="warning" size="sm" onClick={() => cerrarModal(!MostrarModal) }> Cerrar modal </Button>
            </ModalFooter>

        </Modal>
    
    )
}

export default ModalContacto;