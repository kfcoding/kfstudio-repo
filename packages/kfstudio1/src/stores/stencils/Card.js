import React from 'react';
import {types} from 'mobx-state-tree';
import { Card as AntdCard } from 'antd';
import { BaseStencil } from 'stores/stencils/BaseStencil';
import { Instance } from 'stores/Instance';

export const CardStencil = BaseStencil
  .named('CardStencil')
  .props({
    w: 400,
    h: 500,
    type: 'card',
  }).actions(self => ({
    afterCreate() {
      self.props = {
        title: '标题',
        content: '内容'
      }
    }
  }));
