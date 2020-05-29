/** 
 * Album controller
*/

const models = require('../models')

// Show all albums
const index = async (req, res) => {

    try{
        const all_albums = await new models.Album({}).fetchAll();
            res.send({
                status: 'success', data: {albums: all_albums}});
    
    } catch (error) {
        res.status(500).send({status: 'fail', message: "Sorry, server error"});

        throw error;
    }
};

//Show individual album
const show = async(req, res) => {

    try {
    const album = await new models.Album({ id: req.params.albumId}).fetch( {withRelated:'photos'});
        res.send({status: "success", data: {album,} });
    
    } catch (error) {
        res.status(500).send({status: 'fail', message: "Sorry, could not get album"});

        throw error;
    }
};

// Create new album
const store = async (req, res) => {

    if (!req.body.title) {
        res.send({status: "fail",data: {title: "title is required"}});
    };

    try {
        const album = new models.Album({title: req.body.title, user_id: req.body.user_id,
        });

        await album.save()
        res.send({status: "success", data: {album}});
    
    } catch (error) {
        res.status(405).send({status: 'fail', message: "Method not allowed."});

        throw error;
    };
};

// Add photo in an album 
const update = async (req, res) => {

    const album = new models.Album({ id: req.params.albumId })
    const photo = new models.Photo({ id: req.params.photoId })
    
    try {
        await album.fetch({withRelated: 'photos'})
        await photo.fetch({withRelated: 'albums'})
        await album.photos().attach(photo)
        res.send({status: "success",data: album});

    } catch {
        res.status(405).send({status: 'fail', message: "Method not allowed."});

        throw error;
    };
};


// Delete album
const destroy = async (req, res) => {

    try {
        const album = await new models.Album({ id: req.params.albumId }).fetch( {withRelated: 'photos'} );
        
        await album.photos().detach();
        await album.destroy();
    
        res.send({
        status: "success", data: {album},
        });
        
    } catch (error) {
        res.status(405).send({status: 'fail', message: "Method not allowed."});

        throw error;
    }
  };


module.exports = {
    index,
    show,
    store,
    update,
    destroy
}