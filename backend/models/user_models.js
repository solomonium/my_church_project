import mongoose from 'mongoose';

const newUserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true // Removes leading/trailing spaces
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures email is unique
        lowercase: true, // Ensures email is stored in lowercase
        match: [/.+@.+\..+/, 'Please enter a valid email'] // Simple email format validation
    },
    dob: {
        type: Date, // Use Date type for the date of birth
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Adds a minimum length for security
    },
    roles: {
        type: [String], 
        default: ['user'] 
}
}, {
    timestamps: true
}
);

const NewUser = mongoose.model('User', newUserSchema);

export default NewUser;