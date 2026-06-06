package com.hackathon.DevOpsAgent.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackathon.DevOpsAgent.model.ExplainRequest;
import com.hackathon.DevOpsAgent.service.AIService;

@RestController
@RequestMapping("/api")
public class ExplainController {
	
	@Autowired
	private AIService aiService;
	
	@PostMapping("/explain")
	public String explain(@RequestBody ExplainRequest request) {
		
		System.out.println("Explain request for: " + request.getFileName());
		
	    if (request.getFileName() == null || request.getContent() == null) {
	        return "Invalid request: fileName or content missing";
	    }

	    return aiService.explainFile(request.getFileName(), request.getContent());
	}
}
