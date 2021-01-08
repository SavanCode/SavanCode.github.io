---
title: React Bootstrap
top: false
cover: false
toc: true
mathjax: true
date: 2021-01-08 12:27:54
password:
summary:
tags: React
categories: React
---

# 应用bootstrap style

[React Bootstrap](https://react-bootstrap.github.io/getting-started/introduction/)

## 1.Install Bootstrap Command

```
npm install react-bootstrap bootstrap
```

## 2.import bootstrap in index.js "bootstrap/dist/css/bootstrap.min.css".

 

## 3.使用bootstrap组件

例子1

```jsx
import styles from './index.scss';
import React from 'react';
import { Navbar, NavItem , Nav } from 'react-bootstrap';
import { Link } from 'react-router';
import routers from './components';
//import "bootstrap/dist/css/bootstrap.min.css";
export default class App extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <Navbar style={{backgroundColor: '#eee', borderRadius: 0, marginBottom: 10}} >
          <Navbar.Header>
            <Navbar.Brand style={{color: '#00d8ff'}}>
              React入门
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>

            <Nav pullRight >
                {routers.map((route, i)=><NavItem key={i} href={'#/'+route.key}>{route.key}</NavItem>)}

            </Nav>

          </Navbar.Collapse>
        </Navbar>
        <div >
        {children}
        </div>
      </div>
    )
  }
}
```

例子2

```jsx


import ReactDOM from 'react-dom';
import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
 import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
 //import "bootstrap/dist/css/bootstrap.min.css";

class BootstrapNavbar extends React.Component{

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <Router>
                            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                                <Navbar.Brand href="#home">React Bootstrap Navbar</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto">
                                    <Nav.Link href="/">Home</Nav.Link>
                                    <Nav.Link href="/about-us">Contact Us</Nav.Link>
                                    <Nav.Link href="/contact-us">About Us</Nav.Link>
                                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                    </NavDropdown>
                                    </Nav>
                                    <Form inline>
                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                    <Button variant="outline-success">Search</Button>
                                    </Form>
                                </Navbar.Collapse>
                            </Navbar>
                            <br />
                            <Switch>
                                <Route exact path="/">
                                    
                                </Route>
                                <Route path="/about-us">
                                   
                                </Route>
                                <Route path="/contact-us">
                                     
                                </Route>
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        )  
    }
}

ReactDOM.render( <BootstrapNavbar /> , document.getElementById('root'));   
```



# react-router-bootstrap

## Installation

For React Router v4:

```
npm install -S react-router-bootstrap
```

For React Router v3 or lower (see [rr-v3](https://github.com/react-bootstrap/react-router-bootstrap/tree/rr-v3) branch):

```
npm install -S react-router-bootstrap@rr-v3
```



## Usage

Wrap your React Bootstrap element in a `<LinkContainer>` to make it behave like a React Router `<Link>`

## Example

Following plain React Bootstrap component

```
<Button href="/foo/bar">Foo</Button>
```

becomes

```
<LinkContainer to="/foo/bar">
  <Button>Foo</Button>
</LinkContainer>
```

# Reference 

https://medium.com/dev-genius/react-bootstrap-navbars-7853c7b9f349

https://mdbootstrap.com/docs/react/navigation/navbar/

https://www.npmjs.com/package/react-router-bootstrap