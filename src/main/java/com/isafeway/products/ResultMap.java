package com.isafeway.products;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;

/**
 * Created by hp on 2015/9/7.
 */
public class ResultMap extends HashMap{

    public static ResultMap OK = new ResultMap();

    public ResultMap(){
        this.put("status", HttpServletResponse.SC_OK);
    }

    public ResultMap(Object data){
        this.setData(data);
        this.setStatus(HttpServletResponse.SC_OK);
    }

    public ResultMap(Object data, Long totalCount){
        this.init(data, totalCount, HttpServletResponse.SC_OK);
    }

    public ResultMap(Object data, Long totalCount, int status){
        this.init(data, totalCount, status);
    }

    private void init(Object data, Long totalCount, int status){
        this.setData(data);
        this.setTotalCount(totalCount);
        this.setStatus(status);
    }

    public void setData(Object data){
        this.put("data", data);
    }

    public void setTotalCount(Long count){
        this.put("totalCount", count);
    }

    public void setStatus(int status){
        this.put("status", status);
    }

    public void setMessage(String message) {
        this.put("message", message);
    }

}
