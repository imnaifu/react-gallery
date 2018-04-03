import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateImgSize, updateCurrentImg, updateFlipedImg } from '../redux/actions/imgAction.js';

//组件以数组的形式同时render的时候，先全部construct，然后再是一个一个mount
/*
	单向数据流的实现难度
	level 1: 一个组件
	level 2: 一个组件加一个子组件
	level 3：一个组件加一群子组件
*/

class ImgFigure extends Component {

	constructor(props) {
		console.log('child create');
		//first time here props got initial img data
		super(props);
		this.figureRef = React.createRef();
		this.handleClick = this.handleClick.bind(this);

	}

	componentDidMount(){
		console.log('child mount');
		const imgSize = {
			width: this.figureRef.current.scrollWidth,		
			height: this.figureRef.current.scrollHeight,
		};
		//set img size
		this.props.updateImgSize(this.props.index, imgSize);
		//set img to default center
		this.props.updateCurrentImg(this.props.index);		
	}

	// methods
	render(){
		console.log('child render')
		const index = this.props.index;
		const style = {
			...this.props.data.position,
			transform: (!this.props.data.centered)
						?`rotate(${this.props.data.position.degree}deg)`
						:`scale(1.1) rotate(${this.props.data.position.degree}deg)`,
		}

		const centerClass = (this.props.data.centered)?'is-center':'not-center';
		let imgContent;

		if (this.props.data.fliped){
			//back
			imgContent = (
				<div className='img-div flip-back'>
					<p>{this.props.data.description}</p>
				</div>
			);
	
		}else{
			//front
			imgContent = (
				<div className='img-div flip-front'>
					<img src={this.props.data.path} alt={this.props.data.title}/>
					<figcaption className='img-caption'>
						<h2>{this.props.data.title}</h2>
					</figcaption>
				</div>
			);			
		}

		return (
			<figure className={'img-figure ' + centerClass} ref={this.figureRef} 
				style={style} onClick={this.handleClick} >
				{imgContent}
			</figure>
		);
	}
	
	componentDidUpdate(){
		console.log('child update');
	}

	handleClick(e){
		e.preventDefault();
		//click control leave it here inside the component
		if (this.props.data.centered === false){
			//set to center
			this.props.updateCurrentImg(this.props.index);
		}else{
			//flip
			this.props.updateFlipedImg(this.props.index);
		}
	}
}

const mapStateToProps = (store, ownProps) => {
    return {
		// img: store.img,
        // stage: store.stage,
    }
};

const mapDispatchToProps = {
	updateImgSize,
	updateCurrentImg,
	updateFlipedImg,
}

export default connect(mapStateToProps, mapDispatchToProps)(ImgFigure);

