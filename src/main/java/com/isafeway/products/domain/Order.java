package com.isafeway.products.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

/**
 * Created by topcat on 16/8/12.
 */
@Document
public class Order {

    @Id
    private String id;
    private String userId;
    private Date createDate;
    private List<ShopCartItem> items;

    public Order(String userId, List<ShopCartItem> items) {
        this.userId = userId;
        this.items = items;
        this.createDate = new Date();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<ShopCartItem> getItems() {
        return items;
    }

    public void setItems(List<ShopCartItem> items) {
        this.items = items;
    }
}
