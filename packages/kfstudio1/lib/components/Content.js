import React from 'react';
import { Progress, Button, Icon } from 'antd';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import 'react-grid-layout/css/styles.css';
import Page from 'components/Page';
// import KfstudioPage from '@kfstudio/page';


const Container = styled.div`
  background: #eee;
  position: relative;
  z-index: 0;
  overflow: auto;
  height: 100%;
  width: 100%;
  padding: 20px;
  position: relative;
`;


const Footer = styled.div`
  height: 60px;
  background: #dadada;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  line-height: 60px;
`;

@inject('store')
@observer
class Content extends React.Component {
  static defaultProps = {
    className: 'layout',
    cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
    rowHeight: 100
  };

  render() {

    let {store} = this.props;
    let pageIndex = store.pages.findIndex(ele => ele === store.currentPage);
    let percent = Math.floor(100 * (pageIndex + 1) / store.pages.length);
    return (
      store.currentPage ?

        <Container onMouseDown={() => {
          store.setActiveInstance(undefined)
        }}>
          <div style={{width: store.currentPage.width, margin: '0 auto'}}>
          <Page page={store.currentPage} store={store} onClickComponent={(instance) => {this.props.store.setActiveInstance(instance);console.log(instance)}}/>
            <Footer>
              学习进度：<Progress percent={percent} style={{width: 400}}/>
              <Button.Group size='' style={{float: 'right'}}>
                <Button type="primary" disabled={(pageIndex === 0 || store.pages.length === 1)} onClick={() => store.setCurrentPage(store.pages[pageIndex - 1])}>
                  <Icon type="left"/>上一节
                </Button>
                <Button type="primary" disabled={(pageIndex + 1 === store.pages.length || store.pages.length === 1)} onClick={() => store.setCurrentPage(store.pages[pageIndex + 1])}>
                  下一节<Icon type="right"/>
                </Button>
              </Button.Group>
            </Footer>
          </div>
        </Container>
        :
        <div></div>
    )
  }
}

export default Content;