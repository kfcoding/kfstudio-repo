import React from 'react';
import { Editor, findDOMNode, getEventRange } from 'slate-react';
import UIComponent from './UIComponent';
import CodeMirror from 'react-codemirror';

import EditCode from 'slate-edit-code';
import EditPrism from 'slate-prism';
import NoEmpty from 'slate-no-empty';
import CodeBlock from './components/CodeBlock';
import Container from './components/Container';
import Blockquote from './components/Blockquote';
import Coder from './components/Coder';
import AutoReplace from 'slate-auto-replace';
import EditList from 'slate-edit-list';
import EditBlockquote from 'slate-edit-blockquote';


const CodePlugin = EditCode({
  onlyIn: node => node.type === 'code_block'
});

const ListPlugin = EditList();
const QuotePlugin = EditBlockquote();

const plugins = [
  EditPrism({
    onlyIn: node => node.type === 'code_block',
    getSyntax: node => node.data.get('syntax')
  }),
  CodePlugin,
  NoEmpty('paragraph'),
  AutoReplace({
    trigger: 'space',
    before: /^(1\.)$/,
    transform: (change, e, matches) => {console.log(matches)
      return ListPlugin.changes.wrapInList(change, 'ol_list').focus();
    }
  }),
  AutoReplace({
    trigger: 'space',
    before: /^(>)$/,
    transform: (change) => {
      return QuotePlugin.changes.wrapInBlockquote(change).focus();
    }
  }),
  ListPlugin,
  QuotePlugin,

]

class KfstudioPage extends React.Component {

  renderNode = props => {
    const {attributes,children} = props;
    const type = props.node.type;
    switch (type) {
      case 'container':
        return <Container {...props}/>;
      case 'paragraph':
        return <p {...props.attributes}>{props.children}</p>
      case 'dummy':
        return <div {...props.attributes} style={{position: 'absolute', top: -999}}>{props.children}</div>;
      case 'code_block':
        return <CodeBlock {...props}/>
      case 'page':
        return <div style={{width: props.node.data.get('w'), height: props.node.data.get('h')}} {...props.attributes}>{props.children}</div>;
      case 'code_line':
        return <div className='codeLine' {...props.attributes} style={{margin: '0'}}>{props.children}</div>;
      case 'coder':
        return <Coder {...props}/>;
      case 'ol_list':
      case 'ol':
        return <ol {...attributes}>{children}</ol>;
      case 'ul_list':
      case 'ul':
        return <ul {...attributes}>{children}</ul>
      case 'list_item':
      case 'li':
        return <li {...attributes}>{children}</li>;
      case 'blockquote':
        return <Blockquote {...props}>{children}</Blockquote>
    }

    return;

    if (type === 'textbox') {
      return <UIComponent {...props} active={true}/>
    } else if (type === 'coder') {
      return <UIComponent {...props}/>
    } else if (type === 'codemirror') {
      let options = {
        lineNumbers: true,
        mode: 'javascript'
      };
      return <CodeMirror value={'123'} style={{height: '100%'}} options={options}/>
    } else if (type === 'test') {
      return <UIComponent {...props}/>
    }
  }

  onClick = () => {
    // let cg = this.props.value.change().deselect();
    // this.props.onChange(cg);
  }


  render() {
    const {value, onChange, schema} = this.props;
    return (
      <Editor onClick={this.onClick} className='editor' plugins={plugins} value={value} onChange={onChange} renderNode={this.renderNode} style={{height: '100%', position: 'relative'}} schema={schema}/>
    )
  }
}

export default KfstudioPage;