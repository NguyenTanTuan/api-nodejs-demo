const axios = require('axios');

exports.downloadImageAsFile = async (url, svg_path) => {
    const res = await axios.get(url, {responseType: 'arraybuffer'});
    const buf = Buffer.from(res.data, 'binary');
    fs.writeFileSync(svg_path, buf)
};