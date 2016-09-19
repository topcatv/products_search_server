package com.isafeway.products.service;

import com.isafeway.products.domain.Product;
import com.isafeway.products.domain.ShopCart;
import com.isafeway.products.domain.ShopCartItem;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by topcat on 16/8/10.
 */
@Component
public class ShopCartService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @PostConstruct
    public void init() {
        if (!mongoTemplate.collectionExists(ShopCart.class)) {
            mongoTemplate.createCollection(ShopCart.class);
        }
    }

    public List<ShopCartItem> loadShopCart(String userId) {
        List<ShopCart> shopCarts = mongoTemplate.find(Query.query(Criteria.where("userId").is(userId)), ShopCart.class);
        if(CollectionUtils.isEmpty(shopCarts)){
            return new ArrayList<ShopCartItem>(0);
        }
        List<ShopCartItem> result = new ArrayList<ShopCartItem>(shopCarts.size());
        for (ShopCart sc :
                shopCarts) {
            ShopCartItem shopCartItem = new ShopCartItem(mongoTemplate.findById(sc.getItemId(), Product.class));
            shopCartItem.setCount(sc.getCount());
            result.add(shopCartItem);
        }
        return result;
    }

    public void addItem(String userId, String itemId) {
        if(mongoTemplate.exists(Query.query(Criteria.where("userId").is(userId).and("itemId").is(itemId)), ShopCart.class)){
            ShopCart shopCart = mongoTemplate.findOne(Query.query(Criteria.where("userId").is(userId).and("itemId").is(itemId)), ShopCart.class);
            shopCart.setCount(shopCart.getCount() + 1);
            mongoTemplate.save(shopCart);
        } else {
            ShopCart shopCart = new ShopCart();
            shopCart.setItemId(itemId);
            shopCart.setUserId(userId);
            shopCart.setCount(1);
            mongoTemplate.insert(shopCart);
        }
    }

    public void removeItem(String userId, String itemId) {
        mongoTemplate.remove(Query.query(Criteria.where("userId").is(userId).and("itemId").is(itemId)), ShopCart.class);
    }

    public void itemCountChange(String userId, String itemId, int count) {
        ShopCart shopCart = mongoTemplate.findOne(Query.query(Criteria.where("userId").is(userId).and("itemId").is(itemId)), ShopCart.class);
        shopCart.setCount(count);
        mongoTemplate.save(shopCart);
    }

    public void clean(String userId) {
        mongoTemplate.remove(Query.query(Criteria.where("userId").is(userId)), ShopCart.class);
    }
}
