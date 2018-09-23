import { types } from 'mobx-state-tree';
import { StencilType } from 'stores/stencils';


const StencilIcon = types
  .model('StencilIcon', {
    id: types.optional(types.identifier, () => new Date().getTime() + ''),
    stencil: StencilType,
    icon: types.string,
  }).actions(self => ({

  }));

export const StencilIconStore = types
  .model('StencilIconStore', {
  }).actions(self => ({

  }));