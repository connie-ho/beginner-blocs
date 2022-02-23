require('dotenv').config();
const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;
const axios = require('axios');

export const pinJSONToIPFS = async (JSONbody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

  // const buffer = Buffer.from(file, "base64");
  // const stream = Readable.from(buffer);
  // const filename = file.name;
  // stream.path = filename;

  // let data = new FormData();
  // data.append('file', stream);

  // const metadata = JSON.stringify({
  //     name: name,
  //     image: stream,
  //     description: description
  // });
  // data.append('pinataMetadata', metadata);

  // console.log("data is here: ", data);
  return axios
    .post(url, JSONbody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl: 'https://gateway.pinata.cloud/ipfs/' + response.data.IpfsHash,
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};
