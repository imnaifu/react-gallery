import React, { Component } from 'react';
import GalleryController from './GalleryController.js';
import ImgFigure from './ImgFigure.js';

require('../styles/main.scss');

class Gallery extends React.Component {

    constructor(){
        super()
        this.state = {
            imgInfos: []
        }
    }

    componentDidMount(){
        const imgData = require('../data/images.json');
        this.setState({
            imgInfos: this.addImgPath(imgData)
        })
    }

    addImgPath(imgInfos){
        imgInfos.forEach(function(each){
            each['path'] = `../data/${each['name']}`;
            return each;
        });
        return imgInfos;
    }

    renderImg(){
    	return <ImgFigure />
    }	

    render() {
        return (
            <section className="gallery">
                <section className="img-sec">

                </section>
                <nav className="gallery-controller">
                    <GalleryController />
                </nav>
            </section>
        );
    }
}

export default Gallery;
