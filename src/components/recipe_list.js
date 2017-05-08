import React, { Component } from 'react';
import { PanelGroup, Panel } from 'react-bootstrap';

import RecipeItem from './recipe_item';

class RecipeList extends Component {
	// constructor(props) {
	//	super(props);
		/*this.state = {
			activeKey: "0"
		}; */
		//this.handleSelect = this.handleSelect.bind(this);
 // }
	/* handleSelect(activeKey) {
		this.setState({ activeKey });
	} */
	render() {
		if (this.props.recipeData) {
			var recipeHTML = this.props.recipeData.map((recipe, index) => {
				return (
					<Panel key={index} header={recipe.name} eventKey={index}>
						<RecipeItem
							recipe={recipe}
							index={index + 1}
							updateRecipe={this.props.updateRecipe}
							deleteRecipe={this.props.deleteRecipe}
						/>
					</Panel>
				);
			});
		}
		return (
			<div className="recipe-wrapper">
				<PanelGroup accordion>
					{recipeHTML}
				</PanelGroup>
			</div>
		);
	}
}

export default RecipeList;