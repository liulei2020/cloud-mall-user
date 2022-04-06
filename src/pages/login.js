import React from 'react';
import '../styles/login.css';
import '../styles/header.css';
import loginLogo from '../assets/logo2.png';
import {message,Input} from 'antd';
import http from '../http';
import api from '../api';
import {withRouter} from 'react-router-dom';


class Login extends React.Component {

    state={
        userName:'',
        password: '',
        name: '',
    }

    login = (event)=>{
        event.preventDefault()
        const {userName,password} = this.state;
        //console.log(userName,password)
        if(!userName){
            message.error('请输入用户名');
            return;
        }
        if(!password){
            message.error('请输入密码');
            return;
        }
        http.post(api.login,{userName:userName,password:password}).then((res)=>{
            //console.log(res.data)
            if(res.status === 10000){
                this.setState({name: res.data.username},()=>{
                    this.props.history.push('/index?name='+this.state.name);
                    localStorage.setItem('username',this.state.name);
                    localStorage.setItem('personalizedSignature',res.data.personalizedSignature);
                    localStorage.setItem('role',res.data.role);
                })
            }else{
                message.error(res.msg);
            }
        })
    }

    render () {
        const {userName,password} = this.state;
        return (
            <div>
                <div className="top center">
                    <div className="logo center" style={{display:'flex',alignItems:'center'}}>
                        <a href="./index.html" target="_blank"><img style={{height:'80px'}} src={loginLogo} alt="" /></a>
                    </div>
                </div>
                <div className="form center">
                    <div className="login">
                        <div className="login_center">
                            <div className="login_top">
                                <div className="left fl">会员登录</div>
                                <div className="right fr">您还不是我们的会员？<span style={{color:'#1baeae', cursor:'pointer'}} onClick={()=>{
                                    this.props.history.push("register");
                                }} target="_self">立即注册</span></div>
                                <div className="clear"></div>
                                <div className="under-line center"></div>
                            </div>
                            {/* <form id="loginForm" onsubmit="return false;" action="##"> */}
                                <div className="login_main center">
                                    <div className="login-info">用户名:&nbsp;<Input onChange={(e)=>{
                                        //console.log(e.target.value);
                                        this.setState({userName:e.target.value})
                                    }} value={userName} className="login-info-input" type="text" name="loginName"
                                        id="loginName"
                                        placeholder="请输入你的用户名" />
                                    </div>
                                    <div className="login-info">密&nbsp;&nbsp;&nbsp;&nbsp;码:&nbsp;<Input onChange={(e)=>{
                                        this.setState({password:e.target.value})
                                    }} value={password} className="login-info-input"
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="请输入你的密码" /></div>
                                    {/* <div className="login-info">
                                        验证码:&nbsp;
                        <input className="login-info-input verify-code" type="text" name="verifyCode"
                                            placeholder="请输入验证码" id="verifyCode" />
                                        <img alt="单击图片刷新！" style={{top: '14px',position: 'relative'}} src="@{/common/mall / kaptcha}"
                                             onclick="this.src='/common/mall/kaptcha?d='+new Date()*1" />
                    </div> */}
                                </div>
                                <div className="login_submit">
                                    <Input className="submit" type="submit" onClick={this.login} value="立即登录" />
                                </div>
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login)