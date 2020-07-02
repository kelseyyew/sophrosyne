import React, { Component } from 'react'
import Link from 'react-router-dom/Link'

//MUI stuff
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

class navbar extends Component {
    render() {
        return (
            <AppBar className = "appBar-container">
                <ToolBar className = "nav-container">
                    <Button color = "inherit" component = {Link} to = "/home">Home</Button>
                    <Button color = "inherit" component = {Link} to = "/login">Login</Button>
                    <Button color = "inherit" component = {Link} to = "/signup">Sign up</Button>
                </ToolBar>
            </AppBar>
        )
    }
}

export default navbar
