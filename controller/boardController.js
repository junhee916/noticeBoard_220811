const boardModel = require('../model/board')
const boardController = {}

boardController.getAll = async (req, res) => {
    if(res.locals.user){
        try{
            const boards = await boardModel.find()  
                                            .populate('user', ['email'])
            res.status(200).json({
                msg : "get boards",
                count : boards.length,
                boardsData : boards
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
boardController.get = async (req, res) => {
    const id = req.params.boardId
    if(res.locals.user){
        try{
            const board = await boardModel.findById(id)
            if(!board){
                return res.status(403).json({
                    msg : "not boardId"
                })
            }
            else{
                res.status(200).json({
                    msg : "get board",
                    boardData : board
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

}
boardController.save = async(req, res) => {
    const createBoard = new boardModel({
        user : res.locals.user.id,
        board : req.body.board
    })
    if(res.locals.user){
        try{
            const board = await createBoard.save()
            res.status(200).json({
                msg : "save board",
                boardData : board
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
boardController.update = async (req, res) => {
    const id = req.params.boardId
    if(res.locals.user){
        try{
            const board = await boardModel.findByIdAndUpdate(id, {$set : {
                user : res.locals.user.id,
                board : req.body.board
            }})
            if(!board){
                return res.status(403).json({
                    msg : "not boardId"
                })
            }
            else{
                res.status(200).json({
                    msg : "update board by id: " + id
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
boardController.deleteAll = async (req, res) => {
    if(res.locals.user){
        try{
            await boardModel.remove()
            res.status(200).json({
                msg : 'delete boards'
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
boardController.delete = async (req, res) => {
    const id = req.params.boardId
    if(res.locals.user){
        try{
            const board = await boardModel.findByIdAndRemove(id)
            if(!board){
                return res.status(403).json({
                    msg : "not boardId"
                })
            }
            else{
                res.status(200).json({
                    msg : "delete board by id: " + id
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

module.exports = boardController