/** 
 * Album controller
*/

const models = require('../models')


// Show all albums
const index = async (req, res) => {
    const all_albums = await new models.Album({}).fetchAll();

    res.send({
        status: 'success',
        data: {
            albums: all_albums
        }
    });
};

//Show individual album
const show = async(req, res) => {
    const album = await new models.Album({ id: req.params.albumId}).fetch( {withRelated:'photos'} );

    res.send({
        status: "success",
        data: {
            album,
        }
    });
};

// Create new album
const store = async (req, res) => {
    const album = new models.Album({
        title: req.body.title,
        user_id: req.body.user_id,
    });
    await album.save()
    res.send({
        status: "success",
        data: {
            album
        },
    })
};

// Delete album
const destroy = async (req, res) => {
    const album = await new models.Album({ id: req.params.albumId }).fetch( {withRelated: 'photos'} );
    
    await album.photos().detach();
    await album.destroy();
  
    res.send({
      status: "success",
      data: {
        album,
      },
    });
  };


module.exports = {
    index,
    show,
    store,
    destroy
}