import React from 'react';
import '../styles/search.css';

import HeaderFragment from './components/header-fragment';
import NavFragment from './components/nav-fragment';
import Footer from './footer';
// import Sidebar from './personal-sidebar';
import http from '../http';
import api from '../api';
import {withRouter} from 'react-router-dom';
import { message,Pagination } from 'antd';


function getUrlkey(url) {
    var params = {};
    var urls = url.split("?");
    if(urls[1]){
        var arr = urls[1].split("&");   
        for (var i = 0, l = arr.length; i < l; i++) {
            var a = arr[i].split("=");               
            params[a[0]] = a[1];                     
          }               
    }                                                    
    return params;
}

class Search extends React.Component {

    state={
        desc: false,
        current: 1,
        total: 0,
        goods:[]
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
        const hash = window.location.hash.split('=')[1] ? window.location.hash.split('=')[1] : '';
        const hash2 = window.location.hash.split('==')[1] ? window.location.hash.split('==')[1] : '';
        http.get(api.productList,{
            keyword:hash2 ? '' : decodeURI(hash),
            orderBy: this.state.desc ? 'price desc' : 'price asc',
            categoryId: decodeURI(hash2),
            pageSize: 10,
            pageNum: this.state.current,
        }).then((res)=>{
            if(res.status === 10000){
            this.setState({goods:res.data.list,total:res.data.total})
            }else{
                message.error(res.msg);
            }
        })
    }

    getData2(){
        const hash = window.location.hash.split('=')[1] ? window.location.hash.split('=')[1] : '';
        const hash2 = window.location.hash.split('==')[1] ? window.location.hash.split('==')[1] : '';
        http.get(api.productList,{
            keyword:hash2 ? '' : decodeURI(hash),
            // orderBy: this.state.desc ? 'price desc' : 'price asc',
            categoryId: decodeURI(hash2),
            pageSize: 10,
            pageNum: this.state.current,
        }).then((res)=>{
            if(res.status === 10000){
            this.setState({goods:res.data.list,total:res.data.total})
            }else{
                message.error(res.msg);
            }
        })
    }

    

    render () {

        //console.log(window.location);
        //console.log(getUrlkey(window.location.href));
        let urlObj = getUrlkey(window.location.href);
        const {goods} = this.state;
        const hash = window.location.hash.split('=')[1];
        const hash2 = window.location.hash.split('==')[1] ? window.location.hash.split('==')[1] : '';
        return (
            <div style={{backgroundColor:'#ffffff'}}>
                {/* <header replace="mall/header::header-fragment"></header> */}
                <HeaderFragment></HeaderFragment>
                <NavFragment></NavFragment>
                {/* <nav replace="mall/header::nav-fragment"></nav> */}

{/* <!--分类筛选--> */}
<div class="classify">
    <div class="category">
        <div class="category_bar">
            {/* <block if="${searchPageCategoryVO!=null}">
                <div class="fm c">
                    <a href="##" class="qqq" text="${searchPageCategoryVO.secondLevelCategoryName}">-mall</a>
                    <div>
                        <block each="thirdLevelCategory : ${searchPageCategoryVO.thirdLevelCategoryList}">
                            <a href="@{${'/search?goodsCategoryId='+thirdLevelCategory.categoryId}}"
                               text="${thirdLevelCategory.categoryName}">-mall</a>
                        </block>
                    </div>
                </div>
                <i><img src={img_right} alt=""/></i>
                <div class="findword">"
                    <block text="${searchPageCategoryVO.currentCategoryName}"></block>
                    "
                </div>
            </block> */}
            <block if="${searchPageCategoryVO==null}">
                <div style={{textAlign:'left'}} if="${keyword!=null and keyword !=''}">
                    <div className="findword">
                    {/* {hash ? ('搜索'+ urlObj.keyword ?  '' :  + '') : ''} */}
                    {urlObj.keyword ? ('搜索‘' + decodeURI(urlObj.keyword) + '’') : ''}
                    </div>
                </div>
            </block>
        </div>
    </div>
</div>

{/* <!--排序--> */}
<div class="sort">
    <div class="list">
        <a>
            <div class="${orderBy=='new'?'active':''}" onClick={()=>{
                this.getData2();
            }}>综合排序</div>
        </a>
        <a>
            <div class="${orderBy=='price'?'active':''}" onClick={()=>{
                this.setState({desc:!this.state.desc},()=>{
                    this.getData();
                })
            }}>价格</div>
        </a>
    </div>
</div>

<div class="goods_item center">
    <div class="main center" style={{minHeight:'100px',display:'flex',alignItems:'center',justifyContent:'center'}}>
        {goods.length ?
                <block unless="${#lists.isEmpty(pageResult.list)}">
                    {goods.map((item)=>{
                        return(
                            <block each="goods : ${pageResult.list}">
                            <div class="item_card_frame" onClick={()=>{
                                this.props.history.push('/detail?goodId='+item.id);
                            }}>
                                <div class="item_card"><a  target="_blank"><img
                                        src={item.image} alt="${goods.goodsName}"/></a></div>
                                <div class="item_brand"><a  target="_blank"
                                                           text="${goods.goodsName}">{item.name}</a></div>
                                <div class="item_sub_intro" text="${goods.goodsIntro}">{item.info}</div>
                                <div class="item_price" text="${goods.sellingPrice+'.00元'}">{item.price/100}元</div>
                            </div>
                        </block>
                        )
                    })}
            </block>
            :
            <div style={{fontSize:'28px'}} if="${#lists.isEmpty(pageResult.list)}">
            未查询到商品
        </div>
        }
        <div class="clear"></div>
    </div>
    <Pagination hideOnSinglePage={true} current={this.state.current}  total={this.state.total} onChange={(cur)=>{
            this.setState({current:cur},()=>{this.getData()});
        }} />
    {/* <div class="pages">
        <div class="page_wrap">
            <block if="${null != pageResult and !#lists.isEmpty(pageResult.list)}">
            <span class="page_span1">
                 <a href="@{${pageResult.currPage==1}?'##':'/search?keyword='+${keyword==null?'':keyword}+'&page=' + ${pageResult.currPage-1}+'&goodsCategoryId='+${goodsCategoryId==null?'':goodsCategoryId}+'&orderBy='+${orderBy==null?'':orderBy}}">
                                     上一页
                                </a>
                <block if="${pageResult.currPage-2 >=1}"><a
                        href="@{'/search?keyword='+${keyword==null?'':keyword}+'&page=' + ${pageResult.currPage-2}+'&goodsCategoryId='+${goodsCategoryId==null?'':goodsCategoryId}+'&orderBy='+${orderBy==null?'':orderBy}}"
                        text="${pageResult.currPage -2}">1</a></block>
                <block if="${pageResult.currPage-1 >=1}"><a
                        href="@{'/search?keyword='+${keyword==null?'':keyword}+'&page=' + ${pageResult.currPage-1}+'&goodsCategoryId='+${goodsCategoryId==null?'':goodsCategoryId}+'&orderBy='+${orderBy==null?'':orderBy}}"
                        text="${pageResult.currPage -1}">1</a></block>
                <a href="##" class="active" text="${pageResult.currPage}">1</a>
                <block if="${pageResult.currPage+1<=pageResult.totalPage}"><a
                        href="@{'/search?keyword='+${keyword==null?'':keyword}+'&page=' + ${pageResult.currPage+1}+'&goodsCategoryId='+${goodsCategoryId==null?'':goodsCategoryId}+'&orderBy='+${orderBy==null?'':orderBy}}"
                        text="${pageResult.currPage +1}">1</a></block>
                <block if="${pageResult.currPage+2<=pageResult.totalPage}"><a
                        href="@{'/search?keyword='+${keyword==null?'':keyword}+'&page=' + ${pageResult.currPage+2}+'&goodsCategoryId='+${goodsCategoryId==null?'':goodsCategoryId}+'&orderBy='+${orderBy==null?'':orderBy}}"
                        text="${pageResult.currPage +2}">1</a></block>
                 <a href="@{${pageResult.currPage>=pageResult.totalPage}?'##':'/search?keyword='+${keyword==null?'':keyword}+'&page=' + ${pageResult.currPage+1}+'&goodsCategoryId='+${goodsCategoryId==null?'':goodsCategoryId}+'&orderBy='+${orderBy==null?'':orderBy}}">
                                    下一页 >
                                </a>
					</span>
            </block>
        </div>
    </div> */}
</div>

{/* <div replace="mall/footer::footer-fragment"></div> */}
<Footer></Footer>
            </div>
);
    }
}

export default withRouter(Search);