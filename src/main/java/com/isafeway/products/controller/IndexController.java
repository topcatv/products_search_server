package com.isafeway.products.controller;

import com.isafeway.products.ResultMap;
import com.isafeway.products.service.Product;
import com.isafeway.products.service.ProductService;
import com.sun.org.apache.regexp.internal.RE;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.security.auth.login.LoginException;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by topcat on 16/7/22.
 */
@RestController
public class IndexController {
    @Autowired
    private ProductService productService;

    private final static Logger logger = LoggerFactory.getLogger(IndexController.class);

    @RequestMapping(value = "/products")
    public ResultMap index(String name, String code, String barCode, @RequestParam(defaultValue = "1") int pageNo, @RequestParam(defaultValue = "10")int pageSize) {
        return new ResultMap(productService.queryProduct(code, name, barCode, pageNo, pageSize));
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResultMap login(String username, String password) throws LoginException {
        return doLogin(username, password);
    }

    @RequestMapping(value = "/logout")
    public ResultMap logout() {
        Subject currentUser = SecurityUtils.getSubject();
        currentUser.logout();
        return ResultMap.OK;
    }

    public ResultMap doLogin(String userName, String pwd) throws LoginException {
        logger.debug("userName: {}, pwd: {}", userName, pwd);
//        pwd = DigestUtils.md5DigestAsHex(pwd.getBytes());
        UsernamePasswordToken token = new UsernamePasswordToken(userName, pwd);
        token.setRememberMe(true);
        //获取当前的Subject
        Subject currentUser = SecurityUtils.getSubject();
        try {
            //在调用了login方法后,SecurityManager会收到AuthenticationToken,并将其发送给已配置的Realm执行必须的认证检查
            //每个Realm都能在必要时对提交的AuthenticationTokens作出反应
            //所以这一步在调用login(token)方法时,它会走到MyRealm.doGetAuthenticationInfo()方法中,具体验证方式详见此方法
            currentUser.login(token);
        } catch (UnknownAccountException uae) {
            logger.debug("对用户[" + userName + "]进行登录验证..验证未通过,未知账户");
            throw new UnknownAccountException("用户不存在");
        } catch (IncorrectCredentialsException ice) {
            logger.debug("对用户[" + userName + "]进行登录验证..验证未通过,错误的凭证");
            ice.printStackTrace();
            throw new IncorrectCredentialsException("密码不正确");
        } catch (LockedAccountException lae) {
            logger.debug("对用户[" + userName + "]进行登录验证..验证未通过,账户已锁定");
            throw new LoginException("账户已锁定");
        } catch (ExcessiveAttemptsException eae) {
            logger.debug("对用户[" + userName + "]进行登录验证..验证未通过,错误次数过多");
            throw new LoginException("用户名或密码错误次数过多");
        } catch (AuthenticationException ae) {
            //通过处理Shiro的运行时AuthenticationException就可以控制用户登录失败或密码错误时的情景
            logger.debug("对用户[" + userName + "]进行登录验证..验证未通过,堆栈轨迹如下");
            throw new LoginException(ae.getMessage());
        }
        //验证是否登录成功
        if (currentUser.isAuthenticated()) {
            logger.debug("用户[" + userName + "]登录认证通过(这里可以进行一些认证通过后的一些系统参数初始化操作)");
        } else {
            token.clear();
        }
        return ResultMap.OK;
    }

    @RequestMapping(value = "/unauthorized", method = RequestMethod.GET)
    String unauthorized(HttpServletResponse response){
        response.setStatus(HttpStatus.FORBIDDEN.value());
        return "/login";
    }
}
