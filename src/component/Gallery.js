import React, {Component} from 'react';
import {connect} from 'react-redux';

// import store from '../redux/store.js';
import GalleryController from './GalleryController.js';
import ImgFigure from './ImgFigure.js';

import {updateImg, updateImgPosition} from '../redux/actions/imgAction.js';
import {updateStagePosition} from '../redux/actions/stageAction.js';
import {degreeRange} from '../config/config.js';


//每次update都会运行render
//但construc, componentDidMount只会运行一次
//清楚什么变量能在什么时候拿到，能在什么时候使用，很重要
//使用redux，在第一次render做出的改变，在第二次render的时候才能拿到
class Gallery extends Component {

    constructor(props){
        console.log('parent create');
        super(props);
        this.galleryRef = React.createRef();
        this.initialImgs = this.getInitialImgs();
        this.props.updateImg(this.initialImgs); 
        
        this.imgFigureJsx = []; //child element list
        this.initialImgs.forEach((element, index) => {
            this.imgFigureJsx.push(<ImgFigure key={index} index={index} onclick={this.setCenterImg}/>)
        });
        this.setCenterImg = this.setCenterImg.bind(this);
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
    
    getInitialImgs(){
        let imgs = require('../data/images.json');
        imgs = imgs.map((each, index) => {
            each['path'] = require(`../data/${each['name']}`);
            each['fliped'] = false;
            each['position'] = {
                left: 0,
                top: 0,
                degree: 0,
            };
            each['size'] = {
                width: 0,
                height: 0,
            };            
            return each;
        });
        return imgs;
    }

    getStageInfo(galleryRef=undefined, imgSize=undefined){
        const galleryWidth = galleryRef?galleryRef.current.scrollWidth:0;
        const galleryHeight = galleryRef?galleryRef.current.scrollHeight:0;
        const halfGalleryWidth = Math.ceil(galleryWidth / 2);
        const halfGalleryHeight = Math.ceil(galleryHeight / 2);

        const imgFigureWidth = imgSize?imgSize.width:0;
        const imgFigureHeight = imgSize?imgSize.height:0;
        const halfImgFigureWidth = Math.ceil(imgFigureWidth / 2);
        const halfImgFigureHeight = Math.ceil(imgFigureHeight / 2);

        const stage = {
            leftSide: {
                left: {
                    start: -halfImgFigureWidth, //左侧水平方向最小值
                    end: halfGalleryWidth - halfImgFigureWidth*3, //左侧水平方向最大值
                },
                top: {
                    start: -halfImgFigureHeight, //左侧垂直方向最小值
                    end: galleryHeight - halfImgFigureWidth, //左侧垂直方向最大值
                }
            },
            rightSide: {
                left: {
                    start: halfGalleryWidth + halfImgFigureWidth, //右侧水平方向最小值
                    end: galleryWidth - halfImgFigureWidth, //右侧水平方向最大值
                },
                top: {
                    start: -halfImgFigureHeight, //右侧垂直方向最小值
                    end: galleryHeight - halfImgFigureWidth, //右侧垂直方向最大值
                }       
            },
            center: {
                left: halfGalleryWidth - halfImgFigureWidth, //中间水平方向值
                top: halfGalleryHeight - halfImgFigureHeight, //中间垂直方向值
            },
        };
        return stage;
    }

    render(){
        console.log('parent render');
        // this.rearrange(this.props.stage.currentImgIndex, this.props.stage, this.initialImgs);
        return (
            <section className="gallery" ref={this.galleryRef}>
                <section className="img-sec">
                    {this.imgFigureJsx}
                </section>
                <nav className="gallery-controller">
                    <GalleryController />
                </nav>
            </section>
        );
    }

    componentDidMount(){
        console.log('parent mount');
        const stageInfo = this.getStageInfo(this.galleryRef, this.initialImgs[0].size);
        this.props.updateStagePosition(stageInfo);
        this.rearrange(this.props.stage.currentImgIndex, stageInfo, this.initialImgs);
    }

    componentDidUpdate(){
        console.log('parent update')
    }

    /**
     * [布局]
     * @param center img index
     * @return array of new positions
     */
    rearrange(centerIndex=0, stageInfo, imgs){
        console.log('rere')
        const leftSide = stageInfo.leftSide;
        const rightSide = stageInfo.rightSide;
        const center = stageInfo.center;

        //set position for let, right
        imgs = imgs.map((each, index) => {
            each['position'] = {};
            if (index%2 === 1){
                //put to left side
                each['position']['left'] = this.getRandomBetween(leftSide.left.start, leftSide.left.end);
                each['position']['top'] = this.getRandomBetween(leftSide.top.start, leftSide.top.end);
                each['position']['degree'] = this.getRandomBetween(degreeRange.start, degreeRange.end);
            }else{  
                //put to right side
                each['position']['left'] = this.getRandomBetween(rightSide.left.start, rightSide.left.end);
                each['position']['top'] = this.getRandomBetween(rightSide.top.start, rightSide.top.end);
                each['position']['degree'] = this.getRandomBetween(degreeRange.start, degreeRange.end);
            }
            return each;
        });

        //set position for center
        imgs[centerIndex]['position']['left'] = center.left;
        imgs[centerIndex]['position']['top'] = center.top;
        imgs[centerIndex]['position']['degree'] = 0;

        this.props.updateImg(imgs);
    }

    getRandomBetween(low, high){
        return Math.ceil(Math.random() * (high - low) + low);
    }
}


const mapStateToProps = (store) => {
    return {
        img: store.img,
        stage: store.stage,
    }
};

const mapDispatchToProps = {
    updateImg,
    updateImgPosition,
    updateStagePosition,
}


//ES7 decorator
//connect(mapStateToProps, mapDispatchToProps)
//return object with props = states
//then can be used as normal props
export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
