import React from 'react';
import ContentEditable from 'react-contenteditable';
import { Rnd } from 'react-rnd';
import { Card as AntdCard } from 'antd';
import { inject, observer } from 'mobx-react';

@inject('store')
// @observer
class Card extends React.Component {
  render() {
    const {store, instance} = this.props;
    return (
        <AntdCard style={{width: '100%', height: '100%'}} title={<ContentEditable onChange={e => instance.setProp('title', e.target.value)} html={instance.props.get('title')}/>}>
          <ContentEditable onChange={(e) => instance.setProp('content', e.target.value)} html={instance.props.get('content')} style={{overflow: 'auto', height: '100%'}}/>
        </AntdCard>
    )
  }
}

export default Card;