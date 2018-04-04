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
		// console.log('child create');
		//first time here props got initial img data
		super(props);
		this.figureRef = React.createRef();
		this.handleClick = this.handleClick.bind(this);

	}

	componentDidMount(){
		// console.log('child mount');
		const imgSize = {
			width: this.figureRef.current.scrollWidth,		
			height: this.figureRef.current.scrollHeight,
		};
		//set img size
		this.props.updateImgSize(this.props.index, imgSize);
		//set img to default center
		this.props.updateCurrentImg(0);		
	}

	// methods
	render(){
		// console.log('child render')
		const index = this.props.index;
		const style = {
			...this.props.data.position,
			transform: (!this.props.data.centered)
						?`rotate(${this.props.data.position.degree}deg)`
						:'',
		}

		const centerClass = (this.props.data.centered)?' centered ':'';
		const flipClass = (this.props.data.fliped)?' fliped ':'';

		return (
			<figure className={'img-figure ' + flipClass + centerClass} 
				ref={this.figureRef} style={style} onClick={this.handleClick} >
				<img src={this.props.data.path} alt={this.props.data.title}/>
				<figcaption className='img-caption'>
					<h2>{this.props.data.title}</h2>
					<div className='img-back' onClick={this.handleClick}>
						<p>{this.props.data.description}</p>
					</div>
				</figcaption>
			</figure>
		);
	}
	
	componentDidUpdate(){
		// console.log('child update');
	}

	handleClick(e){
		e.preventDefault();
		e.stopPropagation(); //stop run twice
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
    }
};

const mapDispatchToProps = {
	updateImgSize,
	updateCurrentImg,
	updateFlipedImg,
}

export default connect(mapStateToProps, mapDispatchToProps)(ImgFigure);

