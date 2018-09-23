import React from 'react';
import { BaseStencil } from 'stores/stencils/BaseStencil';
export const TextboxStencil = BaseStencil.named('TextboxStencil').props({
  w: 400,
  h: 'auto',
  type: 'textbox'
}).actions(self => ({
  afterCreate() {
    let props = self.props;
    self.props = {
      content: props.get('content') || '123',
      fontSize: props.get('fontSize') || 14,
      color: props.get('color') || '#000000',
      textAlign: props.get('textAlign') || 'left'
    };
  }

}));