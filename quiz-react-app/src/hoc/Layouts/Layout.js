import React, {Component} from 'react';
import './Layout.scss'
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";

class Layout extends Component {

    state = {
        menuOpen: false
    }
    onToggleManuHandler = () => {
        this.setState({menuOpen: !this.state.menuOpen})
    }

    render() {
        return (
            <div className="Layout">
                <Drawer
                    onToggleManuHandler={this.onToggleManuHandler}
                    isOpen={this.state.menuOpen} />
                <MenuToggle
                    onToggleManuHandler={this.onToggleManuHandler}
                    isOpen={this.state.menuOpen}
                />

                <main className="container">
                    { this.props.children }
                </main>
            </div>
        );
    }
}

export default Layout;