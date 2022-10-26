const os = require('os')
const path = require('path')
const {exec} = require("child_process")
const fs = require("fs");
const {downloadImageAsFile, convertSvg2Png} = require('./utils.js');


exports.handler = async (event) => {
    const url = event.url;
    const dir = os.tmpdir();
    const svg_file_name = 'test_upload_image_node_v5.svg';
    const svg_path = path.join(dir, svg_file_name);
    await downloadImageAsFile(url, svg_path);

    const png_file_name = 'test_upload_image_node_v5.png';
    const png_path = path.join(dir, png_file_name);

    await convertSvg2Png(svg_path, png_path);

    // const base64String = fs.readFileSync(png_path, {encoding: 'base64'});
    // console.log(base64String)

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            'base64': png_path
        }),
    };
    return response;
};

