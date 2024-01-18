import multer from 'multer';
import httpStatus from 'http-status';
import randomstring from 'randomstring';

import config from '@/config/config';
import { ApiError } from '@/utils';

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, config.upload.folder);
  },
  filename: (req: any, file: any, cb: any) => {
    let fileName = file.originalname.toLowerCase().split(' ').join('-');
    let prependString = null;

    if (config.file.prependUploadFilenameMethod === 'random_string') {
      prependString = randomstring.generate({
        length: config.file.randomStringLength,
        charset: 'alphanumeric',
      });
    }

    if (config.file.prependUploadFilenameMethod === 'millisecond') {
      prependString = Date.now();
    }

    if (prependString) {
      fileName = `${prependString}-${fileName}`;
    }

    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: config.file.maxUploadSize },
  fileFilter: (req: any, file: any, cb: any) => {
    const arrFileType = config.file.allowUploadFileType.split(',');

    if (arrFileType.find((type: any) => type === file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);

      const arrMimeType = arrFileType.map((fileType: any) => {
        return fileType.split('/')[1];
      });

      return cb(new ApiError(httpStatus.BAD_REQUEST, `Only ${arrMimeType.join(', ')} file is allowed!`));
    }
  },
});

export default upload;
