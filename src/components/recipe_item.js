import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

import RecipeEntry from './recipe_entry';

class RecipeItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			index: props.index,
			showModal: false
		};
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
	}
	close() {
		this.setState({ showModal: false });
	}
	open() {
		this.setState({ showModal: true });
	}
	render() {
		const ingredients = this.props.recipe.ingredients.map((ingredient, index) => {
			var divClass = `item-wrapper ${index === 0 ? "item-wrapper-first" : this.props.recipe.ingredients.length - 1 === index ? "item-wrapper-last" : ""}`;
			return (
				<div className="ingredients-list-wrapper" key={index}>
					<div className={divClass}>
						<span>{ingredient}</span>
					</div>
				</div>
			);
		});
		var deleteClick = this.props.deleteRecipe;
		var index = this.props.index - 1 || -1;
		return (
			<div className="ingredients-wrapper">
				<div className="ingredients-title">
					<h4 className="text-center">Ingredients</h4>
					<hr />
				</div>
				{ingredients}
				<div className="button-group-wrapper">
					<Button
						bsStyle="danger"
						onClick={event => deleteClick(this.props.index - 1, event)}
					>
						Delete
					</Button>
					{" "}
					<Button bsStyle="default" onClick={this.open}>Edit</Button>
					<div className="modal-container">
						<Modal
							show={this.state.showModal}
							onHide={this.close}
							container={this}
							dialogClassName="custom-modal"
						>
							<Modal.Header closeButton>
								<h3>Edit Recipe</h3>
							</Modal.Header>
							<Modal.Body>
								<RecipeEntry
									recipe={this.props.recipe}
									actionLabel={"Edit Recipe"}
									handleClick={this.props.updateRecipe}
									index={index}
									closeModal={this.close}
								/>
							</Modal.Body>
							<Modal.Footer />
						</Modal>
					</div>
				</div>
			</div>
		);
	}
}

export default RecipeItem;