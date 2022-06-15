import React from 'react';
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';

export function NavBar(props) {
    return (

        <div>
            <Navbar collapseOnSelect expand="lg" variant="light" className="color-nav fixed-top">
                <Container>
                    <Navbar.Brand as={Link} to="/home">Kelly's Website</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/home">Home</Nav.Link>
                            <Nav.Link as={Link} to="/drama">Drama</Nav.Link>
                            <Nav.Link as={Link} to="/to-do">To Do</Nav.Link>
                            <Nav.Link as={Link} to="/focus">Focus</Nav.Link>
                            <Nav.Link as={Link} to="/career">Resources</Nav.Link>
                        </Nav>
                        {/*<Nav>
                            <NavDropdown title="Links" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="https://github.com/kellyzwang">GitHub</NavDropdown.Item>
                                <NavDropdown.Item href="https://www.linkedin.com/in/kelly-zw/">LinkedIn</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="https://docs.google.com/document/d/1xO3s0wsN3FlSNdb9Ru-Fx9DN-a7tne77AsNn-rn0wVI/edit?usp=sharing">Resume</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>*/}
                    </Navbar.Collapse>
                </Container>


            </Navbar>

            {/*
        <nav>
            <div id="hamburger-menu"><a href="#"><i className="fa fa-bars" aria-label="menu"></i></a></div>
            <div id="social-links">
                <a href="#"><i className="fa fa-instagram" aria-label="instagram"></i></a>
                <a href="#"><i className="fa fa-twitter-square" aria-label="twitter"></i></a>
                <a href="#"><i className="fa fa-facebook-square" aria-label="facebook"></i></a>
                <a href="#"><i className="fa fa-github" aria-label="github"></i></a>
            </div>
        </nav>*/}
        </div>
    )
}