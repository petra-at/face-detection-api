const handleProfile = (req,res,dB)=>{
    const {id} = req.params;
    
    dB.select('*').from('users').where({id})
    .then(user=>{
        if(user.length) 
            res.json(user[0]) // to ensure i'm collecting that 1 result 
        else
            res.status(404).json('User does not exist!')})
    .catch(err=>res.status(404).json('User does not exist!'))
}

module.exports = {
    handleProfile:handleProfile
}