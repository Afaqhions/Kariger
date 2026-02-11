const express = require('express');
const router = express.Router();

const { loginUser, registerUser, logoutUser, getUserProfile } = require('./controllers/auth');
const { getServices, createService, updateService, deleteService } = require('./controllers/services');
const { getHistory } = require('./controllers/booking');

// Auth Routes
router.get('/login',loginUser);
router.post('/register',registerUser);
router.post('/logout',logoutUser);
router.get('/profile',getUserProfile);

// Services Routes
router.get('/get_services',getServices);
router.post('/create_services',createService);
router.put('/update_services/:id',updateService);
router.delete('/delete_services/:id',deleteService);

// History Routes
router.get('/history',getHistory);
