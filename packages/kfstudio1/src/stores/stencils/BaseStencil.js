import { types } from 'mobx-state-tree';

export const BaseStencil = types
  .model('BaseStencil', {
    /**
     * basic props
     */
    id: types.optional(types.identifier, () => new Date().getTime() + '' + Math.random()),
    type: types.string,
    x: 0,
    y: 0,
    z: 0,
    w: 100,
    h: 100,
    props: types.map(types.union(types.string, types.number))
  }).actions(self => ({
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
    },
    setProp(key, value) {
      self.props.set(key, value);
    }
  }));
