import React, { Component } from 'react';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class RecipeEntry extends Component {
	constructor(props) {
		super(props);
		if (!props.recipe) {
			this.state = { recipe: { name: "", ingredients: [] } };
		} else {
			this.state = { recipe: props.recipe };
		}
		console.log(this.state);
		this.onInputChange = this.onInputChange.bind(this);
	}
	onInputChange(event) {
		const recipe = Object.assign({}, this.state.recipe);
		const name = event.target.name.replace("recipe", "").toLowerCase();
		const value = event.target.value;

		if (typeof recipe[name] !== "string") {
			if (value.indexOf(",") > 0) {
				recipe[name] = value.split(",");
			} else {
				recipe[name].splice(0);
				recipe[name].push(value);
			}
			this.setState({ recipe });
		} else {
			recipe[name] = value;
			this.setState({ recipe });
		}
	}

	render() {
		var handleClick = this.props.handleClick;
		var index = this.props.index;
		return (
			<form>
				<FormGroup controlId="recipeName">
					<ControlLabel>Recipe</ControlLabel>
					<FormControl
						name="recipeName"
						type="text"
						placeholder="Recipe Name"
						onChange={this.onInputChange}
						value={this.state.recipe.name}
					/>
				</FormGroup>

				<FormGroup controlId="ingredients">
					<ControlLabel>Ingredients</ControlLabel>
					<FormControl
						name="ingredients"
						componentClass="textarea"
						placeholder="Enter ingredient, separate each ingredient by comma"
						onChange={this.onInputChange}
						value={this.state.recipe.ingredients.join(",")}
					/>
				</FormGroup>
				<FormGroup className="pull-right button-group">
					<Button
						bsStyle="primary"
						onClick={event => {
							handleClick(this.state.recipe, index, event);
							if (this.props.closeModal) {
								this.props.closeModal();
							}
						}}
					>
						{this.props.actionLabel}
					</Button>{" "}
					<Button
						bsStyle="default"
						onClick={event => {
							this.props.closeModal();
						}}
					>
						Close
					</Button>
				</FormGroup>
			</form>
		);
	}
}

export default RecipeEntry;