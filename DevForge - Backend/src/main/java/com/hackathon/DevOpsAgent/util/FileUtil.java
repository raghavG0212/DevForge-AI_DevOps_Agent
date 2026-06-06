package com.hackathon.DevOpsAgent.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class FileUtil {

    public static String unzip(MultipartFile file) {

        String dest = "temp/unzip-" + System.currentTimeMillis();

        File destinationDir = new File(dest);

        if (!destinationDir.exists()) {
            destinationDir.mkdirs();
        }

        try (ZipInputStream zis =
                     new ZipInputStream(file.getInputStream())) {

            ZipEntry entry;

            while ((entry = zis.getNextEntry()) != null) {

                File newFile = newFile(destinationDir, entry);

                if (entry.isDirectory()) {

                    newFile.mkdirs();

                } else {

                    new File(newFile.getParent()).mkdirs();

                    Files.copy(
                            zis,
                            Path.of(newFile.getAbsolutePath())
                    );
                }
            }

        } catch (Exception e) {

            e.printStackTrace();
            return null;
        }

        return dest;
    }

    private static File newFile(
            File destinationDir,
            ZipEntry zipEntry) throws IOException {

        File destFile =
                new File(destinationDir, zipEntry.getName());

        String destDirPath =
                destinationDir.getCanonicalPath();

        String destFilePath =
                destFile.getCanonicalPath();

        if (!destFilePath.startsWith(
                destDirPath + File.separator)) {

            throw new IOException(
                    "Zip entry outside target dir"
            );
        }

        return destFile;
    }
}