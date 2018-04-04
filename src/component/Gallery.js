import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import GalleryController from './GalleryController.js';
import ImgFigure from './ImgFigure.js';

import { updateImg } from '../redux/actions/imgAction.js';
import { updateImsPositions } from '../redux/actions/stageAction.js';
import { degreeRange } from '../config/config.js';


//每次update都会运行render
//但construc, componentDidMount只会运行一次
//清楚什么变量能在什么时候拿到，能在什么时候使用，很重要
//使用redux，在第一次render做出的改变，在第二次render的时候才能拿到
class Gallery extends Component {

    constructor(props){
        // console.log('parent create');
        super(props);
        this.galleryRef = React.createRef();
    
        this.initialImgs = this.getInitialImgs();
        this.props.updateImg(this.initialImgs); 
        //first time here props still empty
    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        // console.log('getSnapshotBeforeUpdate');
        return null;
    }

    render(){
        //fist time here this.props still empty
        // console.log('parent render');   
        
        let imgFigureJsx;
        if (this.props.img.length){
            //next round
            const stageInfo = this.getStageInfo(this.galleryRef, this.props.img[0].size);

            //here to stop position change when img flip
            let needToRearrangePosition = false;   
            if (this.savedImgs){
                this.savedImgs.forEach((each, index) => {
                    if (each.centered !== this.props.img[index].centered){
                        needToRearrangePosition = true;
                    }
                    each['fliped'] = this.props.img[index].fliped;                    
                });                    
            }else{
                needToRearrangePosition = true;
            }
            let imgs = [];
            if (needToRearrangePosition){
                imgs = this.arrangeImgs(stageInfo, this.props.img);
            }else{
                imgs = _.cloneDeep(this.savedImgs);
            }

            imgFigureJsx = this.renderImgFigure(imgs);
            this.savedImgs = imgs; //save as prevstate.
        }else{
            //first time render inital images
            imgFigureJsx = this.renderImgFigure(this.initialImgs);
        }

        return (
            <section className="gallery" ref={this.galleryRef}>
                <section className="img-sec">
                    {imgFigureJsx}
                </section>
                <nav className="gallery-controller">
                    <GalleryController data={this.props.img}></GalleryController>
                </nav>
            </section>
        );
    }

    componentDidMount(){
        // console.log('parent mount');
        //first time here props also empty        
    }

    componentDidUpdate(){
        // console.log('parent update');
    }

    getInitialImgs(){
        const imgs = require('../data/images.json');
        imgs.forEach((each, index) => {
            //here each is object, passed by reference
            each['path'] = require(`../data/${each['name']}`);
            each['fliped'] = false;
            each['centered'] = false;
            each['position'] = {
                left: 0,
                top: 0,
                degree: 0,
            };
            each['size'] = {
                width: 0,
                height: 0,
            };            
        });
        return imgs;
    }

    getStageInfo(galleryRef, imgSize){
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
                top: halfGalleryHeight - halfImgFigureHeight - 50, //中间垂直方向值
            },
        };
        return stage;
    }

    renderImgFigure(imgs){
        const imgFigureJsx = []; //child element list
        imgs.forEach((element, index) => {
            imgFigureJsx.push(
                <ImgFigure key={index} index={index} data={element}/>
            )
        });
        return imgFigureJsx;
    }

    /**
     * [布局]
     * @param center img index
     * @return array of new positions
     */
    arrangeImgs(stageInfo, imgs){
        const cloneImgs = _.cloneDeep(imgs);
        const leftSide = stageInfo.leftSide;
        const rightSide = stageInfo.rightSide;
        const center = stageInfo.center;

        //set position for let, right
        cloneImgs.forEach((each, index) => {
            if (each['centered']){
                //set position for center
                each['position']['left'] = center.left;
                each['position']['top'] = center.top;
                each['position']['degree'] = 0;
            }else{
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
            }
        });
        return cloneImgs;
    }

    getRandomBetween(low, high){
        return Math.ceil(Math.random() * (high - low) + low);
    }
}


const mapStateToProps = (store) => {
    return {
        img: store.img,
    }
};

const mapDispatchToProps = {
    updateImg,
    updateImsPositions,
}


//ES7 decorator better
//connect(mapStateToProps, mapDispatchToProps)
//return object with props = states
//then can be used as normal props
export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
