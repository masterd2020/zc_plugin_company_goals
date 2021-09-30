const { v4: uuidv4 } = require('uuid');
const {
  find,
  findAll,
  findById,
  insertOne,
  insertMany,
  deleteOne,
  updateOne,
  deleteMany,
} = require('../db/databaseHelper');
const { goalSchema, likeGoalSchema, getGoalLikesSchema, targetSchema } = require('../schemas');
const catchAsync = require('../utils/catchAsync');
const logger = require('../utils/logger');

exports.getChartInfo = catchAsync( async (req, res, next) => {
    const {org_id: orgId} = req.query;
    
    if (!orgId) {
        logger.info(`Can't get goals for null organisation id... Exiting...`);
        return res.status(400).send({ error: 'org_id is required' });
    }

    try{
        const goalsData = await findAll('goals', orgId);
        
        const allGoals = goalsData.data.data;
        const result = {totalGoals: allGoals.length};
        const {totalGoals, isComplete, isExpired, InProgress} = result;
        let isInComplete  = 0; let isNotExpired = 0;

       allGoals.forEach((goal)=>{
   
            if(!goal.isComplete){
                isInComplete > 0 ? isInComplete++ : isInComplete = 1            

               result['isComplete'] = totalGoals - isInComplete
            }


            if(!goal.isExpired){
                isNotExpired > 0 ? isNotExpired++ : isNotExpired = 1
  
              result['isExpired'] = totalGoals - isNotExpired
            } 

            
            if(goal.start_date){
                result['inProgress'] >= 0 ?  result['inProgress']++ : result['inProgress'] = 1
            } 
        })

        res.status(200).json({message: 'success',  data: result});
    }

    catch(error){
        console.log(error);
        res.status(500).json({message: 'failed, Server Error',  data: null})
    }
})

















