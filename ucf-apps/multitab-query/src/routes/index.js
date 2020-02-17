/**
 * 前端路由说明：
 * 1、基于浏览器 History 的前端 Hash 路由
 * 2、按业务模块和具体页面功能划分了一级路由和二级路由
 */
import React from "react";
import {Route} from "mirrorx";

import MultiLeftContainer from './multitab-query-left/container'
//import MultiTopContainer from './multitab-query-top/container'

export default () => (
    <div className="route-content">
        <Route exact path="/multitab-query-left" component={MultiLeftContainer}/>
        {/*<Route exact path="/mutlitab-query-top" component={MultiTopContainer}/>*/}
    </div>

)

