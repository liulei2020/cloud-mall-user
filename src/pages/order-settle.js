import React from 'react';
import '../styles/bootstrap-modal.css';
import '../styles/order-settle.css';
import HeaderFragment from './components/header-fragment';
import NavFragment from './components/nav-fragment';
import Footer from './footer';
import Sidebar from './personal-sidebar';
import http from '../http2';
import api from '../api';
import { message, Input, Modal } from 'antd';
import {withRouter} from 'react-router-dom';

class Settle extends React.Component {
    state={list:[],address:'',visible:false}

    componentDidMount(){
        this.getData();
    }

    componentWillReceiveProps(){
        this.getData();
    }

    getData(){
        http.get(api.cartList).then((res)=>{
            if(res.status === 10000){
                let arr = [];
                res.data.map((item)=>{
                    if(item.selected === 1){
                        arr.push(item);
                    }
                })
            this.setState({
                list: arr
            })
            }else{
                message.error(res.msg);
            }
        })
    }

    render () {
        const {list, visible, address, name, phone} = this.state;
        let money = 0;
        list.map((item)=>{
            money = item.totalPrice + money
        });
        return (
            <div>
                {/* <header replace="mall/header::header-fragment"></header> */}
                <HeaderFragment></HeaderFragment>
                 {/* <!-- nav --> */}
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
                        <h1 class="title">填写并核对订单信息</h1>
                        <div class="more clearfix">
                            <div class="actions">
                                <a onClick={()=>{
                                    if(!name){
                                    message.error('请填写收件人');
                                    return;
                                    }
                                    if(!phone){
                                        message.error('请填写收件人电话');
                                        return;
                                        }
                                        if(!address){
                                            message.error('请填写收件人地址');
                                            return;
                                            }
                                    http.post(api.orderCreate,{receiverName:name,receiverMobile:phone,receiverAddress:address}).then((res)=>{
                                        if(res.status === 10000){
                                            this.props.history.push('/order_detail?orderNo=' + res.data)
                                        }else{
                                            message.error(res.msg);
                                        }
                                    })
                                }} id="saveOrder" class="btn btn-small btn-primary" title="提交订单">提交订单</a>
                            </div>
                        </div>
                    </div>
                    <div class="box-bd">
                        <div class="uc-order-item uc-order-item-pay">
                            <div class="order-detail">

                                <div class="order-summary">
                                    <div class="order-progress">
                                        <ol class="progress-list clearfix progress-list-5">
                                            <li class="step step-done">
                                                <div class="progress"><span class="text">购物车</span></div>
                                                <div class="info"></div>
                                            </li>
                                            <li class="step step-active">
                                                <div class="progress"><span class="text">下单</span></div>
                                                <div class="info"></div>
                                            </li>
                                            <li class="step">
                                                <div class="progress"><span class="text">付款</span></div>
                                                <div class="info"></div>
                                            </li>
                                            <li class="step">
                                                <div class="progress"><span class="text">出库</span></div>
                                                <div class="info"></div>
                                            </li>
                                            <li class="step">
                                                <div class="progress"><span class="text">交易成功</span></div>
                                                <div class="info"></div>
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                                <table class="order-items-table">
                                    <tbody>

                                    <block each="item : ${myShoppingCartItems}">
                                        {list.map((item)=>{
                                            return(
                                                <tr>
                                                <td class="col col-thumb">
                                                    <div class="figure figure-thumb">
                                                        <a target="_blank" href="@{'/goods/detail/'+${item.goodsId}}">
                                                            <img src={item.productImage}
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
                                                                                text="${item.sellingPrice+'元 x '+item.goodsCount}">
                                                    {item.price/100}元 × {item.quantity}</p></td>
                                                <td class="col col-actions">
                                                </td>
                                            </tr>
                                            )
                                        })}
                                    </block>
                                    </tbody>
                                </table>
                            </div>
                            <div id="editAddr" class="order-detail-info">
                                <h3>收货信息</h3>
                                <table class="info-table">
                                    <tbody>
                                    <tr>
                                        <th>收件人：</th>
                                        <td class="user_address_label"
                                            text="${session.MallUser.address==''?'无':session.MallUser.address}">
                                            {name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>收货人电话：</th>
                                        <td class="user_address_label"
                                            text="${session.MallUser.address==''?'无':session.MallUser.address}">
                                            {phone}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>收货地址：</th>
                                        <td class="user_address_label"
                                            text="${session.MallUser.address==''?'无':session.MallUser.address}">
                                            {address}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div class="actions">
                                    <a class="btn btn-small btn-line-gray J_editAddr"
                                       onClick={()=>{
                                           this.setState({visible:true})
                                       }}>编辑</a>
                                </div>
                            </div>
                            <div id="editTime" class="order-detail-info">
                                <h3>支付方式</h3>
                                <table class="info-table">
                                    <tbody>
                                    <tr>
                                        <th>支付方式：</th>
                                        <td>在线支付</td>
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
                                        <th>商品总价：</th>
                                        <td><span class="num" text="${priceTotal+'.00'}">{(money/100).toFixed(2)}</span>元</td>
                                    </tr>
                                    <tr>
                                        <th>运费：</th>
                                        <td><span class="num">0</span>元</td>
                                    </tr>
                                    <tr>
                                        <th class="total">应付金额：</th>
                                        <td class="total"><span class="num" text="${priceTotal+'.00'}">{(money/100).toFixed(2)}</span>元
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
        <div class="modal fade" id="personalInfoModal" tabindex="-1" role="dialog"
             aria-labelledby="personalInfoModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h6 class="modal-title" id="personalInfoModalLabel">地址修改</h6>
                    </div>
                    <div class="modal-body">
                        <form id="personalInfoForm">
                            <div class="form-group">
                                <input type="hidden" id="userId" value="${session.MallUser.userId}"/>
                                <label for="address" class="control-label">收货地址:</label>
                                <input type="text" class="form-control" id="address" name="address"
                                       placeholder="请输入收货地址" value="${session.MallUser.address}"
                                       required="true"/>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" id="saveButton">确认</button>
                    </div>
                </div>
            </div>
        </div>
        <Modal
                    title="修改信息"
                    visible={visible}
                    onOk={()=>{this.setState({visible:false})}}
                    okText={'确定'}
                    cancelText={'取消'}
                    onCancel={()=>{this.setState({visible:false})}}
                    className={'detail-modal'}
                    >
                        <div className="items" style={{display:'flex',width:'100%'}}>
                            <span style={{width:'100px',fontSize:'16px'}}>收件人：</span>
                            <Input placeholder={'请输入地址信息'} value={name} onChange={(e)=>{
                            this.setState({name:e.target.value})
                        }}></Input>
                        </div>
                        <div className="items"  style={{display:'flex',width:'100%',marginTop:'20px'}}>
                            <span style={{width:'100px',fontSize:'16px'}}>电话：</span>
                            <Input placeholder={'请输入地址信息'} value={phone} onChange={(e)=>{
                            this.setState({phone:e.target.value})
                        }}></Input>
                        </div>
                        <div className="items"  style={{display:'flex',width:'100%',marginTop:'20px'}}>
                            <span style={{width:'100px',fontSize:'16px'}}>地址：</span>
                            <Input placeholder={'请输入地址信息'} value={address} onChange={(e)=>{
                            this.setState({address:e.target.value})
                        }}></Input>
                        </div>
                </Modal>
        <div class="clear"></div>
    </div>
</div>


<Footer></Footer>
{/* <div replace="mall/footer::footer-fragment"></div> */}
            </div>
        );
    }
}

export default withRouter(Settle)