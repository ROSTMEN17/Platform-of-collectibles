const express = require("express");
const router = express.Router();
const CollectionController = require('./controllers/collectionController');
const UserController = require('./controllers/userController'); 

router.post('/collection', CollectionController.createCollection);
router.get('/collection', CollectionController.getAllCollections); 
router.get('/collection/:id', CollectionController.getCollectionById); 
router.put('/collection/:id', CollectionController.updateCollection); 
router.delete('/collection/:id', CollectionController.deleteCollection); 

router.post('/user/register', UserController.registerUser); 
router.post('/user/login', UserController.loginUser); 
router.get('/user', UserController.getAllUser);

module.exports = router;