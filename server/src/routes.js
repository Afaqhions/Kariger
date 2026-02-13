const express = require('express');
const router = express.Router();

const { loginUser, registerUser, logoutUser, getUserProfile } = require('../src/controllers/auth');
const { getServices, createService, updateService, deleteService } = require('../src/controllers/services');
// const { getServices, createService} = require('../src/controllers/services');
// const { getHistory } = require('../src/controllers/booking');

// Auth Routes
router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);
router.get('/profile', getUserProfile);

// // Services Routes
router.get('/get_services', getServices);
router.post('/create_services', createService);
router.put('/update_services/:id', updateService);
router.delete('/delete_services/:id', deleteService);

// // History Routes
// router.get('/history', getHistory);

module.exports = router;
