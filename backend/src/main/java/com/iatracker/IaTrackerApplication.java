package com.iatracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class IaTrackerApplication {
    public static void main(String[] args) {
        SpringApplication.run(IaTrackerApplication.class, args);
        System.out.println("Running");
    }
}
