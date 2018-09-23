import { types } from 'mobx-state-tree';

export const Stencil = types
  .model('Stencil', {
    type: types.identifier,
    icon: types.string,
    props: types.map(types.string)
  }).actions(self => ({
    createInstance() {
    }
  }));