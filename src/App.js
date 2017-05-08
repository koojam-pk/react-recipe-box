import React, { Component } from 'react';
import './App.scss';
import './App.css';

import { Button, Modal } from 'react-bootstrap';
import { Follow } from 'react-twitter-widgets';

import RecipeList from './components/recipe_list';
import RecipeEntry from './components/recipe_entry';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipeDataDemo: [
				{
					name: "Pumpkin Pie",
					ingredients: [
						"Pumpkin Puree",
						"Sweetened Condensed Milk",
						"Eggs",
						"Pumpkin Pie Spice",
						"Pie Crust"
					]
				},
				{
					name: "Spaghetti",
					ingredients: ["Noodles", "Tomato Sauce", "(Optional) Meatballs"]
				},
				{
					name: "Onion Pie",
					ingredients: ["Onion", "Pie Crust", "Sounds Yummy right?"]
				}
			],
			recipeData: null,
			showModal: false
		};
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
		this.addRecipe = this.addRecipe.bind(this);
		this.updateRecipe = this.updateRecipe.bind(this);
		this.deleteRecipe = this.deleteRecipe.bind(this);
	}
	componentWillMount() {
		if (localStorage.getItem("recipes") !== null) {
			this.setState({ recipeData: JSON.parse(localStorage.getItem("recipes")) });
		} else {
			this.setState({ recipeData: this.state.recipeDataDemo });
		}
	}
	close() {
		this.setState({ showModal: false });
	}
	open() {
		this.setState({ showModal: true });
	}
	addRecipe(addData, index, event) {
		event.preventDefault();
		var recipes = this.state.recipeData;
		if (recipes === null) {
			recipes = [];
		}
		recipes.push(addData);
		this.setState({ recipeData: recipes });
		this.close();
		localStorage.setItem("recipes", JSON.stringify(recipes));
	}
	updateRecipe(updateData, index, event) {
		event.preventDefault();
		const recipes = this.state.recipeData;
		recipes.splice(index, 1, updateData);
		this.setState({ recipeData: recipes });
		localStorage.setItem("recipes", JSON.stringify(recipes));
	}
	deleteRecipe(index, event) {
		event.preventDefault();
		const recipes = this.state.recipeData;
		recipes.splice(index, 1);
		this.setState({ recipeData: recipes });
		localStorage.setItem("recipes", JSON.stringify(recipes));
	}
	render() {
		return (
			<div className="container">
				<h1 className="text-center">A Recipe Box</h1>
                <span className='text-center'><Follow username="koojam_pk" options={{count:"none"}} /></span>
				<RecipeList
					recipeData={this.state.recipeData}
					updateRecipe={this.updateRecipe}
					deleteRecipe={this.deleteRecipe}
				/>
				<br />
				<Button bsStyle="primary" bsSize="large" onClick={this.open}>
					Add Recipe
				</Button>
				<div className="modal-container">
					<Modal
						show={this.state.showModal}
						onHide={this.close}
						container={this}
						dialogClassName="custom-modal"
					>
						<Modal.Header closeButton>
							<h3>Add Recipe</h3>
						</Modal.Header>
						<Modal.Body>
							<RecipeEntry
								handleClick={this.addRecipe}
								actionLabel={"Add Recipe"}
								closeModal={this.close}
							/>
						</Modal.Body>
						<Modal.Footer />
					</Modal>
				</div>
			</div>
		);
	}
}