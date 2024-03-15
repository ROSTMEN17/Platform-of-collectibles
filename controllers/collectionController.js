const Collection = require('../models/collection');

class CollectionController {
    async createCollection(req, res) {
        try {
            const { name, description, author, year_of_creation, category, digital_representations } = req.body;
            const newCollection = new Collection({ name, description, author, year_of_creation, category, digital_representations });
            const savedCollection = await newCollection.save();
            res.status(201).json(savedCollection);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllCollections(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            const collections = await Collection.find().skip(skip).limit(limit);
            res.json(collections);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getCollectionById(req, res) {
        try {
            const collection = await Collection.findById(req.params.id);
            if (!collection) {
                return res.status(404).json({ message: 'Collection not found' });
            }
            res.json(collection);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateCollection(req, res) {
        try {
            const { name, description, author, year_of_creation, category, digital_representations } = req.body;
            const updatedCollection = await Collection.findByIdAndUpdate(req.params.id, { name, description, author, year_of_creation, category, digital_representations }, { new: true });
            if (!updatedCollection) {
                return res.status(404).json({ message: 'Collection not found' });
            }
            res.json(updatedCollection);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteCollection(req, res) {
        try {
            const deletedCollection = await Collection.findByIdAndDelete(req.params.id);
            if (!deletedCollection) {
                return res.status(404).json({ message: 'Collection not found' });
            }
            res.json({ message: 'Collection deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async searchItems(req, res) {
        try {
            const { keywords, category, creator, year } = req.query;

            let query = {};

            if (keywords) {
                query.$or = [
                    { name: { $regex: keywords, $options: 'i' } },
                    { description: { $regex: keywords, $options: 'i' } }
                ];
            }

            if (category) {
                query.category = category;
            }

            if (creator) {
                query.author = creator;
            }

            if (year) {
                query.year_of_creation = year;
            }

            const items = await Collection.find(query);
            res.json(items);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateItem(req, res) {
        try {
            const updatedItem = await Collection.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedItem) {
                return res.status(404).json({ message: 'Item not found' });
            }
            res.json(updatedItem);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new CollectionController();
