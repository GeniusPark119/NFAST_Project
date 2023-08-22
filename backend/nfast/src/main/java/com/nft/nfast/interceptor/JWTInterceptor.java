package com.nft.nfast.interceptor;

import com.nft.nfast.controller.JWTUtil;
import com.nft.nfast.exception.User.UserAuthorizationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
@RequiredArgsConstructor
@Slf4j
public class JWTInterceptor implements HandlerInterceptor {

    private final JWTUtil jwtUtil;


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object Handler){
        // preflight를 위한 OPTIONS 요청은 그냥 전달 (학습을 위해 주석 처리)
        if(request.getMethod().equals("OPTIONS")) {
            return true;
        }

        // request의 헤더에서 jwt-auth-token으로 넘어온 녀석을 찾아본다.
        String authToken = request.getHeader("jwtAuthToken");
        String refreshToken = request.getHeader("jwtRefreshToken");
        System.out.println("AUTHTOKEN "+authToken);
        System.out.println("REFRESHTOKEN "+refreshToken);
//        log.debug("경로: {}, 토큰: {}", request.getServletPath(), authToken);

        if (authToken != null) {
            // 유효한 토큰이면 진행, 그렇지 않으면 예외를 발생시킨다.
            System.out.println("나 유효해으아악~~~~~~~~~~~"+authToken);
            jwtUtil.checkAndGetClaims(authToken);
            return true;
        }
        else
            throw new UserAuthorizationException();
        }

}
