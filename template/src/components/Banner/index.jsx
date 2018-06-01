import React, {Component} from 'react';
import {Carousel} from 'antd-mobile';
import img from '../../static/images/wheat-fields.jpg';

class Banner extends Component {
  state = {
    data: ['1', '2', '3'],
    imgHeight: 176,
  }

  render() {
    return (
      <section className="banner">
        <Carousel
          autoplay={false}
          infinite
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          {this.state.data.map(val => (
            <a
              key={val}
              style={{display: 'inline-block', width: '100%', height: this.state.imgHeight}}
            >
              <img
                src={img}
                alt=""
                style={{width: '100%', verticalAlign: 'top'}}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({imgHeight: 'auto'});
                }}
              />
            </a>
          ))}
        </Carousel>
      </section>
    );
  }
}

export default Banner;