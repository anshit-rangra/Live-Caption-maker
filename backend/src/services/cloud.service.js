// SDK initialization

var ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey : process.env.CLOUD_PUBLIC_KEY,
    privateKey : process.env.CLOUD_PRIVATE_KEY,
    urlEndpoint : "https://ik.imagekit.io/4ytu59yld"
});

function uploadFile(file, name){
    return new Promise((resolve, reject) => {
        
        imagekit.upload({
            file:file.buffer,
            fileName:name,
            mime: file.mimetype,
            folder:'/caption-generator'
        }, (error, result) => {
            if(error){
                reject(error)
            } else {
                resolve(result)
            }
        })

    })
}

module.exports = uploadFile;