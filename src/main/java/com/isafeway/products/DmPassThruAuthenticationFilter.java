package com.isafeway.products;

import com.isafeway.products.util.ShiroUtils;
import org.apache.shiro.web.filter.authc.AuthenticationFilter;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

/**
 * @author ck
 * @date 2016/4/13 0013
 */
public class DmPassThruAuthenticationFilter extends AuthenticationFilter {

    protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
        if (isLoginRequest(request, response)) {
            return true;
        } else {
            if (isAjaxRequest((HttpServletRequest) request)) {
                if (ShiroUtils.currentUser() == null) {
                    HttpServletResponse httpServletResponse = (HttpServletResponse)response;
                    httpServletResponse.setContentType("application/json;charset=utf-8");
                    httpServletResponse.setCharacterEncoding("UTF-8");
                    PrintWriter out = httpServletResponse.getWriter();
                    out.println("{\"status\":"+HttpServletResponse.SC_UNAUTHORIZED+",\"message\":\"登陆超时\"}");
                    out.flush();
                    out.close();
                    return false;
                }
            }
            saveRequestAndRedirectToLogin(request, response);
            return false;
        }
    }

    private boolean isAjaxRequest(HttpServletRequest request) {
//        return "XMLHttpRequest".equalsIgnoreCase(request.getHeader("X-Requested-With"));
        return true;
    }

}
