package com.nft.nfast.config;

import com.nft.nfast.controller.JWTUtil;
import com.nft.nfast.interceptor.JWTInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Configuration
public class MVCConfig implements WebMvcConfigurer {
    private final JWTUtil jwtUtil;
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("*")
//                .allowedMethods("GET","POST");
                .allowedMethods(HttpMethod.GET.name(), HttpMethod.POST.name(), HttpMethod.PUT.name(),
                        HttpMethod.DELETE.name(), HttpMethod.HEAD.name(), HttpMethod.OPTIONS.name(),
                        HttpMethod.PATCH.name()).maxAge(1800);
    }

    // JWT 인터셉터
//    @Override
//    public void addInterceptors(InterceptorRegistry registry){
//        List<String> excludePatterns = new ArrayList<String>();
//        excludePatterns.add("/api/main/search-list/{storeName}");
//        excludePatterns.add("/api/login");
//        excludePatterns.add("/api/main/distance-recommendation-list");
//        excludePatterns.add("/api/main/transaction-recommendation-list");
//        excludePatterns.add("/api/main/search-list/store/{storeSequence}");
//        excludePatterns.add("/api/store/{storeSequence}/purchase/detail");
//        excludePatterns.add("/api/owner/introduction-store/application");
//        excludePatterns.add("/api/owner/login");
//        JWTInterceptor jwtInterceptor = new JWTInterceptor(jwtUtil);
//        registry.addInterceptor(jwtInterceptor)
//                .addPathPatterns("/api/**").excludePathPatterns(excludePatterns);
//    }
}
