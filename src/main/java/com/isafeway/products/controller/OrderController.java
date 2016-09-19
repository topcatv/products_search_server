package com.isafeway.products.controller;

import com.isafeway.products.ResultMap;
import com.isafeway.products.domain.ShopCartItem;
import com.isafeway.products.service.OrderService;
import com.isafeway.products.util.ShiroUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by topcat on 16/8/12.
 */
@RestController
public class OrderController {

    @Autowired
    OrderService orderService;

    @RequestMapping(value = "/order", method = RequestMethod.POST)
    public ResultMap add(@RequestBody List<ShopCartItem> shopCartItems) {
        orderService.submit(ShiroUtils.currentUserId(), shopCartItems);
        return ResultMap.OK;
    }
}
