import { Schema, Types, model, type Document } from 'mongoose';
import {format } from 'date-fns';

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
    createdAt: Date,
    username: string,
    formattedCreatedAt: string;
}

const reactionsSchema = new Schema<Ireaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
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
    }
);

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
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }, 
        
        reactions: [reactionsSchema]
    },
        { 
            toJSON: { getters: true }, 
            toObject: { getters: true },
});

reactionsSchema.virtual('formattedCreatedAt').get(function (this: Ireaction) {
    return this.createdAt.toLocaleString(); // Format the date as needed
});

thoughtSchema.virtual('formattedCreatedAt').get(function (this: Ithought) {
    return this.createdAt.toLocaleString(); // Format the date as needed
});

thoughtSchema.virtual('reactionCount').get(function (this: Ithought) {
    return this.reactions?.length;
});

const Thought = model('Thought', thoughtSchema);

export default Thought;