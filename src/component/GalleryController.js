import React, { Component } from 'react';
import { connect } from 'react-redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faUndo from '@fortawesome/fontawesome-free-solid/faUndo';
import faRedo from '@fortawesome/fontawesome-free-solid/faRedo';

import { updateCurrentImg, updateFlipedImg } from '../redux/actions/imgAction.js';

class GalleryController extends Component {

    constructor(props){
        super(props);
    }

    render() {
        let controller = [];
        if (this.props.data.length){
            this.props.data.forEach((each, index) => {
                // icon
                // let fontImg;
                // if (each['fliped'] === true){
                //     fontImg = <FontAwesomeIcon icon={faUndo}/>
                // }else{
                //     fontImg = <FontAwesomeIcon icon={faRedo}/>
                // }
                controller.push(
                    <div className={`controller-item ${each['centered']?'is-center':''}`}
                        key={index} onClick={(e) => this.handleClick(e, index)}>
                        {index+1}
                    </div>
                )
            });
        }

        return (
            <div className="gallery-controller-inner">
                {controller}       
            </div>
        );
    }

    handleClick(e, index){
        e.preventDefault();
		if (this.props.data[index].centered === false){
			//set to center 
			this.props.updateCurrentImg(index);
		}else{
			//flip
			this.props.updateFlipedImg(index);
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
	updateCurrentImg,
	updateFlipedImg,
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryController);
