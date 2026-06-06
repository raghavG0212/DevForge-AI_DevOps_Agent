package com.hackathon.DevOpsAgent.util;

import java.io.File;

public class GitUtil {

    public static String cloneRepo(String url) {

        try {

            File tempDir = new File("temp");

            if (!tempDir.exists()) {
                tempDir.mkdirs();
            }

            String repoName = url
                    .substring(url.lastIndexOf("/") + 1)
                    .replace(".git", "");

            String path = "temp/" + repoName + "-" + System.currentTimeMillis();

            ProcessBuilder pb = new ProcessBuilder(
                    "git",
                    "clone",
                    "--depth",
                    "1",
                    url,
                    path
            );

            pb.redirectErrorStream(true);

            Process process = pb.start();

            int exitCode = process.waitFor();

            if (exitCode != 0) {
                return null;
            }

            return path;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}