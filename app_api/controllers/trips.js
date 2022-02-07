const async = require('hbs/lib/async');
const mongoose = require('mongoose');
const model = mongoose.model('trips');

const tripsList = async (req, res) =>{
    model   
        .find({'code': req.params.tripCode})
        .exec((err, trips) => {
            if(!trips){
                return res
                .status(404)
                .json({"message": "trip not found" });
            } else if (err) {
                return res
                .status(404)
                .json(err);
            } else{
                return res
                .status(200)
                .json(trips);
            } 
        });
};

module.exports = {
    tripsList,
    tripsFindCode
    




};