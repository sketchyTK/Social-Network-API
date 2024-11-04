import { Schema, Types, model, type Document } from 'mongoose';

interface IUser extends Document {
    username: string,
    email: string,
    thoughts: Schema.Types.ObjectId[]
    friends: Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            max_length: 50,
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            max_length: 50,
            trim: true,
            unique: true,
        },
        thoughts: [ 
            {
            type: Schema.Types.ObjectId,
            ref: 'thoughts',
            }
        ],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],
    },
      {
        toJSON: {
            virtuals: true,
        },
    },
);
userSchema.virtual('friendCount').get(function() {
    return this.friends?.length;
});

const User = model('User', userSchema);

export default User;