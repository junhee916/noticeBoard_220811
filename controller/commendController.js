const commendModel = require('../model/commend')
const commendController = {}

commendController.get = async (req, res) => {
    const id = req.params.commendId
    if(res.locals.user){
        try{
            const commend = await commendModel.findById()
                                                .populate('user', ['email'])
                                                .populate('board', ['board'])
            if(!commend){
                return res.status(403).json({
                    msg : "not commendId",
                })
            }
            else{
                res.status(200).json({
                    msg : "get commend",
                    commendData :commend
                })
            }
        }
        catch(err){
            res.status(500).json({
                msg : err.message
            })
        }
    }
    else{
        return res.status(402).json({
            msg : "not token"
        })
    }

};
commendController.save = async (req, res) => {
    const createCommend = new commendModel({
        user : res.locals.user.id,
        board : req.body.board,
        commend : req.body.commend
    })
    if(res.locals.user){
        try{
            const commend = await createCommend.save()
            res.status(200).json({
                msg : "save commend",
                commendData : commend
            })
        }
        catch(err){
            res.status(500).json({
                msg : err.message
            })
        }
    }
    else{
        return res.status(402).json({
            msg : "not token"
        })
    }

};
commendController.update = async (req, res) => {
    const id = req.params.commendId
    if(res.locals.user){
        try{
            const board = await commendModel.findByIdAndUpdate(id, {$set : {
                user : res.locals.user.id,
                board : req.body.board,
                commend : req.body.commend
            }})
            if(!board){
                return res.status(403).json({
                    msg : "not commendId"
                })
            }
            else{
                res.status(200).json({
                    msg : "update commend by id: " + id
                })
            }
        }
        catch(err){
            res.status(500).json({
                msg : err.message
            })
        }
    }
    else{
        res.status(402).json({
            msg : "not token"
        })
    }

};
commendController.delete = async (req, res) => {
    const id = req.params.commendId
    if(res.locals.user){
        try{
            const commend = await commendModel.findByIdAndRemove(id)
            if(!commend){
                return res.status(403).json({
                    msg : "not commendId"
                })
            }
            else{
                return res.status(200).json({
                    msg : "delete commend by id: " + id
                })
            }
        }   
        catch(err){
            res.status(500).json({
                msg : err.message
            })
        }
    }
    else{
        return res.status(402).json({
            msg : "not token"
        })
    }

};

module.exports = commendController