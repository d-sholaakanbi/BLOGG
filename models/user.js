const mongoose= require ("mongoose");
const bcrypt = require ("bcrypt");
const jwt = require("jsonwebtoken");



//alternatively you can use validate (install validator)
const Schema = mongoose.Schema

const userSchema = new Schema ({
    name:{
        type: String,
        required: [true, 'please provide a name' ],
        minlength:  [3, 'the minimum length of your password is 3'],
    },
    
    email:{
        type: String,
        unique: true,
        required: [true,'please provide an email' ],
        match: [ /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'please provide a valid email']
    },
    
    password:{
        type: String,
        required: [true, 'Please a provide password'],
        minlength:  [7, 'the minimum length of your password is 7'],
    }
},
{timestamps: true}
);


userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.generateToken = function () {
    return jwt.sign({userId: this._id, name: this.name}, process.env.JWT_SECRET, {expiresIn: "3d",
})
}

userSchema.methods.comparePassword = async function (userPassword) {
    const isCorrect = await bcrypt.compare(userPassword, this.password)
    return isCorrect;
}

module.exports = mongoose.model("User", userSchema);