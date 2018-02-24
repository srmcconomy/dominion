import React, { Component } from 'react';

export default class AutoSizeText extends Component {
  static defaultProps = {
    maxFontSize: Infinity,
  }

  constructor() {
    super();
    this.state = { fontSize: 1 };
  }

  componentDidMount() {
    (async () => {
      await document.fonts.ready;
      const parent = this.el.parentNode;
      const maxWidth = parent.getBoundingClientRect().width;
      const { width } = this.el.getBoundingClientRect();
      const multiplier = maxWidth / width;
      this.setState({ fontSize: Math.min(this.props.maxFontSize, this.state.fontSize * multiplier) });
    })();
  }

  render() {
    return (
      <span style={{ fontSize: `${this.state.fontSize}em`, whiteSpace: 'nowrap' }} ref={el => { this.el = el; }}>{this.props.children}</span>
    );
  }
}
