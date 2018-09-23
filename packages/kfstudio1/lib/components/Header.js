import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

const Container = styled.div`
 height: 28px;
 border-bottom: 1px solid #ccc;
 line-height: 28px;
 width: 100%;
 flex: 0 1 auto;
 background: #f4f4f4;
 padding-right: 10px;
`;

const Item = styled.div`
  margin: 0 10px;
  display: inline-block;
  cursor: pointer
`;

@inject('store')
@observer
class Header extends React.Component {
  render() {
    const {store} = this.props;

    const menu = (
      <Menu>
        <Menu.Item>
          <span onClick={store.initProject}><Icon type="file"/> 新建</span>
        </Menu.Item>
      </Menu>
    );

    return (
      <Container>
        <Dropdown overlay={menu} trigger={['click']}>
          <Item className="" href="#">
            文件
          </Item>
        </Dropdown>
        <div style={{float: 'right'}}>
          <Icon type="upload" />
        </div>
      </Container>
    )
  }
}

export default Header;