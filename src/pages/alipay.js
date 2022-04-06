import React from 'react';
import '../styles/pay.css';
import http from '../http';
import api from '../api';
import { message, Input, Modal } from 'antd';
import {withRouter} from 'react-router-dom';

class Pay extends React.Component {

    state={
        img:'',
    }

    componentDidMount(){
        this.getData();
    }

    componentWillReceiveProps(){
        this.getData();
    }

    getData(){
        http.get(api.orderCode,{orderNo:window.location.hash.split('=')[1]}).then((res)=>{
            if(res.status === 10000){
            this.setState({
                img:res.data
            })
            }else{
                message.error(res.msg);
            }
        })
    }

    payFinish(){
        http.get(api.orderPay,{orderNo:window.location.hash.split('=')[1]}).then((res)=>{
            if(res.status === 10000){
                message("支付成功")
            }else{
                message.error(res.msg);
            }
        })
    }

    render () {
        const{ img } = this.state;
        //console.log(img);
        return (
            <div class="body">
            <h1 class="mod-title">
                <span class="ico_log icon-ali-pay"></span>
            </h1>

            <div class="mod-ct">
                <div class="order">
                </div>
                {/* <div class="amount" id="money">￥
        <span></span>
                </div> */}
                <div class="qrcode-img-wrapper" data-role="qrPayImgWrapper">
                    <div data-role="qrPayImg" class="qrcode-img-area">
                        <div class="ui-loading qrcode-loading" data-role="qrPayImgLoading"></div>
                        <div style={{position: 'relative',display: 'inline-block'}}>
                            <img width="300" height="300" src={img}
                                title="请尽快支付~"
                                style={{display: 'block'}} />
                        </div>
                    </div>
                </div>

                <div class="time-item" style={{paddingTop: '10px'}}>
                    <div class="time-item" id="msg">
                        <h1>支付完成后，将跳转至订单详情</h1>
                    </div>
                    <div class="time-item">
                        <h1>订单:
                <span></span>
                        </h1>
                    </div>
                    <input type="hidden" id="orderNoValue" value="${orderNo}"/>
    </div>

                <div class="tip">
                    <div class="ico-scan-ali"></div>
                    <div class="tip-text">
                        <p id="showtext">打开支付宝 [扫一扫]</p>
                    </div>
                    <div class="tip-text">
                        <a onClick={(orderNo)=>{
                            this.payFinish(orderNo);
                            this.props.history.push('/order_detail?orderNo='+ window.location.hash.split('=')[1]);
                        }}
                            class="btn btn-small btn-success" title="支付成功">支付成功</a>
                    </div>
                </div>

                <div class="tip-text">
                </div>

            </div>
            <div class="foot">
            </div>
        </div>
);
    }
}

export default withRouter(Pay);