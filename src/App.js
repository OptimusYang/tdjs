import React from 'react';
import './App.css';
import { Layout, Menu, Button, Statistic, Row, Col, Popconfirm } from 'antd';
import { PageHeader } from 'antd';
import moment from 'moment';
const { Header, Content, Footer } = Layout;

const durationTime = 1000  * 60 * 3;
const currentDate = moment().format("YYYY/MM/DD");
const { Countdown } = Statistic;

class App extends React.PureComponent {

  constructor(prop){
    super(prop);
    this.state={isStart:false,
      deadline:0,
      durationline:0,
      lastClickTime:-1,
      totalCount:0,
      validCount:0,
      btnType:'primary',
      startTime:'',
      endTime:''};
      this.onClickCount = this.onClickCount.bind(this);
      this.onYouxiaoFinish = this.onYouxiaoFinish.bind(this);
      this.onTotalFinsih = this.onTotalFinsih.bind(this);
  }

  onYouxiaoFinish() {
    this.setState({btnType:'primary'});
  }
  
  onTotalFinsih(){
    this.setState({endTime:moment().format('YYYY/MM/DD HH:mm:ss'),durationline:0});
  }

  onClickCount(){
    const lastClickTime = this.state.lastClickTime;
    const currentTime = Date.now();
    const totalCount = this.state.totalCount;
    const validCount = this.state.validCount;
    if(lastClickTime === -1){
      this.setState({totalCount:totalCount+1, validCount:validCount+1,lastClickTime: currentTime, durationline:Date.now() + durationTime,btnType:'default'});
    }else{
      console.log('Date.now()',lastClickTime);
      console.log('duration',currentTime - lastClickTime);
      if(currentTime - lastClickTime > durationTime){
        //超过3分钟
        this.setState({totalCount:totalCount+1, validCount:validCount+1,lastClickTime: currentTime,durationline:Date.now() + durationTime,btnType:'default'});
      }else{
        this.setState({totalCount:totalCount+1,lastClickTime: currentTime,durationline:Date.now() + durationTime,btnType:'default'});
      }
    }
  }

  render(){
    return (
      <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">胎动计时器</Menu.Item>
        </Menu>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
        <PageHeader
    className="site-page-header"
    title= {currentDate}
    subTitle={this.state.isStart?`${this.state.startTime} ${this.state.endTime}`:null}
  >
        <Row gutter={16}>
        {this.state.isStart&&this.state.endTime===''?<Col span={24}>
              <Popconfirm
            title="你确定要停止检测吗?"
            onConfirm={()=>{this.setState({isStart:false,deadline:0,durationline:0,totalCount:0,validCount:0})}}
            okText="是"
            cancelText="否"
          >
            <Button type="primary"  shape="round"  danger block size="large">
              停止计时
            </Button>
          </Popconfirm>
          </Col>:null}
      <Col span={24}  style={{ marginTop: 20 }}>
      {this.state.isStart&&this.state.endTime===''?<Countdown title="倒计时" value={this.state.deadline} format="HH:mm:ss" onFinish={this.onTotalFinsih}/>:null}
      </Col>
      <Col span={24}>
      {this.state.isStart&&this.state.endTime===''?<Countdown title="有效胎动倒计时" value={this.state.durationline} format="HH:mm:ss" onFinish={this.onYouxiaoFinish}/>:null}
      </Col>
      <Col span={24}>
      {this.state.isStart?
      <Statistic title="有效胎动/胎动总数" value={this.state.validCount} suffix={`/ ${this.state.totalCount}`} />
      :null}
      </Col>
      {!this.state.isStart?<Col span={24} style={{ marginTop: 70 }}>
        <Button type="primary"  shape="round"  block size="large" onClick={()=>{this.setState({isStart:true,btnType:'primary',startTime:moment().format('YYYY/MM/DD HH:mm:ss'),durationline:Date.now() + durationTime,deadline: Date.now() + 1000  * 60 * 60})}}>
          开始计时
        </Button>
      </Col>:
        null}
      {this.state.isStart&&this.state.endTime===''?
      <Col span={24} style={{ marginTop: 32 }}>
        <Button  type={this.state.btnType} shape="round" block size="large" onClick={this.onClickCount}>
          动了点一下
        </Button>
      </Col>:null}
      <Col span={24} style={{ marginTop: 50 }}>
      </Col>
    </Row>
    </PageHeader>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>胎动计时器 v1.0 ©2020 Created by Tim.Yang</Footer>
    </Layout>
    );
  }
}


export default App;
