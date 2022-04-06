import React from 'react';
import '../styles/login.css';
import '../styles/header.css';
import '../styles/detail.css';

import alipayImg from '../assets/image/alipay.png'
import wxpayImg from '../assets/image/wxpay.png'
import bkpayImg from '../assets/image/bkpay.png'
import transImg from '../assets/image/trans.png'


import HeaderFragment from './components/header-fragment';
import NavFragment from './components/nav-fragment';
import Footer from './footer';
import {Modal,message, Input, Icon} from 'antd';
import './detail.scss';
import http from '../http';
import api from '../api';
import {withRouter} from 'react-router-dom';
// import { T } from 'antd/lib/upload/utils';

class Detail extends React.Component {
    state={
        visible: false,
        name: ' ',
        subName: ' ',
        money:' ',
        img: ''
    }

    componentDidMount(){
        this.getData();
    }

    componentWillReceiveProps(){
        this.getData();
    }
 
    getData(){
        let hash = window.location.hash.split('=')[1]
        http.get(api.productDetail,{
            id:hash
        }).then((res)=>{
            if(res.status === 10000){
            this.setState({
                name:res.data.name,
                img: res.data.image,
                subName: res.data.detail,
                money: res.data.price,
                stock: res.data.stock,
            })
            }else{
                message.error(res.msg);
            }
        })
    }

    handleCancel=()=>{
        this.setState({visible:false});
    }

    handleOk =()=>{
        this.props.history.push('./cart');
        this.setState({visible:false
        });
    }

    render () {
        const {visible,name,subName,money,img} = this.state;
        return (
            <div style={{backgroundColor:'#ffffff'}}>
                <HeaderFragment></HeaderFragment>
                <div id="detail">
                    <NavFragment />
                    <div class="dc">
                        <div class="content w">
                            <div class="title fl">商品详情</div>
                        </div>
                    </div>
                    <div class="intro mt20 w clearfix">
                        <div class="left fl" style={{position: 'relative'}}>
                            <div class="swiper-container fl">
                                <img style={{maxWidth:'400px',maxHeight:'600px'}} src={img} />
                            </div>
                        </div>
                        <div class="right fr" style={{minHeight:'550px'}}>
                            <div class="h3 ml20 mt20" text="${goodsDetail.goodsName}">{name}</div>
                            <div style={{textAlign:'left'}} class="sub_title mr40 ml20 mt10" text="${goodsDetail.goodsIntro}"> 
                            <span dangerouslySetInnerHTML={{ __html: subName }}></span>
                            {/* {subName} */}
                            </div>
                            <div class="item_price mr40 ml20 mt10">
                                <block text="${goodsDetail.originalPrice}+'.00 元'">价格：{money/100}元</block>
                            </div>

                            <div class="order">
                                <input style={{visibility:'hidden'}} class="car" type="button" onClick={()=>{
                                    // this.setState({visible:true},()=>{
                                        http.post(api.cartAdd,{productId: window.location.hash.split('=')[1],count: 1}).then((res)=>{
                                            if(res.status === 10000){
                                              this.setState({visible:true});
                                            }else{
                                                message.error(res.msg);
                                            }
                                        })
                                    // })
                                }} value="立即选购" />
                                <input class="car" type="button" onClick={()=>{
                                        http.post(api.cartAdd,{productId: window.location.hash.split('=')[1],count: 1}).then((res)=>{
                                            if(res.status === 10000){
                                            this.setState({visible:true});
                                            }else{
                                                message.error(res.msg);
                                            }
                                        })
                                }} value="加入购物车" />
                            </div>
                            <div class="tb-extra ml20" id="J_tbExtra">
                                <dl>
                                    <dt>承诺</dt>
                                    <dd><a class="J_Cont" title="满足天气良好且没有交通管制前提下，商品将于36小时之内送达你所在的楼栋。" href="#"
                                        target="_blank"><img src={transImg} />同城速达</a></dd>
                                </dl>
                                <dl>
                                    <dt>支付方式</dt>
                                    <dd><a href="##" target="_blank"><img src={alipayImg} />支付宝</a><a href="##"
                                        target="_blank"><img
                                            src={wxpayImg} />微信支付</a><a href="##" target="_blank"><img
                                                src={bkpayImg} />银联支付</a></dd>
                                </dl>
                                <dl>
                                    <dt>支持</dt>
                                    <dd>商品质量问题换货。</dd>
                                </dl>

                            </div>
                        </div>
                        <div class="clear"></div>
                    </div>
                    <div class="goods mt20 w clearfix" utext="${goodsDetail.goodsDetailContent}">
                    </div>
                </div>
                <Footer></Footer>
                <Modal
                    title=""
                    visible={visible}
                    onOk={this.handleOk}
                    okText={'去购物车结算'}
                    cancelText={'留在当前页'}
                    onCancel={this.handleCancel}
                    className={'detail-modal'}
                    >
                        <Icon type="check-circle" />
                        <span>已将商品加入购物车</span>
                </Modal>
                {/* <div replace="mall/footer::footer-fragment"></div> */}
            </div>)
    }
}

export default withRouter(Detail);