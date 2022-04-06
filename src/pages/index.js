import React from 'react';
// import '../styles/login.css';
// import '../styles/header.css';
import '../styles/index.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.scss';

import banner01 from '../assets/banner10.jpg';
import banner02 from '../assets/banner11.jpg';
import banner03 from '../assets/banner12.jpg';


import HeaderFragment from './components/header-fragment';
import Footer from './footer';
import NavFragment from './components/nav-fragment';
import {Popover} from 'antd';
import {withRouter} from 'react-router-dom';

import http from '../http';
import api from '../api';




class Index extends React.Component {

    state={
        types:[],
        productList:[]
    }

    componentDidMount(){
        this.getData();
        this.getProduct();
    }

    getProduct = () =>{
        http.get(api.productList,{pageSize: 20}).then((res)=>{
            //console.log('productList:',res.data.list);
            this.setState({
                productList: res.data.list
            })
        })
    }

    getData = () =>{
        http.get(api.categoryList).then((res)=>{
            this.setState({
                types: res.data
            })
        })
    }

    render () {
      const settings = {
      // className: "slider variable-width",
      dots: true,
      infinite: true,
      centerMode: true,
      // slidesToShow: 1,
      slidesToScroll: 1,
      centerPadding: '150px',
      variableWidth: true,
      initialSlide: 1,
      autoplay: true,
    };
    const {types,productList} = this.state;
        return (
            <div style={{backgroundColor:'#ffffff'}}>
                {/* <header replace="mall/header::header-fragment"></header> */}
                <HeaderFragment></HeaderFragment>
<content id="content">
    {/* <nav replace="mall/header::nav-fragment"></nav> */}
    <NavFragment />
    <div id="banner" style={{display:'flex'}}>
        <div className="all-sort-list" style={{width:'150px'}}>
            <block each="category : ${categories}">
{types && types.map((item)=>{
    return(
        <Popover placement="right" title={''} content={
            <div>
                                    {item.childCategory.map((_item)=>{
                    return(
                        <div>
                        <a onClick={()=>{
                            this.props.history.push('/search?keyword=&categoryId=='+_item.id)
                        }}>{_item.name}</a>
                        <div>
                        {_item.childCategory.map((item2)=>{
                            return(
                                <a style={{fontSize:'10px'}} onClick={()=>{
                                    this.props.history.push('/search?keyword=&categoryId=='+item2.id)
                                }}>·{item2.name}</a>
                            )
                        })}
                        </div>
                        </div>
                    )
                })}
            </div>} trigger="hover">
        <div className="item" style={{textAlign:'left'}}>
        <h3><span>·</span>

        <a ><block text="${category.categoryName}">{item.name}</block></a>
        </h3>
       
    </div>
</Popover>

    )
})}
            </block>
        </div>
        <div className="swiper-container fl" style={{flex: 1}}>
          
        <Slider {...settings}>
          <div>
            <img src={banner01} />
          </div>
          <div>
            <img src={banner02} />
          </div>
          <div>
            <img src={banner03} />
          </div>
        </Slider>
        </div>
    </div>

    

    <div id="recommend">
        <h2 style={{fontSize:'20px'}}>为你推荐</h2>
        <a  className="more" onClick={()=>{
            this.props.history.push('/search');
        }}>查看更多&gt;&gt;</a>
        <ul>
            {/* <!-- 未配置则显示默认 --> */}
            <block if="${#lists.isEmpty(recommendGoodses)}" style={{display:'flex',flexWrap:'wrap'}}>
                {productList.map((item,index)=>{
                    return(
                        <li onClick={()=>{
                            this.props.history.push('/detail?id='+item.id)
                        }}>
                            <a >
                                <div className="info discount">
                                    {index === 0 || index === 3 || index === 6 ? '新品': '新品'}
                                </div>
                                <img src={item.image} alt=""/>
                                <p className="name">{item.name}</p>
                                <p className="price">{item.price/100}元</p>
                                <p className="counter">猜你喜欢</p>
                                <div className="comment">
                                    <p>云社区精选</p>
                                    <p>好物也可以不贵</p>
                                </div>
                            </a>
                        </li>
                    )
                })}
            </block>
        </ul>
    </div>
</content>
{/* <div replace="mall/footer::footer-fragment"></div> */}
<Footer></Footer>
            </div>
        );
    }
}

export default withRouter(Index)