package com.hackathon.DevOpsAgent.util;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

public class FileScannerUtil {

    public static Map<String, String> detectStack(String path) {

        Map<String, String> res = new HashMap<>();

        File root = new File(path);

        if (!root.exists()) {
            return res;
        }

        // Spring Boot / Maven
        if (new File(path + "/pom.xml").exists()) {
            res.put("backend", "Spring Boot");
            res.put("buildTool", "Maven");
        }

        // React / Node
        if (new File(path + "/package.json").exists()) {
            res.put("frontend", "React");
            res.put("runtime", "Node.js");
        }

        // Python
        if (new File(path + "/requirements.txt").exists()) {
            res.put("backend", "Python");
        }

        // Existing DevOps files
        if (new File(path + "/Dockerfile").exists()) {
            res.put("docker", "true");
        }

        if (new File(path + "/docker-compose.yml").exists()) {
            res.put("compose", "true");
        }

        if (new File(path + "/.github").exists()) {
            res.put("githubActions", "true");
        }

        if (new File(path + "/k8s").exists()
                || new File(path + "/kubernetes").exists()) {
            res.put("kubernetes", "true");
        }

        scan(root, res);

        return res;
    }

    private static void scan(File dir, Map<String, String> res) {

        if (dir == null || !dir.exists()) {
            return;
        }

        File[] files = dir.listFiles();

        if (files == null) {
            return;
        }

        for (File f : files) {

            if (f.isDirectory()) {
                scan(f, res);
            } else {

                String n = f.getName();

                if (n.endsWith(".java")
                        && !res.containsKey("backend")) {

                    res.put("backend", "Java");
                }

                if ((n.endsWith(".jsx")
                        || n.endsWith(".tsx"))
                        && !res.containsKey("frontend")) {

                    res.put("frontend", "React");
                }
            }
        }
    }

    public static String getSummary(String path) {

        StringBuilder sb = new StringBuilder();

        File root = new File(path);

        buildSummary(root, sb, 0);

        return sb.toString();
    }

    private static void buildSummary(
            File file,
            StringBuilder sb,
            int depth) {

        if (file == null || !file.exists()) {
            return;
        }

        if (depth > 3) {
            return;
        }

        sb.append("  ".repeat(depth))
          .append(file.getName())
          .append("\n");

        if (file.isDirectory()) {

            File[] children = file.listFiles();

            if (children != null) {

                for (File child : children) {
                    buildSummary(child, sb, depth + 1);
                }
            }
        }
    }

    public static boolean isSpringBoot(
            Map<String, String> stack) {

        return "Spring Boot".equals(
                stack.get("backend"));
    }

    public static boolean isReact(
            Map<String, String> stack) {

        return stack.containsKey("frontend");
    }
}