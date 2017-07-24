const multer = require('multer');

function fileFilter(req, file, cb) {
    const { mimetype } = file;
    if (mimetype === 'image/png' || mimetype === 'image/jpeg') {
        return cb(null, true);
    }
    // cb(null, false);
    cb(new Error('Loi dinh dang file!'));
}

//
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './public/admin/img');
    },
    filename(req, file, cb) {
        cb(null, req.body.username + file.originalname);
    }
});

module.exports = multer({ fileFilter, storage });