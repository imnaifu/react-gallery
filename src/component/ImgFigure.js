import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateImgSize } from '../redux/actions/imgAction.js';

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

	// methods
	render(){
		console.log('child render')
		const index = this.props.index;
		const style = {
			...this.props.data.position,
			transform: `rotate(${this.props.data.position.degree}deg)`,
		}
		return (
			<figure className='img-figure' ref={this.figureRef} style={style} >
				<img src={this.props.data.path} alt={this.props.data.title}/>
				<figcaption className='img-caption'>
					<h2>{this.props.data.title}</h2>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(ImgFigure);

