import { unlinkSync } from "node:fs";

import logger from "../log.config.js";

function deleteFile(localFilePathList) {
  if (!localFilePathList || !Array.isArray(localFilePathList)) {
    logger.error(
      "File deletion failed!, expected parameter should be list of local file paths.",
    );
    return false;
  }

  localFilePathList.forEach((filePath) => {
    try {
      if (filePath) {
        unlinkSync(filePath);
      }
    } catch (error) {
      logger.error(error?.message);
      return false;
    }
  });

  return true;
}

export default deleteFile;
