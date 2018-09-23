import React from 'react';
import { Progress, Button, Icon } from 'antd';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import KfstudioPage from '@kfstudio/page';
import { Value, Block } from 'slate';

const Container = styled.div`
  background: #eee;
  position: relative;
  z-index: 0;
  overflow: auto;
  height: 100%;
  width: 100%;
  padding: 20px;
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


const initialValue = Value.fromJSON({
  document: {
    // nodes: [{
      // object: 'block',
      // type: 'page',
      // data: {
      //   w: 1000,
      //   h: 640
      // },
      nodes: [{
        object: 'block',
        type: 'paragraph',
        nodes: [{
          object: 'text',
          leaves: [{
            text: ''
          }]
        }]
      }],
    // }]

  },
})

@inject('store')
@observer
class Content extends React.Component {
  static defaultProps = {
    className: 'layout',
    cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
    rowHeight: 100
  };

  constructor(props) {
    super(props);
    this.dom = React.createRef();
    this.helperDom = React.createRef();
  }

  state = {
    value: initialValue,
    rect: null
  }

  schema = {
    blocks: {
      dummy: {
        isVoid: true,
      },
      coder: {
        isVoid: true
      }
    },
  }

  onChange = ({value}) => {
    this.setState({value})
    console.log(value.toJSON())
  }


  onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {value} = this.state;
    this.state.rect = this.dom.current.getBoundingClientRect();
    let change = this.state.value.change();
    console.log(e.dataTransfer.getData('text/plain'))
    switch (e.dataTransfer.getData('text/plain')) {
      case 'textbox':
        var node = Block.create({
          object: 'block',
          type: 'container',
          data: {
            x: e.pageX - this.state.rect.x,
            y: e.pageY - this.state.rect.y,
            w: 300,
            h: 80
          },
          nodes: [{
            object: 'block',
            type: 'paragraph',
            nodes: [{
              object: 'text',
              leaves: [{
                text: '这里输入内容'
              }]
            }]
          }]
        });
        change.insertNodeByKey(this.state.value.document.key, 0, node).focus();
        // change.insertBlock({
        //   type: 'container',
        //   data: {
        //     x: e.pageX - this.state.rect.x,
        //     y: e.pageY - this.state.rect.y,
        //     w: 300,
        //     h: 50
        //   },
        //   nodes: [{
        //     object: 'block',
        //     type: 'paragraph'
        //   }]
        // }).focus();
        break;
      case 'coder':
        var node = Block.create({
          type: 'container',
          data: {
            x: e.pageX - this.state.rect.x,
            y: e.pageY - this.state.rect.y,
            w: 400,
            h: 400
          },
          nodes: [{
            object: 'block',
            type: 'coder',
            data: {
              code: '# 在这里输入代码\nprint("Hello World!")'
            }
          }]
        });
        change.insertNodeByKey(value.document.key, 0, node).focus();
    }
    this.setState({value: change.value});

  }

  render() {

    let {store} = this.props;
    let pageIndex = store.pages.findIndex(ele => ele === store.currentPage);
    let percent = Math.floor(100 * (pageIndex + 1) / store.pages.length);
    return (
      store.currentPage ?

        <Container onMouseDown={() => {
          store.setActiveInstance(undefined)
        }}>
          <div style={{width: store.currentPage.width, margin: '0 auto'}}>

            <div ref={this.dom} onDrop={this.onDrop} style={{position: 'relative', height: store.currentPage.height, background: '#fff'}}>
              <KfstudioPage value={this.state.value} onChange={this.onChange} schema={this.schema} style={{background: '#fff'}}/>
            </div>
            <Footer>
              学习进度：<Progress percent={percent} style={{width: 400}}/>
              <Button.Group size='' style={{float: 'right'}}>
                <Button type="primary" disabled={(pageIndex === 0 || store.pages.length === 1)} onClick={() => store.setCurrentPage(store.pages[pageIndex - 1])}>
                  <Icon type="left"/>上一节
                </Button>
                <Button type="primary" disabled={(pageIndex + 1 === store.pages.length || store.pages.length === 1)} onClick={() => store.setCurrentPage(store.pages[pageIndex + 1])}>
                  下一节<Icon type="right"/>
                </Button>
              </Button.Group>
            </Footer>
          </div>
          <input type='text' ref={this.helperDom} style={{position: 'absolute', top: -999}}/>
        </Container>
        :
        <div></div>
    )
  }
}

export default Content;