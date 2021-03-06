import React from 'react';
import '../styles/login.css';
import '../styles/header.css';
import '../styles/order-detail.css';

// import HeaderFragment from './components/header-fragment';
import NavFragment from './components/nav-fragment';
import Footer from './footer';
import Sidebar from './personal-sidebar';
import '../styles/order-settle.css';
import './order-detail.scss';
// import { Item } from 'rc-menu';
import { Steps } from 'antd';
import http from '../http';
import api from '../api';
import { message, Input, Modal } from 'antd';
import {withRouter} from 'react-router-dom';
//import { stat } from 'fs';

const { Step } = Steps;

const stepStyle = {
    marginBottom: 60,
    boxShadow: '0px -1px 0 0 #e8e8e8 inset',
  };

class OrderDetail extends React.Component {

    state={
        id:'121323',
        // status: 1,
        current: 0,
        address:'',
        address_money: 10,
        all:20,
        name:'',
        phone: '',
        status: '',
        totalPrice:'',
        goods:[
        ]
    }

    componentDidMount(){
        this.getData();
    }

    componentWillReceiveProps(){
        this.getData();
    }

    getData(){
        http.get(api.orderDetail,{orderNo:window.location.hash.split('=')[1]}).then((res)=>{
            if(res.status === 10000){
            this.setState({
                goods: res.data.orderItemVOList,
                name: res.data.receiverName,
                phone: res.data.receiverMobile,
                address: res.data.receiverAddress,
                totalPrice: res.data.totalPrice,
                status: res.data.orderStatus,
            },()=>{
                //console.log(this.state);
            })
            }else{
                message.error(res.msg);
            }
        })
    }

    onChange = current => {
        //console.log('onChange:', current);
        this.setState({ current });
      };

    render () {
        const {goods,id,status, current, address_money, totalPrice,all, address,name,phone} = this.state;
        //console.log('status:',status);
        return (
            <div>
                {/* <nav replace="mall/header::nav-fragment"></nav> */}
                <NavFragment></NavFragment>

{/* <!-- personal --> */}
<div id="personal">
    <div class="self-info center">

        {/* <!-- sidebar --> */}
        {/* <div replace="mall/personal-sidebar::sidebar-fragment"></div> */}
        <Sidebar></Sidebar>

        <div class="intro fr">
            <div class="uc-box uc-main-box">
                <div class="uc-content-box order-view-box">
                    <div class="box-hd">
                        <h1 class="title" style={{textAlign:'left'}}>????????????
                            <small>???????????????????????????????????????<a>????????????&gt;</a>
                            </small>
                        </h1>
                        <div class="more clearfix">
                            <h2 class="subtitle">????????????
                                <block text="${orderDetailVO.orderNo}"></block>
                                <span class="tag tag-subsidy"></span>
                            </h2>
                            <div class="actions">
                                <input type="hidden" id="orderNoValue" value="${orderDetailVO.orderNo}" />
                                {status === 10 ? 
                                                                <block if="${orderDetailVO.orderStatus>0 and orderDetailVO.orderStatus<3}">
                                                                <a onClick={()=>{
                                                                    http.post(api.orderCancel,{orderNo: window.location.hash.split('=')[1]}).then((res)=>{
                                                                        if(res.status === 10000){
                                                                            message.success('????????????')
                                                                            this.props.history.push('/orders');
                                                                        }else{
                                                                            message.error(res.msg);
                                                                        }
                                                                    })
                                                                }}
                                                                   class="btn btn-small btn-line-gray" title="????????????">????????????</a>
                                                            </block> : null
                                }

                                {status === 10 ?

                                    <block if="${orderDetailVO.orderStatus==0}">
                                    <a onClick={()=>{
                                        this.props.history.push('/alipay?orderNo='+window.location.hash.split('=')[1]);
                                    }}
                                    class="btn btn-small btn-primary" title="?????????">?????????</a>
                                    </block> : null
                                }

                                <block if="${orderDetailVO.orderStatus==3}">
                                    <a onClick={()=>{
                                        http.post(api.orderFinish,{orderNo: window.location.hash.split('=')[1]}).then((res)=>{
                                            if(res.status === 10000){
                                                message.success('????????????')
                                                this.props.history.push('/orders');
                                            }else{
                                                message.error(res.msg);
                                            }
                                        })
                                    }}
                                       class="btn btn-small btn-primary" disabled={status === 0} title="????????????">{status == '0' ? '?????????' : '????????????'} </a>
                                </block>
                            </div>
                        </div>
                    </div>
                    <div class="box-bd">
                        <div class="uc-order-item uc-order-item-pay">
                            <div class="order-detail">
{/* 
                                <div class="order-summary">
                                    <div class="order-status" text="${orderDetailVO.orderStatusString}">
                                        
                                    </div>
                                    <div class="order-desc">
                                        <block if="${orderDetailVO.orderStatus==0}">????????????????????????~</block>
                                        <block if="${orderDetailVO.orderStatus==1}">?????????????????????~</block>
                                        <block if="${orderDetailVO.orderStatus==2}">???????????????????????????~</block>
                                        <block if="${orderDetailVO.orderStatus==3}">?????????????????????????????????????????????~</block>
                                        <block if="${orderDetailVO.orderStatus==4}">??????????????????????????????????????????~
                                        </block>
                                        <block if="${orderDetailVO.orderStatus<0}">???????????????~</block>

                                    </div>
                                    <Steps current={1} >
    <Step title="??????" description="2019-12-21 19:22:07" />
    <Step title="??????" description="2019-12-21 19:22:07" />
    <Step title="??????" description="2019-12-21 19:22:07" />
    <Step title="??????" description="2019-12-21 19:22:07" />
    <Step title="????????????" description="2019-12-21 19:22:07" />
  </Steps>,
                                    </div> */}

                                <div class="order-summary">
                                    <div class="order-progress">
                                        <ol class="progress-list clearfix progress-list-5">
                                            <li class="step step-done">
                                                <div class="progress"><span class="text">?????????</span></div>
                                                <div class="info"></div>
                                            </li>
                                            <li class={`step ${status === 10 ? 'step-active' : ''} ${status > 10 ? 'step-done' : ''}`}>
                                                <div class="progress"><span class="text">??????</span></div>
                                                <div class="info"></div>
                                            </li>
                                            <li class={`step ${status === 20 ? 'step-active' : ''} ${status > 20 ? 'step-done' : ''}`}>
                                                <div class="progress"><span class="text">??????</span></div>
                                                <div class="info"></div>
                                            </li>
                                            <li class={`step ${status === 30 ? 'step-active' : ''} ${status > 30 ? 'step-done' : ''}`}>
                                                <div class="progress"><span class="text">??????</span></div>
                                                <div class="info"></div>
                                            </li>
                                            <li class={`step ${status === 40 ? 'step-active' : ''} ${status > 40 ? 'step-done' : ''}`}>
                                                <div class="progress"><span class="text">????????????</span></div>
                                                <div class="info"></div>
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                                <table class="order-items-table">
                                    <tbody>
                                    <block each="item : ${orderDetailVO.MallOrderItemVOS}">
                                        {goods && goods.map((item)=>{
                                            return(
                                                                                    <tr>
                                                                                    <td class="col col-thumb">
                                                                                        <div class="figure figure-thumb">
                                                                                            <a target="_blank" href="@{'/goods/detail/'+${item.goodsId}}">
                                                                                                <img src={item.productImg}
                                                                                                     width="80" height="80" alt=""/>
                                                                                            </a>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td class="col col-name">
                                                                                        <p class="name">
                                                                                            <a target="_blank" href="@{'/goods/detail/'+${item.goodsId}}"
                                                                                               text="${item.goodsName}">{item.productName}</a>
                                                                                        </p>
                                                                                    </td>
                                                                                    <td class="col col-price"><p class="price"
                                                                                                                 text="${item.sellingPrice+'??? x '+item.goodsCount}">
                                                                                        {item.unitPrice/100} ?? {item.quantity}</p></td>
                                                                                    <td class="col col-actions">
                                                                                    </td>
                                                                                </tr>)
                                        })}
                                    </block>
                                    </tbody>
                                </table>
                            </div>
                            <div id="editAddr" class="order-detail-info">
                                <h3>????????????</h3>
                                <table class="info-table">
                                    <tbody>
                                    <tr>
                                        <td text="${orderDetailVO.userAddress}">{name}</td>
                                    </tr>
                                    <tr>
                                        <td text="${orderDetailVO.userAddress}">{phone}</td>
                                    </tr>
                                    <tr>
                                        <td text="${orderDetailVO.userAddress}">{address}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div class="actions">
                                </div>
                            </div>
                            <div id="editTime" class="order-detail-info">
                                <h3>????????????</h3>
                                <table class="info-table">
                                    <tbody>
                                    <tr>
                                        <th>???????????????</th>
                                        <td text="${orderDetailVO.payTypeString==null?'????????????':orderDetailVO.payTypeString}">
                                            ????????????
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div class="actions">
                                </div>
                            </div>
                            <div class="order-detail-total">
                                <table class="total-table">
                                    <tbody>
                                    <tr>
                                        <th>?????????</th>
                                        <td><span class="num">{0}</span>???</td>
                                    </tr>
                                    <tr>
                                        <th class="total">???????????????</th>
                                        <td class="total"><span class="num"
                                                                text="${orderDetailVO.totalPrice+'.00'}">{totalPrice/100}</span>???
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="clear"></div>
    </div>
</div>
<Footer></Footer>
{/* <div replace="mall/footer::footer-fragment"></div> */}
            </div>
        );
    }
}

export default withRouter(OrderDetail);