package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.api.User;
import com.business.UserServiceImpl;
@Controller
public class UserController {
     @Autowired
	 private UserServiceImpl userService;
     @RequestMapping("/getAllUsers.action")
	 public @ResponseBody  List<User> getAllUsers(){
		 
		 
		 return userService.getAllUsers();
	 }
     
     
}
