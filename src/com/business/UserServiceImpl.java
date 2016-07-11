package com.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.User;
import com.api.UserService;
import com.dao.UserMapper;
@Service("userService")
public class UserServiceImpl  implements  UserService {

	@Autowired
	private UserMapper userMapper;

	@Override
	public List<User> getAllUsers() {
		// TODO Auto-generated method stub
		return userMapper.getAllUsers();
	}
	
	
}
