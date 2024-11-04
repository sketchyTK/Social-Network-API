import { Schema, Types, model, type Document } from 'mongoose';

interface IUser extends Document {
    username: string,
    email: string,
    thoughts: Schema.Types.ObjectId[]
    friends: Schema.Types.ObjectId[];
}

interface Ithought extends Document {
    thoughtText: string,
    createdAt: Date,
    username: string,
    formattedCreatedAt: string;
    reactions: Schema.Types.ObjectId[]
}

interface Ireaction extends Document {
    reactionId: Schema.Types.ObjectId,
    reactionBody: string,
    username: string,
    createdAt: Date
}

const thoughtSchema = new Schema<Ithought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }, 
        
        reactions: [{
            type: Schema.Types.ObjectId,
            ref: 'reactions',
            }]
    },
        { 
            toJSON: { getters: true }, 
            toObject: { getters: true },
});

thoughtSchema.virtual('formattedCreatedAt').get(function (this: Ithought) {
    return this.createdAt.toLocaleString(); // Format the date as needed
});

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            max_length: 50,
        },
        email: {
            type: String,
            required: true,
            max_length: 50,
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thought',
            }]
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