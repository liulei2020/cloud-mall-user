import React from 'react';
import '../styles/common.css';
import '../styles/header.css';
import '../styles/login.css';
import '../styles/sweetalert.css';
// import loginLogo from '../assets/image/login-logo-2.png';
import loginLogo from '../assets/logo2.png';
import {message,Input} from 'antd';
import http from '../http';
import api from '../api';
import {withRouter} from 'react-router-dom';

function isPoneAvailable(text) {
    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(text)) {
        return false;
    } else {
        return true;
    }
}

function isPasswd(s)  
  {  
 var patrn=/^(\w){6,20}$/;  
  if (!patrn.exec(s)) return false
  return true
}  

class Register extends React.Component {

    state={
        userName:'',
        password: '',
    }

    register = ()=>{
        const {userName,password} = this.state;

        http.post(api.register,{userName:userName,password:password}).then((res)=>{
            if(res.status === 10000){
                message.success('注册成功');
            this.props.history.push('/login');
            }else{
                message.error(res.msg)
            }
        })
    }

    render () {
        const {userName,password} = this.state;
        return (
                            <div>
                <div class="top center">
    <div class="logo center" style={{display:'flex',alignItems:'center'}}>
        <a href="./index.html" target="_blank"><img style={{height:'80px'}} src={loginLogo} alt=""/></a>
    </div>
</div>

<div class="form center">
    <div class="login">
        <div class="login_center">
            <div class="login_top">
                <div class="left fl">会员注册</div>
                <div class="right fr">您已有账号？<span style={{color:'#1baeae', cursor:'pointer'}} onClick={()=>{
                                    this.props.history.push("login");
                                }} target="_self">请登录</span></div>
                <div class="clear"></div>
                <div class="under-line center"></div>
            </div>
            <form id="registerForm" onsubmit="return false;" action="##">
                <div class="login_main center">
                    <div class="login-info">用户名:&nbsp;<Input onChange={(e)=>{
                                        //console.log(e.target.value);
                                        this.setState({userName:e.target.value})
                                    }} value={userName} className="login-info-input" type="text" name="loginName"
                                        id="loginName"
                                        placeholder="请输入你的用户名" />
                    </div>
                    <div class="login-info">密&nbsp;&nbsp;&nbsp;&nbsp;码:&nbsp;<Input onChange={(e)=>{
                                        this.setState({password:e.target.value})
                                    }} value={password} className="login-info-input"
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="请输入你的密码" />
                    </div>
                    {/* <div class="login-info">
                        验证码:&nbsp;
                        <input class="login-info-input verify-code" type="text" name="verifyCode" id="verifyCode"
                               placeholder="请输入验证码"/>
                        <img alt="单击图片刷新！" style="top: 14px;position: relative;" src="@{/common/mall/kaptcha}"
                             onclick="this.src='/common/mall/kaptcha?d='+new Date()*1"/>
                    </div> */}
                </div>
                <div class="login_submit">
                    <input class="submit" type="button" onClick={this.register} value="立即注册"/>
                </div>
            </form>
        </div>
    </div>
</div>
            </div>
        );
    }
}

export default withRouter(Register)
