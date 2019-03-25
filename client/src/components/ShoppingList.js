import React, { Component} from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';

class ShoppingList extends Component {
	state = {
		items: [
			{ id: uuid(), name: 'Eggs' },
			{ id: uuid(), name: 'Potatoes' },
			{ id: uuid(), name: 'Tofu' },
			{ id: uuid(), name: 'Sweet Tea' }
		]
	}

	// using destructuring to get the ID and the name from the map
	// filter : any item that is not selected will be returned in our array, effectively removing the selected item

	render() {
		const { items } = this.state;
		return(
			<Container>
				<Button
					color="dark"
					style={{marginBottom: '2rem'}}
					onClick={() => {
						const name = prompt('Enter Item');
						if(name) {
							this.setState(state => ({
								// add to current state
								items: [...state.items, { id: uuid(), name}]
							}));
						}
					}}
				>
				Add Item
				</Button>
				<ListGroup>
					<TransitionGroup className="shopping-list">
						{items.map(({id, name}) => (
							<CSSTransition key={id} timeout={500} classNames="fade">
								<ListGroupItem>
								<Button
								className="remove-btn"
								color="danger"
								size="sm"
								onClick={() => {
										this.setState(state => ({
											items: state.items.filter(item => item.id !== id)
										}));
								}}
								>
								&times;</Button>
									{name}
								</ListGroupItem>
							</CSSTransition>
						))}
					</TransitionGroup>
				</ListGroup>
			</Container>
		);
	}
}

export default ShoppingList;
