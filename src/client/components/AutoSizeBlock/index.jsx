import React, { Component } from 'react';

const EPSILON = 0.01;

export default class AutoSizeBlock extends Component {
  static defaultProps = {
    maxFontSize: 2,
  }

  constructor() {
    super();
    this.state = { fontSize: 1 };
  }

  componentDidMount() {
    (async () => {
      await document.fonts.ready;
      const parent = this.el.parentNode;
      const { width: maxWidth, height: maxHeight } = parent.getBoundingClientRect();
      let { width, height } = this.el.getBoundingClientRect();
      let upper = this.props.maxFontSize;
      let lower = 0;
      while (upper - lower > EPSILON) {
        await new Promise(res => {
          this.setState({ fontSize: ((upper - lower) / 2) + lower }, res);
        });
        ({ width, height } = this.el.getBoundingClientRect());
        if (width > maxWidth || height > maxHeight) {
          upper = this.state.fontSize;
        } else {
          lower = this.state.fontSize;
        }
      }
      if (width > maxWidth || height > maxHeight) {
        this.setState({ fontSize: lower });
      }
    })();
  }

  render() {
    return (
      <span style={{ fontSize: `${this.state.fontSize}em` }} ref={el => { this.el = el; }}>{this.props.children}</span>
    );
  }
}
