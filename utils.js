const axios = require('axios');
const fs = require("fs");
const {exec} = require("child_process");

exports.downloadImageAsFile = async (url, svg_path) => {
    const res = await axios.get(url, {responseType: 'arraybuffer'});
    const buf = Buffer.from(res.data, 'binary');
    fs.writeFileSync(svg_path, buf)
};

exports.convertSvg2Png = async (svg_file, png_file) => {
    await exec(`svgexport ${svg_file} ${png_file}`, (err, stderr, stdout) => {
        if (err) {
            console.log("error in conversion of svg")
        }
    });
};