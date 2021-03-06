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
                            <div class="title fl">????????????</div>
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
                                <block text="${goodsDetail.originalPrice}+'.00 ???'">?????????{money/100}???</block>
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
                                }} value="????????????" />
                                <input class="car" type="button" onClick={()=>{
                                        http.post(api.cartAdd,{productId: window.location.hash.split('=')[1],count: 1}).then((res)=>{
                                            if(res.status === 10000){
                                            this.setState({visible:true});
                                            }else{
                                                message.error(res.msg);
                                            }
                                        })
                                }} value="???????????????" />
                            </div>
                            <div class="tb-extra ml20" id="J_tbExtra">
                                <dl>
                                    <dt>??????</dt>
                                    <dd><a class="J_Cont" title="???????????????????????????????????????????????????????????????36???????????????????????????????????????" href="#"
                                        target="_blank"><img src={transImg} />????????????</a></dd>
                                </dl>
                                <dl>
                                    <dt>????????????</dt>
                                    <dd><a href="##" target="_blank"><img src={alipayImg} />?????????</a><a href="##"
                                        target="_blank"><img
                                            src={wxpayImg} />????????????</a><a href="##" target="_blank"><img
                                                src={bkpayImg} />????????????</a></dd>
                                </dl>
                                <dl>
                                    <dt>??????</dt>
                                    <dd>???????????????????????????</dd>
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
                    okText={'??????????????????'}
                    cancelText={'???????????????'}
                    onCancel={this.handleCancel}
                    className={'detail-modal'}
                    >
                        <Icon type="check-circle" />
                        <span>???????????????????????????</span>
                </Modal>
                {/* <div replace="mall/footer::footer-fragment"></div> */}
            </div>)
    }
}

export default withRouter(Detail);