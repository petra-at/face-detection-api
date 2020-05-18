const clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '8c54afad31114b6685d9c07aa6bc17e7'
   });

const handleClarifai=(req,res)=>{
    app.models.predict(clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>res.status(400).json('Unable to work with API'))
console.log(process);
   }

const handleImage = (req,res,dB)=>{
    const {id} = req.body;
  
    dB('users')
    .where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{
        res.json(entries)
    })
    .catch(err=>res.status(400).json('Unable to update entries.'))
}

module.exports = {
    handleImage:handleImage,
    handleClarifai:handleClarifai
}