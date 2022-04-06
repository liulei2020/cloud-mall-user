import React from 'react';
import '../styles/bootstrap-modal.css';
import '../styles/personal.css';
import {withRouter} from 'react-router-dom';
import http from '../http';
import api from '../api';

class PersonalSidebar extends React.Component {

    render () {
        let hash = window.location.hash.split('/');
        //console.log(hash);
        return (
            <div class="lfnav fl" fragment="sidebar-fragment">
    <div class="nav_title">个人中心</div>
    <div class="title_list">
        <ul>
            <li><a onClick={()=>{this.props.history.push('/personal')}}  class={hash[1] === 'personal' ? 'active' : ''}>个人信息</a></li>
            <li><a onClick={()=>{this.props.history.push('/orders')}}  class={hash[1] === 'orders' ? 'active' : ''}>我的订单</a></li>
            <li><a onClick={()=>{
                                                                        http.post(api.logout).then((res)=>{
                                                                            if(res.status === 10000){
                                                                                localStorage.removeItem('username');
                                                                                localStorage.removeItem('personalizedSignature');
                                                                                localStorage.removeItem('role');
                                                                                this.props.history.push('/login');
                                                                            }
                                                                        })
                                                                        }}>退出登录</a></li>
        </ul>
    </div>
</div>
        );
    }
}
export default withRouter(PersonalSidebar)  