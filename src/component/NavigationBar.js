import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	NavbarText,
	
} from "reactstrap";
import { logoutAction } from "../redux/actions";
import "./navbar.css";

class NavBar extends Component {
	state = { isOpen: false };

	toggle = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};
	logout = () => {
		const { logoutAction } = this.props;
		logoutAction();
		localStorage.removeItem("id");
	};
	renderNavBarLoggedIn = () => {
		const { userID } = this.props;
		if (userID !== 0) {
			return (
				<DropdownMenu right>
					<Link to="/">
						<DropdownItem onClick={this.logout}>Logout</DropdownItem>
					</Link>
					<Link to="/cart" className="notification">
						<DropdownItem>Cart </DropdownItem>
						<span className="badge">{this.props.cart.length}</span>
					</Link>

					<DropdownItem divider />
					<Link to="/history">
						<DropdownItem>History</DropdownItem>
					</Link>
				</DropdownMenu>
			);
			// }
		} else {
			return (
				<DropdownMenu right>
					<Link to="/login">
						<DropdownItem>Login</DropdownItem>
					</Link>
					<DropdownItem>Reset</DropdownItem>
				</DropdownMenu>
			);
		}
	};

	render() {
		const { userEmail } = this.props;
		return (
			<div>
				<Navbar color="light" light expand="md">
					<NavbarBrand href = "/"> 
					<img src="https://media.istockphoto.com/vectors/letter-f-icon-vector-id579774306?k=6&m=579774306&s=170667a&w=0&h=_0z11F9RTW89quDMhJCwAPacQvxJFk5XgcwCqpkEHyg=" width="30" height="30" class="d-inline-block align-top" alt=""/>
					<b> Filoshoe </b>
					</NavbarBrand >
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="mr-auto" navbar>
							<NavItem>
								<NavLink href="/">All Products</NavLink>
							</NavItem>
							
						</Nav>
						<Nav >
							<NavItem>
							<img src="https://cdn.iconscout.com/icon/free/png-512/shopping-cart-442-1151214.png" width="30" height="30" class="align-middle" alt="cart-icon"/>
							<span className="badge">{this.props.cart.length}</span>
							</NavItem>
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret>
									<NavbarText>{userEmail !== "" ? userEmail : ""}</NavbarText>
								</DropdownToggle>
								{this.renderNavBarLoggedIn()}
							</UncontrolledDropdown>
							
						</Nav>
						
					</Collapse>
				</Navbar>
			</div>
		);
	}
}
const mapStatetoProps = (state) => {
	return {
		userID: state.user.id,
		userRole: state.user.role,
		userEmail: state.user.email,
		cart: state.cart.cart,
	};
};

export default connect(mapStatetoProps, { logoutAction })(NavBar);
