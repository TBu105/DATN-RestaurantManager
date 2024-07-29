const { BadRequest } = require("../core/error.response");
const { Created, Ok } = require("../core/success.response");
const uploadService = require("../services/upload.service");

class UploadController {
  async uploadFile(req, res) {
    const { file } = req;
    if (!file) {
      throw new BadRequest("Please enter file");
    }
    new Created({
      message: "Upload file successfully",
      metadata: await uploadService.uploadImageFromLocal(file.path, req.body),
    }).send(res);
  }

  async uploadFiles(req, res) {
    const { files } = req;
    console.log("files:::", files);
    if (!files) {
      throw new BadRequest("Please enter files");
    }
    new Created({
      message: "Upload files successfully",
      metadata: await uploadService.uploadImagesFromLocal(files, req.body),
    }).send(res);
  }
}

module.exports = new UploadController();
