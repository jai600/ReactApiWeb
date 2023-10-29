
import { Table,Button } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';



const TablaContacto = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarContacto }) => {

    const enviarDatos = (contacto) => {

        setEditar(contacto)
        setMostrarModal(!mostrarModal)
    }
    return (
       <Table striped responsive>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>telefono</th>
                    <th></th>
                </tr>


            </thead>
            <tbody>
                {
                     data.length < 1 ? (
                        <tr>
                            <td colSpan="4">Sin respuestas</td>
                        </tr>
                    ) : (
                        data.map((item) => (

                            <tr Key={item.idcontacto}>
                                <td>{ item.nombre}</td>
                                <td>{ item.correo}</td>
                                <td>{ item.telefono}</td>
                                <td>
                                    <Button color="primary" size="sm" className="me-2" onClick={() => enviarDatos(item) }>
                                      Editar
                                    </Button> 

                                    <Button color="danger" size="sm" onClick={() => eliminarContacto(item.idcontacto)}> Eliminar </Button>
                                </td>

                                    </tr>
                        ))
                    )
                }

            </tbody>
       </Table>

    )
}

export default TablaContacto;