//import React, { Component } from 'react';
//import { Route, Routes } from 'react-router-dom';
//import AppRoutes from './AppRoutes';
//import { Layout } from './components/Layout';
//import './custom.css';

//export default class App extends Component {
//  static displayName = App.name;

//  render() {
//    return (
//      <Layout>
//        <Routes>
//          {AppRoutes.map((route, index) => {
//            const { element, ...rest } = route;
//            return <Route key={index} {...rest} element={element} />;
//          })}
//        </Routes>
//      </Layout>
//    );
//  }
//}
import { useEffect, useState } from "react";
import { Container, Col, Row, Card, CardHeader, CardBody, Button } from "reactstrap";
import TablaContacto from "./componentes/JavaScript";
import ModalContacto from "./componentes/ModalContacto";


const App = () => {


    const [contactos, setContactos] = useState([])

    const [mostrarModal, setMostrarModal] = useState(false)

    const [editar,setEditar] = useState(null)

    const mostrarContactos = async () => {
        const response = await fetch('api/contacto/lista');

        if (response.ok) {

            const data = await response.json();

            setContactos(data);
        } else {
            console.log("Error al traer los datos");
        }

    }

    useEffect(() => {
        mostrarContactos()
    })

    const guardarContacto = async (contacto) => {
        const response = await fetch("api/contacto/Guardar", {
            method: "POST",
            headers: {
                'Content-type': 'application/json;charset= utf-8'
            },
            body: JSON.stringify(contacto)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal)
            mostrarContactos();
        }
    }


    const editarContacto = async (contacto) => {
        const response = await fetch("api/contacto/Editar", {
            method: "PUT",
            headers: {
                'Content-type': 'application/json;charset= utf-8'
            },
            body: JSON.stringify(contacto)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal)
            mostrarContactos();
        }
    }

    const eliminarContacto = async (id) => {

        var confirma = window.confirm("Desea eliminar el registro?")

        if (!confirma){
            return
        }
        const response = await fetch("api/contacto/Eliminar/" + id, {
            method: "DELETE"
        })

        if (response.ok) {
        
            mostrarContactos();
        }
    }

    return (
        <Container>
            <Row ClassName="mt-5">

                <Col sm="12">
                    <Card>
                        <CardHeader>                           
                            <h5>Lista de contacto</h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success" onClick={() => setMostrarModal(!mostrarModal)}>      
                                Nuevo Contacto
                            </Button>
                            <hr>

                            </hr>

                            <TablaContacto data={contactos}

                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}
                                eliminarContacto={eliminarContacto }
                            />
                        </CardBody>

                    </Card>

                </Col>

            </Row>
            <ModalContacto MostrarModal={mostrarModal}
                SetMostrarModal={setMostrarModal}

                GuardarContacto={guardarContacto}
                editar={editar}
                setEditar={setEditar}
                editarContacto={editarContacto }
             />
        </Container>      


    )

}

export default App;
