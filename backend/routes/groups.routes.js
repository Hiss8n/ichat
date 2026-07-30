import express from "express";
import protectedRoute from '../middleware/auth.middleware.js';

import  {messageGroup} from "../controllers/groupmessage.controllers.js";

import {createGroup, getAllGroups} from "../controllers/group.controllers.js"



 const router=express.Router();

router.post('/',protectedRoute,createGroup);

router.get('/',protectedRoute,getAllGroups); 

/* router.post('/',protectedRoute,createGroup);

router.post('/',protectedRoute,createGroup); */



export default router
