import React from 'react';
import '../styles/header.css';
import { Layout } from 'antd'
import beianImg from '../assets/image/beian.png'

const { Footer} = Layout

export default class extends React.Component {

    render () {
        return (
            <Footer style={{ textAlign: 'center', color: 'grey' }}>云社区商城©2022 liuleinet • Powered by 2022 刘磊<br/>  <a href="https://beian.miit.gov.cn" style={{color: 'grey'}}>赣ICP备2022001959号-1</a>  <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=36050202000303" style={{display:'inline-block',color: 'grey',height:'20px','line-height':'20px'}}><img src={beianImg} style={{float:'left'}} />赣公网安备 36050202000303号</a><br/>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        );
    }
}