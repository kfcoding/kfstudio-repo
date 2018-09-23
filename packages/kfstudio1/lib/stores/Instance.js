import { types } from 'mobx-state-tree';
import { Stencil } from 'stores/Stencil';
export const Instance = types.model('Instance', {
  /**
   * basic props
   */
  id: types.optional(types.identifier, new Date().getTime() + ''),
  x: 0,
  y: 0,
  z: 0,
  w: 200,
  h: 150,
  active: false,
  // stencil: types.reference(Stencil),
  type: types.string,
  props: types.optional(types.map(types.string), {})
}).views(self => ({})).actions(self => ({
  setWidth(w) {
    self.w = w;
  },

  setHeight(h) {
    self.h = h;
  },

  setX(x) {
    self.x = x;
  },

  setY(y) {
    self.y = y;
  } // afterCreate() {
  //   self.stencil.props.forEach((v, k) => {
  //     self[k] = v;
  //     self.props.set(k, v);
  //   });
  // }


}));