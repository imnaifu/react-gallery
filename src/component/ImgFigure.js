import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateImgSize } from '../redux/actions/imgAction.js';
import { updateCurrentImg } from '../redux/actions/stageAction.js';

//组件以数组的形式同时render的时候，先全部construct，然后再是一个一个mount
//props在创建的时候已经固定了
/*
	单向数据流的实现难度
	level 1: 一个组件
	level 2: 一个组件加一个子组件
	level 3：一个组件加一群子组件
*/

class ImgFigure extends Component {

	constructor(props) {
		console.log('child create');
		super(props);
		this.figureRef = React.createRef();
	}

	componentDidMount(){
		console.log('child mount');
		
		const imgSize = {
			width: this.figureRef.current.scrollWidth,		
			height: this.figureRef.current.scrollHeight,
		};
		this.props.updateImgSize(this.props.index, imgSize);		
	}

	setCenterImg(e){
		e.preventDefault();
		const prevIndex = this.props.stage.currentImgIndex;
		if (prevIndex === this.props.index){
			//do nothing
		}else{
			this.props.updateCurrentImg(this.props.index);
		}
	}

	// methods
	render(){
		console.log('child render')
		const index = this.props.index;
		const style = {
			...this.props.img[index].position,
			transform: `rotate(${this.props.img[index].position.degree}deg)`,
		}
		return (
			<figure className='img-figure' ref={this.figureRef} style={style} >
				<img src={this.props.img[index].path} alt={this.props.img[index].title}/>
				<figcaption className='img-caption'>
					<h2>{this.props.img[index].title}</h2>
				</figcaption>
			</figure>
		);
	}

}

const mapStateToProps = (store, ownProps) => {
    return {
		img: store.img,
        stage: store.stage,
    }
};

const mapDispatchToProps = {
	updateImgSize,
	updateCurrentImg,
}

export default connect(mapStateToProps, mapDispatchToProps)(ImgFigure);

