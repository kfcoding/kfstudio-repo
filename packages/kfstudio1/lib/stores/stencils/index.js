import { types } from 'mobx-state-tree';
import { CardStencil } from 'stores/stencils/Card';
import { CoderStencil } from 'stores/stencils/Coder';
import { TextboxStencil } from 'stores/stencils/Textbox';
export const StencilType = types.union(CardStencil, CoderStencil, TextboxStencil);