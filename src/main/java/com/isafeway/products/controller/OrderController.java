package com.isafeway.products.controller;

import com.isafeway.products.ResultMap;
import com.isafeway.products.domain.ShopCartItem;
import com.isafeway.products.service.OrderService;
import com.isafeway.products.util.ShiroUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.eclipse.jdt.internal.compiler.parser.Parser.name;

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

    @RequestMapping(value = "/orders")
    public ResultMap index(@RequestParam(defaultValue = "1") int pageNo, @RequestParam(defaultValue = "10")int pageSize) {
        return new ResultMap(orderService.query(pageNo, pageSize));
    }
}
