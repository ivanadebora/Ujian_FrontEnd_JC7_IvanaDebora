import React, {Component} from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
  } from 'reactstrap';


  const items = [
    {
      src: './images/bumblebee.jpg',
      altText: 'Bumblebee',
      caption: 'Coming Soon on Dec 20, 2018'
    },
    {
      src: './images/mortal_engines.jpg',
      altText: 'Mortal Engines',
      caption: 'Coming Soon on Dec 18, 2018'
    },
    {
      src: './images/aquaman.jpg',
      altText: 'Aquaman',
      caption: 'Coming Soon on Dec 21, 2018'
    }
  ];
  
  class CarouselComing extends Component {
    constructor(props) {
      super(props);
      this.state = { activeIndex: 0 };
      this.next = this.next.bind(this);
      this.previous = this.previous.bind(this);
      this.goToIndex = this.goToIndex.bind(this);
      this.onExiting = this.onExiting.bind(this);
      this.onExited = this.onExited.bind(this);
    }
  
    onExiting() {
      this.animating = true;
    }
  
    onExited() {
      this.animating = false;
    }
  
    next() {
      if (this.animating) return;
      const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
      this.setState({ activeIndex: nextIndex });
    }
  
    previous() {
      if (this.animating) return;
      const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
      this.setState({ activeIndex: nextIndex });
    }
  
    goToIndex(newIndex) {
      if (this.animating) return;
      this.setState({ activeIndex: newIndex });
    }
  
    render() {
      const { activeIndex } = this.state;
  
      const slides = items.map((item) => {
        return (
          <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.src}>
            <img className="gambar" href={item.url} src={item.src} alt={item.altText} />
            <CarouselCaption captionText={item.caption} captionHeader={item.altText}  />
          </CarouselItem>
        );
      });
  
      return (
        <div className="container-fluid" >
          <style>
            {
              `.gambar {
                  width: 100%;
                  height: 500px;
              }`
            }
          </style>
          <Carousel 
            activeIndex={activeIndex}
            next={this.next}
            previous={this.previous}
          >
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
          </Carousel>
        </div>
      );
    }
  }
  
export default CarouselComing;