import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import './App.css';
import Header from './components/Header';
import Content from './components/Content';
import Toolbox from './components/Toolbox';
import SplitPane from 'react-split-pane';
import Sidebar from 'components/Sidebar';
import Propbar from 'components/Propbar';

@inject('store')
@observer
class App extends Component {
  constructor() {
    super();
    window.oncontextmenu = () => {
      return false;
    }
    window.addEventListener('keydown', e => {
      if (e.key === 'Control') {
        this.props.store.setDnd(true);
      }
    });

    window.addEventListener('keyup', e => {
      if (e.key === 'Control') {
        this.props.store.setDnd(false);
      }
    })
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        <Header/>
        <SplitPane
          split='vertical'
          defaultSize={180}
          minSize={70}
          primary='second'
          style={{height: 'calc(100vh - 28px)'}}
        >
          <SplitPane
            defaultSize={180}
            pane2Style={{overflow: 'auto'}}
          >
            <Sidebar/>
            <div style={{display: 'flex', flexFlow: 'column', height: '100%'}}>
              <Toolbox/>
              <Content/>
            </div>
          </SplitPane>
          <Propbar/>
        </SplitPane>
      </div>
    );
  }
}

export default App;
