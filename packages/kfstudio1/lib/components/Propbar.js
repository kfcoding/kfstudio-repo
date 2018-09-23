import React from 'react';
import styled from 'styled-components';
import { Collapse, Icon, Input, InputNumber, Form, Select } from 'antd';
import { inject, observer } from 'mobx-react';

const Option = Select.Option;

const Container = styled.div`
  height: 100%;
  background: #fff;
  overflow: auto;
`;

@inject('store')
@observer
class Propbar extends React.Component {
  render() {
    const {store} = this.props;
    const activeInstance = store.activeInstance;

    return (
      <Container>
        <div style={{height: 30, lineHeight: '30px', borderBottom: '1px solid #ccc', paddingLeft: 5}}>
          属性设置
        </div>
        {store.activeInstance &&
        <div style={{padding: '0 5px'}}>
          {activeInstance.type === 'textbox' &&
          <div>
            <Form.Item label='字体大小'>
              <InputNumber min={1} max={200} defaultValue={store.activeInstance.props.get('fontSize')} onChange={v => store.activeInstance.setProp('fontSize', v * 1)}/>
            </Form.Item>
            <Form.Item label='字体颜色'>
              <input type='color' value={store.activeInstance.props.get('color')} onChange={e => store.activeInstance.setProp('color', e.target.value)}/>
            </Form.Item>
          </div>
          }
          {activeInstance.type === 'coder' &&
          <div>
            <Form.Item label='语言'>
              <Select defaultValue={store.activeInstance.props.get('language')} onChange={v => store.activeInstance.setProp('language', v)}>
                <Option value='python3'>Python</Option>
                <Option value='go'>Golang</Option>
              </Select>
            </Form.Item>
          </div>
          }
        </div>
        }
      </Container>
    )
  }
}

export default Propbar;