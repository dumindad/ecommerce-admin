async function generateSignature(callback, params_to_sign){

    // cloudinary.utils.api_sign_request(params_to_sign, api_secret);

     await fatch('/api/sign', {
        method: 'POST',
        body: JSON.stringify({
            params_to_sign,
        }),
     }).then((r)=> r.json()).then(({signature }) => {
        console.log("signature", signature)
        callback(signature);
     });
}