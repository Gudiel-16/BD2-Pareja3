import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

function Sidebar() {
    return (
    <Nav className="col-md-2 d-none d-md-block bg-dartk sidebar">
        <div className="sidebar-sticky"></div>
        <Nav.Item>
            <Nav.Link as={Link} to="/perfil">Perfil</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link as={Link} to="/publicaciones">Publicaciones</Nav.Link>
        </Nav.Item>
        
    </Nav>
    )
}

export default Sidebar;