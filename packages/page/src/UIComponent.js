import React from 'react';
// import Card from './components/Card';
import Textbox from './components/Textbox';
import { Rnd } from 'react-rnd';
import { Icon, Tooltip } from 'antd';
import Coder from './components/Coder';
import 'antd/lib/icon/style/css';
import 'antd/lib/tooltip/style/css';
import keydown from 'react-keydown';
import styled, { css } from 'styled-components';
import CodeBlock from './components/CodeBlock';

const DragDiv = styled.div`
  width: 100%;
  height: 100%;
  ${props => props.active && css`
    border: 2px solid #333;
    cursor: move;
  `}
`;

class UIComponent extends React.Component {

  @keydown('backspace')
  test() {
    console.log('aaa')
    let cg = this.props.editor.value.change().removeNodeByKey(this.props.node.key)
    this.props.editor.onChange(cg)
  }

  onDelete = () => {

    let cg = this.props.editor.value.change().removeNodeByKey(this.props.node.key)
    this.props.editor.onChange(cg)
  }

  renderComponent() {
    let {node} = this.props;
    // if (node.type === 'card') {
    //   return (
    //     <Card node={this.props.node}/>
    //   )
    // } else
    if (node.type === 'coder') {
      return (
        <Coder {...this.props}/>
      )
    } else if (node.type === 'textbox') {
      return (
        <Textbox {...this.props}/>
      )
    } else if (node.type === 'test') {
      return <div>555<input type='radio' name='aaa' value={3}/><input type='radio' name='aaa' value={5}/></div>
    } else if (node.type === 'code_block') {
      return <CodeBlock {...this.props}></CodeBlock>
    }
  }

  onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.editor.change(change => change.blur())
    // this.props.editor.change(change => {
    //   const cg = change.setNodeByKey(this.props.node.key, {isSelected: true})
    //   this.props.editor.onChange(cg);
    // })
    //this.props.editor.value.set('focusBlock', this.props.node.key)
    // this.props.store.setActiveInstance(this.props.node);
    //e.stopPropagation();
  }

  render() {
    const {node} = this.props;
    return (
      <Rnd
        {...this.props.attributes}
        // dragHandleClassName='drag'
        style={{
          border: this.props.isSelected ? '2px solid #900': 'none'
        }}
        resizeHandleStyles={{
          top: {
            width: 8,
            height: 8,
            left: 'calc(50% - 4px)',
            top: -4,
            border: '1px solid #333'
          },
          bottom: {
            width: 8,
            height: 8,
            left: 'calc(50% - 4px)',
            border: '1px solid #333',
            bottom: -4
          },
          left: {
            width: 8,
            height: 8,
            top: 'calc(50% - 4px)',
            border: '1px solid #333',
            left: -4,
          },
          right: {
            width: 8,
            height: 8,
            top: 'calc(50% - 4px)',
            border: '1px solid #333',
            right: -4
          }
        }}
        cancel='.cancel'
        default={{
          x: node.data.get('x') - node.data.get('x') % 10,
          y: node.data.get('y') - node.data.get('y') % 10,
          height: node.data.get('h'),
          width: node.data.get('w')
        }}
        position={{
          x: node.data.get('x') - node.data.get('x') % 10,
          y: node.data.get('y') - node.data.get('y') % 10
        }}
        size={{
          height: node.data.get('h'),
          width: node.data.get('w')
        }}
        bounds='.editor'
        dragGrid={[10, 10]}
        resizeGrid={[10, 10]}
        onResize={(e, d, r, delta, position) => {
          const change = this.props.editor.value.change().setNodeByKey(node.key, {
            data: node.get('data').merge({
              w: r.offsetWidth,
              h: r.offsetHeight,
              ...position
            })
          });
          this.props.editor.onChange(change);
          e.stopPropagation();
        }}
        onDragStop={(e, d) => {
          const change = this.props.editor.value.change().setNodeByKey(node.key, {
            data: node.get('data').merge({
              x: d.x,
              y: d.y
            })
          });
          this.props.editor.onChange(change);
          e.stopPropagation();
        }}
        onClick={this.onClick}
        resizeHandleWrapperStyle={{display: this.props.isSelected ? 'block' : 'none'}}
        tabIndex={this.props.node.key}
      >
        {/*<DragDiv className='drag' active={this.props.isSelected} onClick={(e) => {this.props.editor.change(change => {change.blur();  change.select()}); e.stopPropagation()}}>*/}
          <div className='cancel' style={{cursor: 'default', overflow: 'hidden', width: '100%', height: '100%'}} onClick={e => {e.stopPropagation();this.props.editor.change(change => change.select())}}>

            <div contentEditable={false} style={{position: 'absolute', right: 5, top: 0}}><Icon type='delete' style={{cursor: 'pointer'}} onClick={this.onDelete}/></div>
            {this.renderComponent()}
          </div>
        {/*</DragDiv>*/}

      </Rnd>
    )
  }
}

export default UIComponent;