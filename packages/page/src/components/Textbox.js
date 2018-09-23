import React from 'react';
import ContentEditable from 'react-contenteditable';

class Textbox extends React.Component {
  render() {
    const {store, node} = this.props;
    return (

      <div style={{padding: '0 4px', border: '1px solid #eee'}}>
        {this.props.children}
      </div>

    )
  }
}

export default Textbox;

/*
<ContentEditable
        onChange={e => instance.setProp('content', e.target.value)}
        html={instance.props.get('content')}
        style={{
          fontSize: instance.props.get('fontSize'),
          color: instance.props.get('color'),
          textAlign: instance.props.get('textAlign')
        }}
      />
 */