import React, { Component } from 'react';
import GalleryController from './GalleryController.js';
import ImgFigure from './ImgFigure.js';

require('../styles/main.scss'); //这里是同步的

class Gallery extends React.Component {

    constructor(){
        super();
        this.imgData = require('../data/images.json');
        this.
        this.imgFigureDoms = [];
        this.state = {
            imgInfos: [],
            imgFigures: [],
            imgPosRange: {
                horizontal: {
                    left: {
                        start: 0, //左侧水平方向最小值
                        end: 0, //左侧水平方向最大值
                    },
                    right: {
                        start: 0, //右侧水平方向最小值
                        end: 0, //右侧水平方向最大值
                    }
                },
                vertical: {
                    start: 0, //垂直方向最小值
                    end: 0, //垂直方向最大值
                },
                center: {
                    left: 0, //中心图片位置
                    top: 0, //中心图片位置
                }
            },
            imgArrangeArr: []
        };
    }

    componentWillMount(){
        const imgInfos = this.addImgPath(imgData);
        const imgFigures = this.getImgFigures(imgInfos);
        // console.log(imgFigures);
        // console.log(this.gallery);
        this.setState({
            imgInfos: imgInfos,
            imgFigures: imgFigures,
        });
    }

    componentDidMount(){
        const galleryWidth = this.gallery.scrollWidth;
        const galleryHeight = this.gallery.scrollHeight;
        const halfGalleryWidth = Math.ceil(galleryWidth / 2);
        const halfGalleryHeight = Math.ceil(galleryHeight / 2);

        const imgFigureWidth = this.imgFigureDoms_0.scrollWidth;
        const imgFigureHeight = this.imgFigureDoms_0.scrollHeight;
        const halfImgFigureWidth = Math.ceil(imgFigureWidth / 2);
        const halfImgFigureHeight = Math.ceil(imgFigureHeight / 2);


        this.setState({
            imgPosRange: {
                horizontal: {
                    left: {
                        start: -halfImgFigureWidth,
                        end: halfGalleryWidth - halfImgFigureWidth*3,
                    },
                    right: {
                        start: halfGalleryWidth + halfImgFigureWidth,
                        end:  galleryWidth - halfImgFigureWidth,
                    }
                },
                vertical: {
                    start: -halfImgFigureHeight,
                    end: galleryHeight - halfImgFigureWidth,
                },
                center: {
                    left: halfGalleryWidth - halfImgFigureWidth, 
                    top: halfGalleryHeight - halfImgFigureHeight,
                }
            },
        });

        this.rearrange(0);
    }

    /**
     * [布局]
     * @param  {[type]} centerIndex [description]
     * @return {[type]}       [description]
     */
    rearrange(centerIndex){
        const imgArrangeArr = this.state.imgArrangeArr;
        const imgPosRange = this.state.imgPosRange;

        const imgArrangeArrCenter = imgArrangeArr.splice(centerIndex, 1);
        imgArrangeArrCenter.pos = imgPosRange.center;

        imgArrangeArr.forEach( function(element, index) {
            if (index%2 === 1){
                //put to left side
                
            }else{
                //put to right side
            }
        });
        // const imgArrangeArrLeft = 
    }

    getRandomBetween(low, high){
        return Math.ceil(Math.random() * (hight - low) + low);
    }

    addImgPath(imgData){
        imgData.map(function(each){
            each['path'] = require(`../data/${each['name']}`);
            return each;
        });
        return imgData;
    }

    getImgFigures(imgInfos){
        const imgFigures = [];
        imgInfos.forEach((each, index) => {
            if (!this.state.imgArrangeArr[index]){
                const pos = {
                    position: {
                        left: 0,
                        top: 0
                    }
                };
                this.state.imgArrangeArr[index] = pos;
                each['pos'] = pos; 
            }else{
                each['pos'] = this.state.imgArrangeArr[index]; 
            }

            imgFigures.push(<ImgFigure data={each} key={index} figureRef={(ref) => {
                // this.imgFigureDoms.push(ref);
                this[`imgFigureDoms_${index}`] = ref;
            }}/>);            
        }); 
        return imgFigures;
    }

    render() {

        return (
            <section className="gallery" ref={(ref) => {this.gallery=ref;}}>
                <section className="img-sec">
                    {this.state.imgFigures}
                </section>
                <nav className="gallery-controller">
                    <GalleryController />
                </nav>
            </section>
        );
    }
}

export default Gallery;
