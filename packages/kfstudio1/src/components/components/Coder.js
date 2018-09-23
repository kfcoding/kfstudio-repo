import React from 'react';
import { Icon } from 'antd';
import { inject, observer } from 'mobx-react';
import SplitPane from 'react-split-pane';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';

require('codemirror/mode/javascript/javascript');

@inject('store')
@observer
class Coder extends React.Component {

  state = {
    outputHeight: 0,
    output: ''
  }

  run = () => {
    fetch('http://run.kfcoding.com', {
      method: 'POST',
      body: JSON.stringify({language: this.props.instance.props.get('language'), code: this.props.instance.props.get('content')})
    }).then(res => res.json())
      .then(data => this.setState({output: data.result}))
    this.setState({outputHeight: 200})
  }

  hideOutput = () => {
    this.setState({outputHeight: 0})
  }

  updateCode = (code) => {
    this.props.instance.setProp('content', code);
  }

  render() {
    const {store, instance} = this.props;
    let options = {
      lineNumbers: true,
      mode: 'javascript'
    };
    return (
      <SplitPane
        split='horizontal'
        primary='second'
        defaultSize={this.state.outputHeight}
        size={this.state.outputHeight}
        minSize={0}
      >
        <div style={{border: '1px solid #eee', height: '100%'}}>
          <div style={{borderBottom: '1px solid #eee', height: 30, lineHeight: '30px', paddingLeft: 28}}>
            <Icon type="caret-right" onClick={this.run}/>
          </div>
          <div style={{height: 'calc(100% - 30px)'}}>
          <CodeMirror value={instance.props.get('content')} onChange={this.updateCode} options={options} style={{height: '100%'}}/>
          </div>
        </div>
        <div style={{position: 'relative'}}>
          <Icon type='down' style={{position: 'absolute', right: 2, top: 2}} onClick={this.hideOutput}/>
          {this.state.output}
        </div>
      </SplitPane>
    )
  }
}

export default Coder;