const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

function getCollection() {
  return mongodb.getDb().db('contacts').collection('contacts')
}

const getAll = async (req, res, next) => {
  const result = await getCollection().find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await getCollection().findOne({ _id: userId });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result); 
};

module.exports = { getAll, getSingle };
