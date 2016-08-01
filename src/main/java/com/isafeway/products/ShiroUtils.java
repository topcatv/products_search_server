package com.isafeway.products;

import com.isafeway.products.service.User;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;

/**
 * Created by topcat on 16/3/15.
 */
public class ShiroUtils {

    public static String currentUserId() {
        User account = currentUser();
        if(null == account) {
            return null;
        }
        return account.getId();
    }

    public static User currentUser(){
        Subject currentUser = SecurityUtils.getSubject();
        if(currentUser == null){
            return null;
        }
        return (User) currentUser.getSession().getAttribute("currentUser");
    }
}
