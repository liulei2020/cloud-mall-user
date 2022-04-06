import React from 'react';
import '../styles/iconfont.css';
import '../styles/common.css';
import '../styles/header.css';
import '../styles/cart.css';
import '../styles/sweetalert.css';
import mumu_logo_3 from '../assets/logogif.gif';
import Footer from './footer';
import http from '../http';
import api from '../api';
import { message, Input, Checkbox } from 'antd';


export default class extends React.Component {

    state={
        list:[],
        selected: [],
        selectAll: false,
    }

    componentDidMount(){
        this.getData();
    }

    componentWillReceiveProps(){
        this.getData();
    }

    getData(){
        http.get(api.cartList).then((res)=>{
            if(res.status === 10000){
                let flag = 1;
                res.data.map((item)=>{
                    if(item.selected === 0){
                        item.checked = false;
                        flag = 0;
                    }else{
                        item.checked = true;
                    }
                    // item.checked = false;
                })
                if(flag === 1){
                    this.setState({selectAll: true});
                }
            this.setState({
                list: res.data
            })
            }else{
                message.error(res.msg);
            }
        })
    }

    render () {
        const {list} = this.state;
        let total = 0,money=0;
        list.map((item)=>{
            if(item.selected === 1) {
                total = total + item.quantity;
            money = money + item.quantity * item.price;
            }
        })
        return (
            <div>
                <div id="cart" style={{backgroundColor:'#ffffff'}}>
                    <div className="banner_x center">
                        <a onClick={()=>{
                            this.props.history.push('/index');
                        }}>
                            <div className="logo fl">
                                <img src={mumu_logo_3} />
                            </div>
                        </a>

                        <div className="wdgwc fl ml20">购物车</div>
                        <div className="wxts fl ml20">温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</div>
                        <div className="clear"></div>
                    </div>
                    <div className="cart_line"></div>
                    <div className="cart_bg">
                        {/* <block if="${#lists.isEmpty(myShoppingCartItems)}"> */}
                            {/* <div className="list center"> */}
                                {/* <!-- todo 无购物项时 换背景图 -->
                无数据 */}
                            {/* </div> */}
                        {/* </block> */}
                        {
                            list.length ?
                            <div unless="${#lists.isEmpty(myShoppingCartItems)}">
                            <div className="list center">
                                <div className="top2 center">
                                    <div className="sub_top fl">
                                    <Checkbox checked={this.state.selectAll} onChange={(e)=>{
                                        this.setState({selectAll: e.target.checked});
                                        let arr = list;
                                        if(e.target.checked){
                                            arr.map((item)=>{
                                                item.checked = true;
                                            })
                                        }else{
                                            arr.map((item)=>{
                                                item.checked = false;
                                            })
                                        }
                                        this.setState({list: arr},()=>{
                                            http.post(api.cartSelectAll,{selected: e.target.checked ? 1 : 0}).then((res)=>{
                                                if(res.status === 10000){
                                                    this.getData();
                                                }else{
                                                    message.error(res.msg);
                                                }
                                            })
                                        });
                                    }}>全选</Checkbox>
                                    </div>
                                    <div className="sub_top fl">商品名称</div>
                                    <div className="sub_top fl">单价</div>
                                    <div className="sub_top fl">数量</div>
                                    <div className="sub_top fl">小计</div>
                                    <div className="sub_top fr">操作</div>
                                    <div className="clear"></div>
                                </div>
                                <div each="item : ${myShoppingCartItems}">
                                    {list.map((item,index)=>{
                                        return(
                                            <div className="content2 center">
                                            <div className="sub_content fl ">
                                    <Checkbox checked={item.checked} onChange={(e)=>{
                                            let arr = this.state.selected;
                                        if(e.target.checked){
                                            arr.push(item.id);
                                            //console.log('1111');
                                        }else{
                                            if(arr.indexOf(item.id)!== -1){
                                                arr.splice(arr.indexOf(item.id),1);
                                        //     this.setState({selected: arr},()=>{
                                        // //console.log(this.state.selected);
                                        //     })
                                            }
                                        }

                                            let arr2 = list;
                                            arr2.map((_item)=>{
                                                if(_item.id === item.id){
                                                    _item.checked = e.target.checked;
                                                }
                                            })
                                            this.setState({list:arr2});
                                        this.setState({selected: arr},()=>{
                                            if(this.state.selected.length === list.length){
                                                this.setState({selectAll: true})
                                            }else{
                                                this.setState({selectAll: false})
                                            }
                                            http.post(api.cartSelect,{selected: e.target.checked ? 1 : 0,productId: item.productId}).then((res)=>{
                                                if(res.status === 10000){
                                                    this.getData();
                                                }else{
                                                    message.error(res.msg);
                                                }
                                            })
                                        })
                                    }}></Checkbox>
                                            </div>
                                            <div className="sub_content cover fl"><img src={item.productImage} /></div>
                                            <div className="sub_content fl ft20" text="${item.goodsName}">{item.productName}</div>
                                            <div className="sub_content fl" text="${item.sellingPrice + '元'}">{item.price/100}元</div>
                                            <div className="sub_content fl">
                                                <span style={{marginRight:'8px',cursor:'pointer'}} onClick={()=>{
                                                    let num=''
                                                    list.map((_item,_index)=>{
                                                        if(_index === index){
                                                            if(_item.quantity >= 1){
                                                                _item.quantity = _item.quantity - 1;
                                                                num=_item.quantity;
                                                            }else{
                                                                message.warn("数量不能小于0")
                                                            }
                                                        }
                                                        return _item;
                                                    })
                                                    this.setState({list},()=>{
                                                        http.post(api.cartUpdate,{productId: item.productId,count: num}).then((res)=>{
                                                            if(res.status === 10000){
                                                                this.getData();
                                                            }else{
                                                                message.error(res.msg);
                                                            }
                                                        })
                                                    });
                                                }}>-</span>
                                                <Input value={item.quantity} className="goods_count" onChange={(e)=>{
                                                    let flag = 0;
                                                    e.target.value.split('').map((item)=>{
                                                        if(item === '-'){
                                                            flag = 1;
                                                        }
                                                    })
                                                    if(!flag){
                                                        list.map((_item,_index)=>{
                                                            if(_index === index){
                                                                if(_item.quantity !== 0){
                                                                    _item.quantity = e.target.value.replace(/[^\-?\d.]/g,'') ;
                                                                }
                                                            }
                                                            return _item;
                                                        })
                                                        this.setState({list});
                                                    }
                                                }} onBlur={(e)=>{
                                                    http.post(api.cartUpdate,{productId: item.productId,count: e.target.value}).then((res)=>{
                                                        if(res.status === 10000){
                                                            this.getData();
                                                        }else{
                                                            message.error(res.msg);
                                                        }
                                                    })
                                                }} />
                                                <span onClick={()=>{
                                                    let num ='';
                                                    list.map((_item,_index)=>{
                                                        if(_index === index){
                                                            if(_item.quantity !== 99){
                                                                _item.quantity = _item.quantity + 1;
                                                                num = _item.quantity;
                                                            }else{
                                                                message.warn("单个用户限购99件")
                                                            }
                                                                
                                                        }
                                                        return _item;
                                                    })
                                                    this.setState({list},()=>{
                                                        http.post(api.cartUpdate,{productId: item.productId,count: num}).then((res)=>{
                                                            if(res.status === 10000){
                                                                this.getData();
                                                            }else{
                                                                message.error(res.msg);
                                                            }
                                                        })
                                                    });
                                                }} style={{marginLeft:'8px',cursor:'pointer'}}>+</span>
                                            </div>
                                            <div className="sub_content fl" text="${item.goodsCount*item.sellingPrice+'元'}">{((item.price/100)*item.quantity).toFixed(2)}元</div>
                                            <div className="sub_content fl" onClick={()=>{
                                                   http.post(api.cartDelete,{productId: item.productId}).then((res)=>{
                                                    if(res.status === 10000){
                                                        this.getData();
                                                    }else{
                                                        message.error(res.msg);
                                                    }
                                                })
                                            }}><a onclick="'deleteItem('+${item.cartItemId}+')'">×</a>
                                            </div>
                                            <div className="clear"></div>
                                        </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div> :
                        <div style={{height:'200px',fontSize:'36px',lineHeight:'200px', color:'#1baeae'}}>购物车是空的</div>
                        }

                        <div className="pre_order mt20 center">
                            <div className="tips fl ml20">
                                <ul style={{margin:'0'}}>
                                    <li><a onClick={()=>{
                                        this.props.history.push("/index");
                                    }}>继续购物</a></li>
                                    <li>|</li>
                                    <li>共<span text="${itemsTotal}">{total}</span>件商品</li>
                                    <div className="clear"></div>
                                </ul>
                            </div>
                            <div className="order_div fr">
                                <div className="order_total fl">合计（不含运费）：<span text="${priceTotal}+'.00元'">{(money/100).toFixed(2)}元</span></div>
                                <div className="order_button fr">
                                    <div>
                                        {/* <input className="order_button_c" type="button" name="tip"
                                            onclick="tip()"
                                            value="去结算" /> */}
                                    </div>
                                    {money > 0 ?
                                     <div unless="${itemsTotal == 0}">
                                     <input className="order_button_d" type="button" name="settle"
                                         onClick={()=>{
                                             this.props.history.push('/order_settle')
                                         }}
                                         value="去结算" />
                                 </div>: null
                                    }
                                   
                                </div>
                                <div className="clear"></div>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}