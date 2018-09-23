import React from 'react';
import { Icon } from 'antd';
import SplitPane from 'react-split-pane';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'antd/lib/icon/style/css';
import './Coder.css';

require('codemirror/mode/python/python');

class Coder extends React.Component {

  state = {
    outputHeight: 0,
    output: '正在运行...'
  }

  run = () => {
    fetch('http://run.kfcoding.com', {
      method: 'POST',
      body: JSON.stringify({language: 'python3', code: this.props.node.data.get('code')})
    }).then(res => res.json())
      .then(data => this.setState({output: data.result || data.error}))
    this.setState({outputHeight: 200})
  }

  hideOutput = () => {
    this.setState({outputHeight: 0})
  }

  updateCode = (code) => {
    let {node, editor} = this.props;
    const change = editor.value.change().setNodeByKey(node.key, {
      data: node.get('data').merge({
        code: code
      })
    });
    editor.onChange(change);
  }

  render() {
    const {node} = this.props;
    let options = {
      lineNumbers: true,
      mode: 'python'
    };
    return (
      <SplitPane
        split='horizontal'
        primary='second'
        defaultSize={this.state.outputHeight}
        size={this.state.outputHeight}
        minSize={0}
        paneStyle={{overflow: 'auto'}}
        style={{border: '1px solid #eee'}}
      >
        <div style={{height: '100%'}}>
          <div style={{borderBottom: '1px solid #eee', height: 30, lineHeight: '30px', paddingLeft: 28}}>
            <Icon type="caret-right" onClick={this.run}/>
          </div>
          <div style={{height: 'calc(100% - 30px)'}} onClick={e => e.stopPropagation()}>
            <CodeMirror value={node.data.get('code')} onChange={this.updateCode} options={options} style={{height: '100%'}}/>
          </div>
        </div>
        <div>
          <Icon type='down' style={{position: 'absolute', right: 2, top: 2}} onClick={this.hideOutput}/>
          {this.state.output}
        </div>
      </SplitPane>
    )
  }
}

export default Coder;