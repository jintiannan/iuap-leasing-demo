/**
 * 前端路由说明：
 * 基于浏览器 History 的前端 Hash 路由  (将对应节点的路由container.js路径注册到此文件中)
 */

import React from "react";
import { Route } from "mirrorx";
import {ConnectedmasterSub} from "./mastersub/container";

export default () => (

    <div className="route-content">
        <Route exact path="/" component={ConnectedmasterSub} />
    </div>

);
