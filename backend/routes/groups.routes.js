import express from "express";
import protectedRoute from '../middleware/auth.middleware.js';

import  {getGroupsMessages, messageGroup} from "../controllers/groupmessage.controllers.js";

import {createGroup, getAllGroups} from "../controllers/group.controllers.js"



 const router=express.Router();

router.post('/',protectedRoute,createGroup);

router.get('/',protectedRoute,getAllGroups); 

 router.post('/message/:groupId',protectedRoute,messageGroup);
 router.get('/message/:groupId',protectedRoute,getGroupsMessages);

/* router.post('/',protectedRoute,createGroup);  */

export default router
