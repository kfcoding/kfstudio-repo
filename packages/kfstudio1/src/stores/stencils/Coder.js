import React from 'react';
import {types} from 'mobx-state-tree';
import { Card as AntdCard } from 'antd';
import { BaseStencil } from 'stores/stencils/BaseStencil';

export const CoderStencil = BaseStencil
  .named('CoderStencil')
  .props({
    w: 500,
    h: 500,
    type: 'coder'
  }).actions(self => ({
    afterCreate() {
      self.props = {
        language: 'javascript',
        content: '// type your code here'
      }
    }
  }));
