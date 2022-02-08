const express= require('express'); 
const router= express.Router();
 const Task= require('../models/task'); 
 // getting all 
  router.get('/', async(req,res) =>{ 
    try{ 
      const tasks = await Task.find();
       res.json(tasks);
     }catch (err)
     { res.json({message:err}); 
     } 
   });

 // getting 
 
 router.get("/:uid", async (req, res) => {
  try {
    const task = await Task.find({uid:req.params.uid})
    ;
    res.json(task);
  } catch (err) {
    res.json({ message: err });
  }
});



 

 // creating 

 router.post('/',(req,res)=>{ 
     const task =new Task({
                taskname:req.body.taskname,
                taskid:req.body.taskid,
                taskdescription:req.body.taskdescription,
                uid:req.body.uid,
                files:req.body.files,
                leader:req.body.leader,
                associate:req.body.associate,
                status:req.body.status,
                approval:req.body.approval

                  });
                   task.save(). then(data =>{ res.json(data); }).catch (err=>{ res.json({message:err}); }) }); 

 // deleting 

 router.delete('/:taskid', async(req,res) =>{ 
   try{
      const removepost = await Task.deleteOne({taskid: req.params.taskid});
       res.json(removepost); }
       catch(err){ res.json({message:err});
       }
       } ); 

//updating a custumer by id

    router.patch("/:taskid", async (req, res) => {
    try {
      const task= await Task.findOne({ _id: req.params.taskid });
      console.log("user done",task)
    
      if (req.body.status) {
        task.status= req.body.status;
      }
      
      await task.save((err)=>{if(err){console.log("err",err)}});
      res.json(task);
    } catch (err) {
      res.json({ message: err });
    }
  });
  

 module.exports= router;