import { MongoClient, ObjectId } from "mongodb";
import {DB_URI} from '$app/env/private';

const client = new MongoClient(DB_URI);
await client.connect();
const db = client.db('watchtrack');

async function getShows() {
    let shows = [];
    try {
        const collection = db.collection('shows');
        shows = await collection.find({}).toArray();
        shows.forEach(show => {
            show._id = show._id.toString();
        });
    } catch (error) {
        console.log(error);
    }
    return shows;
}

async function getShow(id) {
    let show = null;
    try {
        const collection = db.collection('shows');
        show = await collection.findOne ({_id: new ObjectId(id)});
        if (show) {
            show._id = show._id.toString();
        }
    } catch (error) {
        console.log(error);
    }
    return show;
}

async function createShow(show) {
    try {
        const collection = db.collection('shows');
        const result = await collection.insertOne(show);
        return result.insertedId.toString();
    } catch (error) {
        console.log(error);
    }
    return null;
}

async function updateShow(show) {
    try {
        const id = show._id;
        delete show._id;
        const collection = db.collection('shows');
        await collection.updateOne({ _id: new ObjectId(id)}, {$set: show});
        return id;
    } catch (error) {
        console.log(error);
    }
    return null;
}

async function deleteShow(id) {
    try {
        const collection = db.collection('shows');
        await collection.deleteOne({ _id: new ObjectId(id) });
        return id;
    } catch (error) {
        console.log(error);
    }
    return null;
}

export default { getShows, getShow, createShow, updateShow, deleteShow};