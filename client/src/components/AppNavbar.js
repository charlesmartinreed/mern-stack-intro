// using react-strap
import React, { Component } from 'react';

import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	Container
} from 'reactstrap';

class AppNavbar extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		isOpen: false
	// 	}
		state = {
			isOpen: false

		// toggle functionality/state change
		// this.toggle = this.toggle.bind(this);
	// }
}

toggle = () => {
	// instead of bind, we can just capture this inside of our object literal
	this.setState({
		isOpen: !this.state.isOpen
		});
	}

	render() {
		return (
			<div>
				<Navbar color="dark" dark expand="sm" className="mb-5">
					<Container>
						<NavbarBrand href="/">
							Shopping List
						</NavbarBrand>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="ml-auto" navbar>
								<NavItem>
									<NavLink href="https://github.com/charlesmartinreed">
										GitHub
									</NavLink>
								</NavItem>
							</Nav>
						</Collapse>
					</Container>
				</Navbar>
			</div>
		);
	}
}

export default AppNavbar;
