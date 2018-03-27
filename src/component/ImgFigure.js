import React, { Component } from 'react';

class ImgFigure extends Component {
	constructor(args) {
		// code
		super();
	}

	componentDidMount(){
		// console.log(this.props);
	}

	// methods
	render(){
		return (
			<figure className='img-figure' ref={this.props.figureRef} style={this.props.data.pos}>
				<img src={this.props.data.path}
					alt={this.props.data.title}/>
				<figcaption className='img-caption'>
					<h2>{this.props.data.title}</h2>
				</figcaption>
			</figure>
		);
	}

}

export default ImgFigure;