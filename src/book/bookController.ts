import { NextFunction, Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import path from "node:path";
import createHttpError from "http-errors";
import bookModel from "./bookModel";
import fs from "node:fs";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  console.log("files", req.files);
  const { title, genre } = req.body;

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  // --> uploadResult
  const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);

  const filename = files.coverImage[0].filename;

  const filePath = path.resolve(
    __dirname,
    "../../public/data/uploads",
    filename
  );

  // -->  bookFileUploadResult
  const bookFileName = files.file[0].filename;

  const bookFilePath = path.resolve(
    __dirname,
    "../../public/data/uploads",
    bookFileName
  );

  try {
    // --> uploadResult
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: filename,
      folder: "book-covers",
      format: coverImageMimeType,
    });

    console.log("Upload Result: ", uploadResult);

    // -->  bookFileUploadResult
    const bookFileUploadResult = await cloudinary.uploader.upload(
      bookFilePath,
      {
        resource_type: "raw",
        filename_override: bookFileName,
        folder: "book-pdfs",
        format: "pdf",
      }
    );
    console.log("Book file Upload Result: ", bookFileUploadResult);

    const newBook = await bookModel.create({
      title,
      genre,
      author: "661a3790d860c80d134ec0f0",
      coverImage: uploadResult.secure_url,
      file: bookFileUploadResult.secure_url,
    });

    // Delete Temp Files....
    try {
      await fs.promises.unlink(filePath);
      await fs.promises.unlink(bookFilePath);
    } catch (error) {
      return next(createHttpError(500, "FS Error"));
    }

    res.status(201).json({ id: newBook._id });
  } catch (error) {
    console.log(error);
    return next(
      createHttpError(500, "Error while uploading covers image & PDF !")
    );
  }
};

export { createBook };
