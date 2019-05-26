const travelModel = require('../models/travelAgencyModel')


module.exports.addTravel = (req, res, next) => {
  const travel = {
    name: req.body.name,
    address: req.body.address,
    country: req.body.country,
    city: req.body.city,
    state: req.body.state,
    map: req.body.map,
    userId: req.params.userId
  }

  const travekObject = new travelModel(travel);
  travekObject.save()
    .then(save_res => {
      if (save_res[0].affectedRows) {
        return res.json({
          success: true,
          message: "travel agency was added correctly"
        });
      }
      return res.json({
        success: false,
        message: "try again"
      });
    })
    .catch(err => {
      res.status(504).json({
        success: false,
        message: "try again",
        err: err.message
      });
    });



}

module.exports.updateTravel = (req, res, next) => {
  const travel = {
    name: req.body.name,
    address: req.body.address,
    country: req.body.country,
    city: req.body.city,
    state: req.body.state,
    map: req.body.map,
    userId: req.body.userId
  }

  const travekObject = new travelModel(travel);
  travekObject.setId(req.params.id);
  travekObject.setStatus(req.body.status)
  travekObject.update()
    .then(save_res => {
      if (save_res[0].affectedRows) {
        return res.json({
          success: true,
          message: "travel agency was updated correctly"
        });
      }
      return res.json({
        success: false,
        message: "try again"
      });
    })
    .catch(err => {
      res.status(504).json({
        success: false,
        message: "try again",
        err: err.message
      });
    });


}

module.exports.deleteTravel = (req, res, next) => {
  travelModel.delete(req.params.id)
    .then(save_res => {
      if (save_res[0].affectedRows) {
        return res.json({
          success: true,
          message: "travel agency was deleted correctly"
        });
      }
      return res.json({
        success: false,
        message: "try again"
      });
    })
    .catch(err => {
      res.status(504).json({
        success: false,
        message: "try again",
        err: err.message
      });
    });
}

module.exports.changeStatus = (req, res, next) => {
  const id = req.params.id;
  travelModel.changeStatus(id)
    .then(save_res => {
      if (save_res[0].affectedRows) {
        return res.json({
          success: true,
          message: "travel agency was changed correctly"
        });
      }
      return res.json({
        success: false,
        message: "try again"
      });
    })
    .catch(err => {
      res.status(504).json({
        success: false,
        message: "try again",
        err: err.message
      });
    });
}

module.exports.getAllTravel = (req, res, next) => {
  travelModel.getAllTravle()
  .then(result => {
    console.log(result);
    if (!result) {
      return res.json({
        status: 404,
        data: 'Data Not found'
      });
    }
    res.json({
      status: 200,
      data: result[0]
    });
  })
    .catch(err => {
      res.json({
        status: 500,
        data: 'Internal error server'
      })
    })

}

module.exports.getAllTravelByStatus = (req, res, next) => {
  travelModel.getAllTravleByStatus(req.params.stat)
  .then(result => {
    console.log(result);
    if (!result) {
      return res.json({
        status: 404,
        data: 'Data Not found'
      });
    }
    res.json({
      status: 200,
      data: result[0]
    });
  })
    .catch(err => {
      res.json({
        status: 500,
        data: 'Internal error server'
      })
    })

}