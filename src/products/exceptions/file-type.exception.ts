import { ProductServiceException } from './product-service-input.exception';
export class FileTypeException extends ProductServiceException {
    /** Throws exception with message 'File upload only supports the following
   * filetypes - {fileTypes}'.
   *
   * Used when the user inputs an invalid file type
   * uploading a picture
   */
  constructor(fileType: RegExp) {
    super(`File upload only supports the following filetypes - ${fileType}`)
  }
}