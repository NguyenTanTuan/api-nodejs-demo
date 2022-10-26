const os = require('os')
const path = require('path')
const {exec} = require("child_process")
const fs = require("fs");
const {downloadImageAsFile} = require('./utils.js');


exports.handler = async (event) => {
    const url = event.url;
    const dir = os.tmpdir();
    const svg_file_name = 'test_upload_image_node_v5.svg';
    const svg_path = path.join(dir, svg_file_name);
    await  downloadImageAsFile(url, svg_path);

    const png_file_name = 'test_upload_image_node_v5.png';
    const png_path = path.join(dir, png_file_name);

    await exec(`svgexport ${svg_path} ${png_path}`, (err, stderr, stdout) => {
        if (err) {
            console.log("error in conversion of svg");
        }
    });
    base64String = fs.readFileSync(png_path, {encoding: 'base64'});

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            'base64': base64String
        }),
    };
    return response;
};

