package com.isafeway.products.controller;

import com.isafeway.products.service.Product;
import com.isafeway.products.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by topcat on 16/7/22.
 */
@RestController
public class IndexController {
    @Autowired
    private ProductService productService;

    @RequestMapping(value = "/products")
    public Page<Product> index(String name, String code, String barCode, @RequestParam(defaultValue = "1") int pageNo, @RequestParam(defaultValue = "10")int pageSize) {
        return productService.queryProduct(code, name, barCode, pageNo, pageSize);
    }
}
