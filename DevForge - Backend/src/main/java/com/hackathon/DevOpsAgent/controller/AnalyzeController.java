package com.hackathon.DevOpsAgent.controller;

import com.hackathon.DevOpsAgent.model.AnalyzeRequest;
import com.hackathon.DevOpsAgent.model.AnalyzeResponse;
import com.hackathon.DevOpsAgent.service.AnalyzeService;
import com.hackathon.DevOpsAgent.util.FileUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class AnalyzeController {

    @Autowired
    private AnalyzeService service;

    @PostMapping("/analyze")
    public AnalyzeResponse analyze(
            @RequestBody AnalyzeRequest req
    ) {

        return service.analyze(req.getInput());
    }

    @PostMapping("/analyzeZip")
    public AnalyzeResponse analyzeZip(
            @RequestParam("file") MultipartFile file
    ) {

        String path = FileUtil.unzip(file);

        if (path == null) {

            return new AnalyzeResponse(
                    false,
                    null,
                    null,
                    null,
                    null,
                    "ZIP extraction failed"
            );
        }

        return service.analyze(path);
    }
}