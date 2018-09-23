import { types, getSnapshot } from 'mobx-state-tree';
import { CardStencil } from 'stores/stencils/Card';
import { CoderStencil } from 'stores/stencils/Coder';
import { StencilType } from 'stores/stencils';
import {getRoot} from 'mobx-state-tree';
import { Instance } from 'stores/Instance';
import { TextboxStencil } from 'stores/stencils/Textbox';
import { BaseStencil } from 'stores/stencils/BaseStencil';

export const Page = types
  .model('Page', {
    id: types.optional(types.identifier, () => new Date().getTime() + ''),
    width: 1000,
    height: 640,
    name: '页面',
    instances: types.array(StencilType)
  }).actions(self => ({
    addInstance(args) {

      let instance = undefined;

      if (args.type === 'card') {console.log(args)
        instance = CardStencil.create(args);
      } else if (args.type === 'coder') {
        instance = CoderStencil.create({...args});
      } else if (args.type === 'textbox') {
        instance = TextboxStencil.create(args);
      }

      if (!instance) {
        console.error('no such stencil', args);
        return;
      }

      self.instances.push(instance);
      getRoot(self).setActiveInstance(instance);
      return;

      if (args.type === 'card') {
        instance = CardStencil.create(args);
      } else if (args.type === 'coder') {
        instance = CoderStencil.create(args);
      }

      if (instance) {
        self.instances.push(instance);
        getRoot(self).setActiveInstance(instance);
      }
    },
    removeInstance(instance) {
      getRoot(self).setActiveInstance(undefined);
      self.instances.remove(instance);
    },
    setName(name) {
      self.name = name;
    }
  }));