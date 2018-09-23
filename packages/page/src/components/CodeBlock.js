import React from 'react';
import { languages } from 'prismjs/components.json';
import './CodeBlock.css';

const style = {
  background: '#f7f7f7',
  border: '1px solid #e6e6e6',
  minHeight: '40px',
  padding: '4px',
  counterReset: 'line',
  position: 'relative'
};

class CodeBlock extends React.Component {

  render() {
    return (
        <pre {...this.props.attributes} style={style}>
          {this.props.children}
        </pre>
    )
  }
}

export default CodeBlock;