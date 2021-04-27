package com.controller;


import com.entity.User;
import com.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api")
public class RestUserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public List<User> showAllUsers() {
        List<User> allUsers = userService.getAllUsers();
        return allUsers;
    }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable("id") Long id) {
        User user= userService.getUserById(id);
        return user;
    }


    @PostMapping("/users")
    public void addNewUser(String username, String password, String role) {
        userService.edit(new User(username, password), role);
    }

    @PutMapping("/users")
    public void updateNewUser(@RequestParam Long id, String username, String password, String role) {
        userService.edit(new User(id, username, password), role);
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable("id") Long id) {
        User user = userService.getUserById(id);
        if(user == null) {
            return "not correct id";
        }
        else {
            userService.delete(id);
            return "Employee with id - " + id + " was deleted";
        }
    }

}