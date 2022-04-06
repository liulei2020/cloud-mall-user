import React from 'react';
import '../styles/login.css';
import '../styles/personal.css';
// import '../styles/my-orders.css';
import '../styles/my-orders.css';
import HeaderFragment from './components/header-fragment';
import NavFragment from './components/nav-fragment';
import Footer from './footer';
import Sidebar from './personal-sidebar';
import {Pagination,message} from 'antd';
import http from '../http';
import api from '../api';
import {withRouter} from 'react-router-dom';
import moment from 'moment-mini';

class MyOrders extends React.Component {
    state={
        orders:[
            {
                time:'2019.12',
                id:'233423',
                img: '',
                name: '鞋子',
                num: 2,
                money: ''
            }
        ],
        current: 1,
        total:0,
    }

    componentDidMount(){
        this.setState({
         current: 1,            
        });
        this.getData();
    }

    componentWillReceiveProps(){
        this.setState({
            current: 1,            
            });
        this.getData();
    }

    getData(){
        http.get(api.orderList,{
            pageSize: 3,
            pageNum: this.state.current,
        }).then((res)=>{
            if(res.status === 10000){
            this.setState({orders:res.data.list,total:res.data.total})
            }else{
                message.error(res.msg);
            }
        })
    }

    render () {
        const {orders} = this.state;
        //console.log('total:',this.state.total);
        //console.log('total:',this.state.current);
        return (
            <div>
            <div>
                {/* <header replace="mall/header::header-fragment"></header> */}
                <HeaderFragment></HeaderFragment>
                {/* <!-- nav --> */}
                {/* <nav replace="mall/header::nav-fragment"></nav> */}
                <NavFragment></NavFragment>

                {/* <!-- personal --> */}
                <div id="personal">
                    <div class="self-info center">
<Sidebar></Sidebar>
                        {/* <!-- sidebar --> */}
                        {/* <div replace="mall/personal-sidebar::sidebar-fragment"></div> */}

                        <div class="intro fr">
                            <div class="uc-box uc-main-box">
                                <div class="uc-content-box order-list-box">
                                    <div class="box-hd">
                                        <h1 class="title" style={{textAlign:'left'}}>我的订单
                            <small>请谨防钓鱼链接或诈骗电话，<a>了解更多&gt;</a>
                                            </small>
                                        </h1>
                                    </div>
                                    <div class="box-bd">
                                        <div id="J_orderList">
                                            <ul class="order-list">
                                                <block unless="${#lists.isEmpty(orderPageResult.list)}">
                                                    {/* <!-- todo 无订单时 换背景图为无订单 --> */}
                                                    <block each="order : ${orderPageResult.list}">
                                                        {
                                                            orders.map((item)=>{
                                                                return(
                                                                    <li class="uc-order-item uc-order-item-list">
                                                                    <div class="order-detail">
                                                                        <div class="order-summary">
                                                                            <block if="${order.orderStatus<0}">
                                                                                <div class="order-status-closed" />
                                                                            </block>
                                                                            <block if="${order.orderStatus==0}">
                                                                                <div class="order-status-need-pay" />
                                                                            </block>
                                                                            <block if="${order.orderStatus>0}">
                                                                                <div class="order-status-success" />
                                                                            </block>
                                                                            <block text="${' '+order.orderStatusString}"></block>
                                                                        </div>
                                                                    </div>
                                                                    <table class="order-detail-table">
                                                                        <thead>
                                                                            <tr>
                                                                                <th class="col-main"><p class="caption-info"
                                                                                    text="${#dates.format(order.createTime, 'yyyy-MM-dd HH:mm:ss')}">
                                                                                    {moment(item.createTime).format("YYYY-MM-DD HH:mm:ss")}<span
                                                                                        class="sep">|</span>订单号：<a
                                                                                            href="##"
                                                                                            text="${order.orderNo}">{item.orderNo}</a><span
                                                                                                class="sep">|</span>在线支付</p></th>
                                                                                <th class="col-sub"><p class="caption-price">应付金额：<span
                                                                                    class="num"
                                                                                    text="${order.totalPrice+'.00'}">{(item.totalPrice/100).toFixed(2)}</span>元
                                                            </p></th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="order-items">
                                                                                    <ul class="goods-list">
                                                                                        <block
                                                                                            each="item : ${order.MallOrderItemVOS}">
                                                                                            {item.orderItemVOList && item.orderItemVOList.map((_item)=>{
                                                                                                return(
                                                                                                    <li style={{height:'auto'}}>
                                                                                                    <div class="figure figure-thumb">
                                                                                                        <a >
                                                                                                            <img src={_item.productImg}
                                                                                                                width="80" height="80" alt="" />
                                                                                                        </a>
                                                                                                    </div>
                                                                                                    <p class="name"><a target="_blank"
                                                                                                        href="@{'/goods/detail/'+${item.goodsId}}"
                                                                                                        text="${item.goodsName}">{_item.productName}</a>
                                                                                                    </p>
                                                                                                    <p class="price"
                                                                                                        text="${item.sellingPrice+'元 x '+item.goodsCount}">
                                                                                                        {(_item.unitPrice/100).toFixed(2)}元 × {_item.quantity}</p>
                                                                                                </li>
                                                                                                )
                                                                                        
                                                                                            })}
                                                                        
                                                                                        </block>
                                                                                    </ul>
                                                                                </td>
                                                                                <td class="order-actions"><a class="btn btn-small btn-line-gray"
                                                                                    onClick={()=>{
                                                                                        this.props.history.push('/order_detail?orderId='+item.orderNo);
                                                                                    }}>订单详情</a>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                            </block>
                                                            </block>
                                                            </ul>
                                                            </div>
                                    </div>
                                    <div id="J_orderListPages">
                                    {this.state.total > 0 && 
                                    <Pagination pageSize={3}  current={this.state.current}  total={this.state.total} onChange={(cur)=>{
                                        this.setState({current:cur},()=>{this.getData()});
                                    }} />
                                    }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>

            {/* <div replace="mall/footer::footer-fragment"></div> */}
            <Footer></Footer>
            </div >
        );
    }
}

export default withRouter(MyOrders);