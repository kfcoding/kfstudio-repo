import { types, getSnapshot } from 'mobx-state-tree';
import { Page } from 'stores/Page';
import { StencilType } from 'stores/stencils';

export const Store = types
  .model('Store', {
    pages: types.array(Page),
    currentPage: types.maybe(types.reference(Page)),
    activeInstance: types.maybe(types.reference(StencilType)),
  }).views(self => ({
    get currentPageIndex() {
      let idx = 0;

      self.pages.forEach(p => {
        if (p === self.currentPage) {
          return idx;
        }
        idx++;
      })
    }
  })).actions(self => ({
    setActiveInstance(instance) {
      self.activeInstance = instance;
    },
    setDnd(flag) {
      self.dnd = flag;
    },
    addPage(name, type) {
      let page = Page.create({name: name});
      self.pages.push(page);
      self.currentPage = page;

      if (type === 'title-content-code') {
        page.addInstance({type: 'textbox', x: 200, y: 20, w: page.width - 400, props: {content: '标题', fontSize: 24, textAlign: 'center'}});
        page.addInstance({type: 'card', x: 0, y: 80, w: page.width / 2, h: page.height - 80});
        page.addInstance({type: 'coder', x: page.width / 2, y: 80, w: page.width / 2, h: page.height - 80});
      }
    },
    removePage(page) {
      self.currentPage = undefined;
      self.pages.remove(page);
    },
    copyPage(page) {
      // TODO
    },
    setCurrentPage(page) {
      self.currentPage = page;
    },
    initProject() {
      self.pages = [];
      self.currentPage = undefined;
    },
    afterCreate() {
      // stencils.forEach(s => self.stencils.set(s.type, s));
    }
  }));