package com.isafeway.products.controller;

import com.isafeway.products.ResultMap;
import com.isafeway.products.service.ShopCartService;
import com.isafeway.products.util.ShiroUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by topcat on 16/8/8.
 */
@RestController
public class ShopCartController {

    @Autowired
    ShopCartService shopCartService;

    @RequestMapping(value = "/cart", method = RequestMethod.POST)
    public ResultMap add(String itemId) {
        shopCartService.addItem(ShiroUtils.currentUserId(), itemId);
        return ResultMap.OK;
    }

    @RequestMapping(value = "/cart/load", method = RequestMethod.GET)
    public ResultMap load() {
        return new ResultMap(shopCartService.loadShopCart(ShiroUtils.currentUserId()));
    }

    @RequestMapping(value = "/cart/item/{itemId}", method = RequestMethod.POST)
    public ResultMap itemCountChange(int count, @PathVariable("itemId") String itemId) {
        shopCartService.itemCountChange(ShiroUtils.currentUserId(), itemId, count);
        return ResultMap.OK;
    }

    @RequestMapping(value = "/cart", method = RequestMethod.DELETE)
    public ResultMap delete(String itemId) {
        shopCartService.removeItem(ShiroUtils.currentUserId(), itemId);
        return ResultMap.OK;
    }
}
