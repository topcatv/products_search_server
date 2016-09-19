package com.isafeway.products.domain;

import org.apache.commons.beanutils.BeanUtils;

import java.lang.reflect.InvocationTargetException;

/**
 * Created by topcat on 16/8/10.
 */
public class ShopCartItem extends Product {

    public ShopCartItem(){

    }

    public ShopCartItem(Product product) {
        try {
            BeanUtils.copyProperties(this, product);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
    }

    private Integer count;

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }
}
