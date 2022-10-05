import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import {diskStorage} from 'multer'
import path from 'path'

export const validImageUploadTypes = /jpeg|jpg|png/

/** sets the maximum image upload file size */
export const maxImageUploadSize = 3 * 1024 * 1024 // 3MB

/**
 * Configuration Multer Library Used For File Upload
 * Accepts Only jpes, jpg and png of size up to 3MB
 */

export const MulterConfig: MulterOptions = {
    storage: diskStorage({
        destination: './tmp',
        filename: (_, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
            const fileName = `${uniqueSuffix}-${file.originalname}`
            return callback(null, fileName)
        }
    }),

    fileFilter: (_, file, callback) => {
        const mimeType = validImageUploadTypes.test(file.mimetype)
        const extname = validImageUploadTypes.test(
            path.extname(file.originalname).toLowerCase()
        )
        if(mimeType && extname) return callback(null, true)
        return callback(new Error(`File upload only supports the following filetypes - ${validImageUploadTypes}`), false)
    },

    limits: {
        fileSize: maxImageUploadSize
    }
}