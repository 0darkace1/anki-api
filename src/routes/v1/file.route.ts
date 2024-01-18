import express from 'express';

import auth from '@/middlewares/auth';
// import fileController from '@/controllers/file.controller';

const router = express.Router();

// router.post('/upload', fileController.upload);
// router.delete('/', fileController.upload);

// router.route('/').post(auth(), fileController.upload);
// router.route('/:fileName').delete(auth(), fileController.deleteFile);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: File
 *   description: File management and retrieval
 */

/**
 * @swagger
 * /file:
 *   post:
 *     summary: Upload a file
 *     tags: [File]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fileName:
 *                 type: string
 *                 format: binary
 *     responses:
 *       "200":
 *         description: Uploaded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   example: http://127.0.0.1:9000/public/1694865355909-image_processing.png
 *       "400":
 *         description: Failed to upload
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 * /file/{fileName}:
 *   delete:
 *     summary: Delete a file
 *     tags: [File]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fileName:
 *                 type: string
 *                 format: binary
 *     responses:
 *       "200":
 *         description: Deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       "400":
 *         description: Failed to delete
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
