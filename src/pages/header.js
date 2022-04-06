import React from 'react';
import '../styles/iconfont.css';
import '../styles/header.css';
import '../styles/common.css';
import '../styles/header.css';
import '../styles/sweetalert.css';
import http from '../http';
import api from '../api';

export default class extends React.Component {

    state={
        login: false,
        num:0
    }

    render () {
        const {login,num} = this.state;
        //console.log('login')
        return (
            <div>
                <nav id="nav" fragment="nav-fragment">
                    <div className="banner_x center">
                        <a href="@{/index}" className="logo"><h1>云社区商城</h1></a>
                        <a href="@{/index}" className="gif"></a>
            
                        <div className="fr">
                            <div className="search">
                                <input className="text" type="text" id="keyword" autocomplete="off" />
                                <div className="search_hot">
                                </div>
                            </div>
                            <div className="button iconfont icon-search" onclick="search()"></div>
                        </div>
                    </div>
                </nav>
                <header id="header" fragment="header-fragment">
                    <div className="center">
                
                        <div className="fr">
                            {login ? 
                                                        <div unless="${session.MallUser==null}">
                                                        <div className="user">
                                                            <ul className="selector">
                                                                <li>
                                                                    <a href="@{/personal}">
                                                                        个人中心
                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="@{/orders}">
                                                                        我的订单
                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a onClick={()=>{
                                                                        http.post(api.logout).then((res)=>{
                                                                            if(res.status === 10000){
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
                                                                <div text="${session.MallUser.nickName}"></div>
                                                           
                                                            </a>
                                                        </div>
                                                        <div className="shopcart">
                                                            <a style={{color: 'white'}}><i className="iconfont icon-cart"></i>
                                                                {'购物车('+ num +')'}</a>
                                                        </div>
                                                    </div> : 
                                    <div if="${session.MallUser==null}">
                                    <ul className="login">
                                        <li><a href="@{/login}">登录</a></li>
                                        <li><a href="@{/register}">注册</a></li>
                                    </ul>
                                    <div className="shopcart">
                                        <a href="##" style={{color: 'white'}}><i className="iconfont icon-cart"></i>
                                            购物车(0)</a>
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