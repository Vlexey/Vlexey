import './Drawer.scss'
import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import {BackDrop} from "../../UI/BackDrop/BackDrop";

const  links = [
    {to: '/', label: 'List', exact: true},
    {to: '/auth', label: 'Auth', exact: true},
    {to: '/quiz-creator', label: 'Create Test', exact: true},
    ]

class Drawer extends Component {
    renderLinks () {
        return links.map((link, ind) => {
            return (
                <li key={ind}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={`active`}
                        onClick={this.props.onToggleManuHandler}
                    >{link.label}</NavLink>
                </li>
            )
        })
    }

    render() {
        const cls = ['Drawer']

        if(!this.props.isOpen) {
            cls.push('Drawer--close')
        }


        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        { this.renderLinks()}
                    </ul>
                </nav>
                {this.props.isOpen ?
                    <BackDrop
                        onClick={this.props.onToggleManuHandler}
                /> : null }

            </React.Fragment>

        );
    }
}

export default Drawer;