package com.isafeway.products.controller;

import com.isafeway.products.ResultMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by topcat on 16/8/8.
 */
@RestController
public class ShopCartController {
    @RequestMapping(value = "/cart", method = RequestMethod.POST)
    public ResultMap index(String itemId) {
        System.out.println(itemId);
        return ResultMap.OK;
    }

    @RequestMapping(value = "/cart", method = RequestMethod.DELETE)
    public ResultMap delete(String itemId) {
        System.out.println("del   "+itemId);
        return ResultMap.OK;
    }
}
