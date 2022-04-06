import React from 'react';
import '../../styles/iconfont.css';
import '../../styles/header.css';
import '../../styles/common.css';
import '../../styles/header.css';
import '../../styles/sweetalert.css';
import '../index.scss';
import './header.scss';
import { withRouter } from 'react-router-dom';
import { message } from 'antd';
import http from '../../http';
import api from '../../api';


class Header extends React.Component {

    state = {
        login: false,
        name: '',
        num: 0
    }

    componentDidMount() {
        if (!localStorage.getItem('username')) {
            // message.error('请先登录')
            // this.props.history.push('/login');
        } else {
            this.setState({ login: true, name: localStorage.getItem('username') });
        }
    }

    componentWillReceiveProps(props) {
        if (!localStorage.getItem('username')) {
            // message.error('请先登录')
            // this.props.history.push('/login');
        } else {
            this.setState({ login: true, name: localStorage.getItem('username') });
        }
    }

    render() {
        const { login, name, num } = this.state;
        return (
            <div>
                <header id="header" fragment="header-fragment">
                    <div className="center">
                        <ul className="fl">
                            <li><a onClick={() => {
                                this.props.history.push('/index');
                            }}>云社区商城</a></li>
                            <li><h3 style={{color:"gray"}}>基于SpringBoot + React开发的前后端分离项目，所有商品和支付下单行为都是模拟的，非现实中的交易，本网站为非经营性质</h3></li>

                        </ul>
                        <div className="fr">
                            {login ?
                                <div style={{ display: 'flex', alignItems: 'center' }} unless="${session.MallUser==null}">
                                    <div className="user">
                                        <ul className="selector">
                                            <li>
                                                <a onClick={() => { this.props.history.push('/personal') }}>
                                                    个人中心
                                                </a>
                                            </li>
                                            <li>
                                                <a onClick={() => { this.props.history.push('/orders') }}>
                                                    我的订单
                                                </a>
                                            </li>
                                            <li>
                                                <a onClick={() => {
                                                    http.post(api.logout).then((res) => {
                                                        if (res.status === 10000) {
                                                            localStorage.removeItem('username');
                                                            localStorage.removeItem('personalizedSignature');
                                                            localStorage.removeItem('role');
                                                            this.props.history.push('/login');
                                                        }
                                                    })
                                                }}>
                                                    退出登录
                                                </a>
                                            </li>
                                        </ul>
                                        <a href="##" className="username">
                                            <div text="${session.MallUser.nickName}">{name}</div>
                                        
                                        </a>
                                    </div>
                                    <div className="shopcart" style={{ height: '40px' }}>
                                        <a onClick={() => { this.props.history.push('/cart') }} style={{ color: 'white' }}>
                                            {'购物车'}</a>
                                    </div>
                                </div> :
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <ul className="login">
                                        <li><a onClick={() => {
                                            this.props.history.push('/login');
                                        }}>登录</a></li>
                                        <li><a onClick={() => {
                                            this.props.history.push('/register');
                                        }}>注册</a></li>
                                    </ul>
                                    <div className="shopcart" style={{ height: '40px' }}>
                                        <a onClick={() => { this.props.history.push('/login'); }} style={{ color: 'white' }}>
                                            购物车</a>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

export default withRouter(Header)