package com.qreal.robots.components.database.robots.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.qreal.robots.components.dashboard.controller.MainController;
import com.qreal.robots.components.database.robots.DAO.RobotDAO;
import com.qreal.robots.components.database.users.service.UserService;
import com.qreal.robots.components.authorization.model.auth.User;
import com.qreal.robots.components.dashboard.model.robot.Message;
import com.qreal.robots.components.dashboard.model.robot.Robot;
import com.qreal.robots.components.dashboard.model.robot.RobotInfo;
import com.qreal.robots.common.socket.SocketClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 * Created by tanvd on 07.07.16.
 */
@Service
public class RobotServiceImpl implements RobotService {

    private static final ObjectMapper mapper = new ObjectMapper();

    @Autowired
    private UserService userService;

    @Autowired
    private RobotDAO robotDAO;

    @Override
    public String sendProgram(String robotName, String program) throws JsonProcessingException {
        Robot robot = robotDAO.findByName(robotName);
        SocketClient socketClient = new SocketClient(MainController.HOST_NAME, MainController.PORT);
        return socketClient.sendMessage(generateSendProgramRequest(robotName, robot.getSsid(), program));
    }

    @Override
    public String register(String name, String ssid) {
        User user = userService.findByUserName(getUserName());
        if (!userRobotExists(user, name)) {
            robotDAO.save(new Robot(name, ssid, user));
            return "{\"status\":\"OK\"}";
        } else {
            return String.format("{\"status\":\"ERROR\", \"message\":\"Robot with name %s is already exists\"}", name);
        }
    }

    @Override
    public String delete(String name) {
        Robot robot = robotDAO.findByName(name);
        robotDAO.delete(robot);
        return "{\"message\":\"OK\"}";
    }

    private String generateSendProgramRequest(String robotName, String ssid, String program)
            throws JsonProcessingException {
        RobotInfo robotInfo = new RobotInfo(getUserName(), robotName, ssid);
        robotInfo.setProgram(program);
        Message message = new Message("WebApp", "sendDiagram", robotInfo);
        return mapper.writeValueAsString(message);
    }

    private String getUserName() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    private boolean userRobotExists(User user, String name) {
        for (Robot robot : user.getRobots()) {
            if (robot.getName().equals(name)) {
                return true;
            }
        }
        return false;
    }


}
