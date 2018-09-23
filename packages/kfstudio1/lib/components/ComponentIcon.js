import React from 'react';
import {inject} from 'mobx-react';

@inject('store')
class ComponentIcon extends React.Component {

  onDragStart = (e) => {
    let dt = e.dataTransfer;
    dt.setData('text/plain', this.props.type);
  }

  onDragEnd = e => {
  }

  render() {
    return (
      <div style={{float: 'left', marginRight: 10}}>
        <span draggable={true} onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
          {this.props.icon}
        </span>
      </div>
    )
  }
}

export default ComponentIcon;