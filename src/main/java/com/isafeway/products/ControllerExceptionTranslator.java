package com.isafeway.products;

import com.alibaba.fastjson.JSON;
import com.isafeway.products.util.DateUtil;
import org.apache.commons.lang.ArrayUtils;
import org.apache.shiro.authz.UnauthenticatedException;
import org.apache.shiro.authz.UnauthorizedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.InitBinder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.beans.PropertyEditorSupport;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

@ControllerAdvice
public class ControllerExceptionTranslator {
    public static final Logger logger = LoggerFactory.getLogger(ControllerExceptionTranslator.class);

    private boolean isAjaxRequest(HttpServletRequest request) {
//        return "XMLHttpRequest".equalsIgnorse(request.getHeader("X-Requested-With"));
        return true;
    }

    @ExceptionHandler(Exception.class)
    String handleException(Exception exception, HttpServletRequest request, HttpServletResponse response) throws IOException {
        ResultMap error = new ResultMap();
        error.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        error.setMessage(exception.getMessage());
        logger.error("handleException: ", exception);
        request.setAttribute("exception", exception.getClass().toString());
        request.setAttribute("message", exception.getMessage());
        return resultHandler(request, response, error);
    }

    @ExceptionHandler(UnauthenticatedException.class)
    String handleUnauthenticatedException(UnauthenticatedException exception, HttpServletRequest request, HttpServletResponse response) throws IOException {
        ResultMap error = new ResultMap();
        error.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        error.setMessage(exception.getMessage());
        request.setAttribute("exception", exception.getClass().toString());
        request.setAttribute("message", exception.getMessage());
        return resultHandler(request, response, error, "login");
    }

    private String resultHandler(HttpServletRequest request, HttpServletResponse response, ResultMap error, String ... page) throws IOException {
        if (isAjaxRequest(request)) {
            response.setContentType("text/json;charset=utf-8");
            response.setCharacterEncoding("UTF-8");
            PrintWriter out = response.getWriter();
            out.println(JSON.toJSONString(error));
            out.flush();
            out.close();
            return null;
        }
        if(ArrayUtils.isNotEmpty(page)){
            return page[0];
        } else {
            return "error";
        }
    }

    @ExceptionHandler(UnauthorizedException.class)
    String handleUnauthorizedException(UnauthorizedException exception, HttpServletRequest request, HttpServletResponse response) throws IOException {
        ResultMap error = new ResultMap();
        error.setStatus(HttpServletResponse.SC_FORBIDDEN);
        error.setMessage(exception.getMessage());
        request.setAttribute("exception", exception.getClass().getName());
        request.setAttribute("message", exception.getMessage());
        return resultHandler(request, response, error);
    }

    @InitBinder
    void initBinder(WebDataBinder binder) {
        binder.registerCustomEditor(Date.class, new PropertyEditorSupport() {
            public void setAsText(String text) throws IllegalArgumentException {
                //try to parse date time format first, then date format
                Date value = DateUtil.toLongDate(text);
                if (value == null) {
                    value = DateUtil.toShortDate(text);
                }
                this.setValue(value);
            }

            public String getAsText() {
                return DateUtil.toShortDateString((Date) this.getValue());
            }
        });
    }
}