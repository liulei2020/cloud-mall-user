import React from 'react';
import '../styles/login.css';
import '../styles/header.css';
import '../styles/personal.css';
import HeaderFragment from './components/header-fragment';
import NavFragment from './components/nav-fragment';
import Footer from './footer';
import Sidebar from './personal-sidebar';
import './personal.scss';
import {Modal,message, Input} from 'antd';
import http from '../http';
import api from '../api.js';


export default class extends React.Component {

    state={
        userName:'',
        phone: '',
        password: '',
        sign:'',
        address: '',
        visible: false,
        signature: '',
    }

    handleOk = ()=>{
        http.post(api.editPersonal,{signature:this.state.signature}).then((e)=>{ 
            if(e.status === 10000){
                this.setState({sign:this.state.signature},()=>{
                    localStorage.setItem('personalizedSignature',this.state.sign)
                })
                message.success('修改成功');
            }
        }).finally(()=>{
            this.setState({visible:false});
        })
    }

    handleCancel =()=>{
        this.setState({visible:false})
    }

    render () {
        //console.log(localStorage.setItem('signature',this.state.sign));
        const {userName,phone,password,sign,address, visible, signature} = this.state;
        return (
            <div>
            {/* <header replace="mall/header::header-fragment"></header> */}
            <HeaderFragment></HeaderFragment>
{/* // <!-- nav --> */}
{/* <nav replace="mall/header::nav-fragment"></nav> */}
<NavFragment></NavFragment>

{/* // <!-- personal --> */}
<div id="personal">
<div class="self-info center">

{/* <!-- sidebar --> */}
{/* <div replace="mall/personal-sidebar::sidebar-fragment"></div> */}
<Sidebar></Sidebar>

<div class="intro fr">
<div class="grzlbt ml40">我的资料 <a onClick={()=>{this.setState({visible:true})}}
                             style={{color:'#1baeae',marginLeft: '600px'}}>更改个人信息</a>
</div>
<div class="info_item ml40"><span>昵称</span><span
    text="${session.MallUser.nickName}">{localStorage.getItem('username')}</span>
</div>
{/* <div class="info_item ml40"><span>密码</span><span>******</span>
</div> */}
<div class="info_item ml40"><span>个性签名</span><span
    text="${session.MallUser.introduceSign==''?'无':session.MallUser.introduceSign}">{sign || localStorage.getItem('personalizedSignature')}</span>
</div>
<div class="info_item ml40"><span>角色</span><span
    text="${session.MallUser.loginName}">{localStorage.getItem('role') === '1' ? '普通用户' : '管理员'}</span>
</div>
{/* <div class="info_item ml40"><span>收货信息</span><span
    text="${session.MallUser.address==''?'无':session.MallUser.address}">{address}</span>
</div> */}

</div>
<div class="clear"></div>
</div>
<div class="content">
{/* <!-- 模态框（Modal） --> */}
<div class="modal fade" id="personalInfoModal" tabindex="-1" role="dialog"
aria-labelledby="personalInfoModalLabel">
<div class="modal-dialog" role="document">
<div class="modal-content">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                aria-hidden="true">&times;</span></button>
        <h6 class="modal-title" id="personalInfoModalLabel">更改个人签名</h6>
    </div>
    <Modal
          title="更改个人信息"
          visible={visible}
          onOk={this.handleOk}
          okText={'确认'}
          cancelText={'取消'}
          onCancel={this.handleCancel}
        >
          <Input placeholder="请输入个性签名" value={signature} onChange={(e)=>{
              this.setState({signature:e.target.value})
          }}></Input>
    </Modal>
</div>
</div>
</div>
{/* <!-- /.modal --> */}
</div>
</div>
{/* <div replace="mall/footer::footer-fragment"></div> */}
<Footer></Footer>
</div>
        );
    }
}