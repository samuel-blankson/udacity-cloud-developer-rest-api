import { Router, Request, Response } from 'express';
import { FeedItem } from '../models/FeedItem';
import { requireAuth } from '../../users/routes/auth.router';
import * as AWS from '../../../../aws';

const router: any = Router();
const feedItem: any = FeedItem

// Get all feed items
router.get('/', async (req: any, res: any) => {
    const items: any = await feedItem.findAndCountAll({ order: [['id', 'DESC']] })
        .catch((error: any) => {
            console.log("############## error error error error ################")
            console.log(error)
            return res.send(items);
        });
    items.rows.map((item: any) => {
        if (item.url) {
            item.url = AWS.getGetSignedUrl(item.url);
        }
    });
    res.send(items);
});

//@TODO
//Add an endpoint to GET a specific resource by Primary Key
router.get('/:id', async (req: any, res: any) => {
    let { id } = req.params;
    const item: any = await feedItem.findOne({ where: { 'id': id } })
        .catch((error: any) => {
            console.log("############## error error error error ################")
            console.log(error)
            return res.send(error);
        });
    if (item.url) {
        item.url = AWS.getGetSignedUrl(item.url);
    }
    res.status(200).send(item);
});

// update a specific resource
router.patch('/:id',
    requireAuth,
    async (req: any, res: any) => {
        //@TODO try it yourself
        let { id } = req.params;
        const caption = req.body.caption;
        const fileName = req.body.url;
        await feedItem.update({
            caption: caption,
            url: fileName
        },
        { where: { 'id': id } }).then((response:any)=>{
           return res.status(200).send(response)
        })
        .catch((error: any) => {
            console.log("############## error error error error ################")
            console.log(error)
            return res.status(500).send(error);
        });

        
    });


// Get a signed url to put a new item in the bucket
router.get('/signed-url/:fileName',
    requireAuth,
    async (req: any, res: any) => {
        let { fileName } = req.params;
        const url = AWS.getPutSignedUrl(fileName);
        res.status(201).send({ url: url });
    });

// Post meta data and the filename after a file is uploaded 
// NOTE the file name is they key name in the s3 bucket.
// body : {caption: string, fileName: string};
router.post('/',
    requireAuth,
    async (req: any, res: any) => {
        const caption = req.body.caption;
        const fileName = req.body.url;

        // check Caption is valid
        if (!caption) {
            return res.status(400).send({ message: 'Caption is required or malformed' });
        }

        // check Filename is valid
        if (!fileName) {
            return res.status(400).send({ message: 'File url is required' });
        }

        const item = await new FeedItem({
            caption: caption,
            url: fileName
        });

        const saved_item = await item.save();

        saved_item.url = AWS.getGetSignedUrl(saved_item.url);
        res.status(201).send(saved_item);
    });

export const FeedRouter: Router = router;