const handleSignIn=(dB,bcrypt)=>(req,res)=>{
    const {email,password} = req.body;

    if(!email||!password)
        return res.status(400).json('Incorrect form submission.')

    dB.select('email','hash').from('login')
    .where('email','=',email)
    .then(data=>
        {
          const isValid = bcrypt.compareSync(password, data[0].hash);
          if(isValid)
           {
               return dB.select('*').from('users')
               .where('email','=',req.body.email)
               .then(user=>res.json(user[0]))
               .catch(err=>res.status(400).json('Error! Invalid crendentials!'))  
           }
           else
           res.status(400).json('Error! Invalid crendentials!')
        })
        .catch(err=>res.status(400).json('Error! Invalid user. Re-check credentials!'))
}

module.exports = {
    handleSignIn:handleSignIn
}