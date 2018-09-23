import React from 'react';
import Card from './components/Card';
import Textbox from './components/Textbox';
import Panel from './components/Panel';
import { Rnd } from 'react-rnd';
import { inject, observer } from 'mobx-react';
import { Icon, Tooltip, Progress } from 'antd';
import Coder from 'components/components/Coder';

@inject('store')
@observer
class UIComponent extends React.Component {

  renderComponent() {
    let {instance} = this.props;
    if (instance.type === 'card') {
      return (
        <Card instance={this.props.instance}/>
      )
    } else if (instance.type === 'coder') {
      return (
        <Coder instance={this.props.instance}/>
      )
    } else if (instance.type === 'textbox') {
      return (
        <Textbox instance={this.props.instance}/>
      )
    }
  }

  onClick = (e) => {
    this.props.store.setActiveInstance(this.props.instance);
    e.stopPropagation();
  }

  render() {
    const {instance, store} = this.props;
    return (
      <Rnd bounds='parent' dragHandleClassName='dragHandle'
           style={{
             cursor: store.dnd ? 'move' : 'auto',
             borderWidth: this.props.active ? 1 : 0,
             borderColor: '#0e0',
             borderStyle: 'solid'
           }}
           default={{
             x: instance.x - instance.x % 10,
             y: instance.y - instance.y % 10,
             height: instance.h,
             width: instance.w
           }}
           bounds='parent' dragGrid={[10, 10]} resizeGrid={[10, 10]} onMouseDown={this.onClick}
           onResizeStop={(e, dir, ref, delta) => {
             instance.setWidth(instance.w + delta.width);
             instance.setHeight(instance.h + delta.height)
           }}
           onDragStop={(e, d) => {
             instance.setX(d.x);
             instance.setY(d.y)
           }}
      >
        {this.renderComponent()}
        {this.props.active &&
        <div
          style={{width: 40, height: 20, position: 'absolute', right: 2, top: 2, textAlign: 'right', letterSpacing: 4}}>
          <Icon className='dragHandle' type="menu-unfold"/>
          <Tooltip title='删除'>
            <Icon type="close" onClick={() => {
              store.currentPage.removeInstance(instance)
            }}/>
          </Tooltip>
        </div>
        }
      </Rnd>
    )
  }
}

export default UIComponent;