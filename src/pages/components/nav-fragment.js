import React from 'react';
import '../../styles/iconfont.css';
import '../../styles/header.css';
import '../../styles/common.css';
import '../../styles/header.css';
import '../../styles/sweetalert.css';
import {withRouter} from 'react-router-dom';
import {Input} from 'antd';


class Nav extends React.Component {
    state={
        name: ''
    }

    render () {
        const {name} =this.state;
        return (
            <div style={{backgroundColor:'#ffffff'}}>
                <nav id="nav" fragment="nav-fragment">
                    <div class="banner_x center">
                        <a class="logo" onClick={()=>{
                                this.props.history.push('/index');
                            }} ><h1>云社区商城</h1></a>
                        <a class="gif"></a>
                       
                        <div class="fr">
                            <div class="search">
                                <Input style={{height:'50px'}} value={name} onChange={(e)=>{
                                    this.setState({name: e.target.value});
                                }} class="text" type="text" id="keyword" autocomplete="off" />
                                <div class="search_hot">
                                </div>
                            </div>
                            <div onClick={()=>{
                                this.props.history.push('/search?keyword=' + name);
                            }} style={{marginLeft:'-3px'}} class="button iconfont icon-search"></div>
                        </div>
                    </div>
                </nav>
                </div>
        );
    }
}
export default withRouter(Nav);