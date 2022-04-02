const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;
const Comment = db.comments;
// Create and Save a new Tutorial

exports.create = (req, res ) => {
    console.log(req.body)

      const tutorial = {
        userId : req.auth.userId,
        name : req.body.name,
        imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,
        description: req.body.description,
        published: req.body.published ? req.body.published : false,
      }; 
      
    
      // Save Tutorial in the database
      Tutorial.create(tutorial )
    
        .then(response => {
          const post = response.get({ plain: true })
          post.comments = []
          console.log(post)
          res.send(post)
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Une erreur est survenue lors de la création du tutoriel."
          })
        })
    }

// Retrieve all Tutorials from the database.

exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  Tutorial.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Find a single Tutorial with an id

exports.findOne = (req, res) => {
  const id = req.params.id;
  Tutorial.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id,
      });
    });
};

// Update a Tutorial by the id in the request

exports.update = (req, res) => {
  const id = req.params.id;
  Tutorial.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request

exports.delete = (req, res) => {
  const id = req.params.id;
  Tutorial.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id,
      });
    });
};
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
};

// Find all published Tutorials


exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ raw: true, where: { published: true }, include: ['user'] })
    .then(tutos => {
      Comment.findAll().then(comments => {
        const tutosWithComments = tutos.map(tuto => {
          console.log(tuto)
          tuto.comments = [];
          comments.forEach(comment => {
            if (comment.tutorialId === tuto.id) {
              tuto.comments.push(comment);
            }
          })
          return tuto;
        })
        //console.log(tutosWithComments);
        res.send(tutosWithComments);
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue lors de la récupération des tutoriels publiés"
      })
    })
}

exports.createComment = (req, res) => {

  const comment = {
    name: req.body.name,
    text: req.body.text,
    tutorialId: req.body.tutorialId,
    userId: req.auth.userId
  };
  console.log(comment);
  Comment.create(comment)
    .then((data) => {
      console.log(">> Created comment: " + JSON.stringify(data, null, 4))
      res.send(data)
    })
    .catch((err) => {
      console.log(">> Error while creating comment: ", err)
    })
};

exports.deleteComment = (req, res) => {
  const id = req.params.id;
  const commentId = req.params.commentId;
  Comment.findByPk(commentId).then(comment => {
    if (req.auth.userId === comment.userId || req.auth.isAdmin === true) {
      Comment.destroy({
        where: { id: commentId, tutorialId: id }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "Commentaire supprimé avec succès"
            })

          } else {
            res.send({
              message: `Aucun commentaire trouvé avec l'id ${commentId}`
            })
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Erreur lors de la suppression du commentaire avec l'id " + commentId
          })
        })
    }
  })


}