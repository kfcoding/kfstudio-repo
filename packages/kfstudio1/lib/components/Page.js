import React from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import UIComponent from 'components/UIComponent';
import {inject, observer} from 'mobx-react';
import {Progress, Button, Icon} from 'antd';


const Container = styled.div`
  width: ${props => props.page.width + 'px'};
  margin: 0 auto;
  background: #fff;
  position: relative;
`;

const Footer = styled.div`
  height: 60px;
  background: #dadada;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  line-height: 60px;
 
`;

@inject('store')
@observer
class Page extends React.Component {

  state = {
    rect: null
  }

  componentDidMount() {
    if (ReactDOM.findDOMNode(this.refs.dom))
      this.state.rect = ReactDOM.findDOMNode(this.refs.dom).getBoundingClientRect();

  }

  onDragOver = e => {
    e.stopPropagation();
    e.preventDefault();
  }

  onDrop = e => {
    const {page} = this.props;
    page.addInstance({
      x: e.pageX - this.state.rect.x,
      y: e.pageY - this.state.rect.y,
      type: e.dataTransfer.getData('text/plain')
    });
  }

  render() {
    let {page, store} = this.props;
    let pageIndex = store.pages.findIndex(ele => ele === page);
    let percent = Math.floor(100 * (pageIndex + 1) / store.pages.length);
    return (
      <Container ref='dom' onDragOver={this.onDragOver} onDrop={this.onDrop} page={page}>
        <div style={{height: page.height, width: page.width}}>
        {page.instances.map(i => <UIComponent key={i} active={store.activeInstance === i} instance={i}/>)}
        </div>
      </Container>
    )
  }
}

export default Page;