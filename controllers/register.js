 const handleRegister = (req,res,dB,bcrypt)=>{
    const {name,email,password} = req.body;
    if(!email||!name||!password)
        return res.status(400).json('Incorrect form submission.')
        
    const hash = bcrypt.hashSync(password);

    dB.transaction(trx=>{
        trx.insert({
          hash:hash,
          email:email
        })
        .into('login')
        .returning('email')
        .then(async loginEmail=>{
            const user = await trx('users')
                .returning('*')
                .insert({
                    username: name,
                    email: loginEmail[0],
                    joined: new Date()
                })
                .then(user=>{
                    res.json(user[0]);
                })
            })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err=>res.status(400).json('Error! Unable to register.'))
};

module.exports = {
    handleRegister:handleRegister
}