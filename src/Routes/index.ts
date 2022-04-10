import { Router } from 'express';
import LinkSchema from '../Schemas/Link'
const router = Router();

router.post('/create', async (req, res) => {

    const link = req.body.link;

    const digit = Math.floor(Math.random()*90000) + 10000;

    if (!link) {
        return res.send({
            success: false,
            data: { message: "No link", code: 400 }
        })
    }

    const doesExist = await LinkSchema.findOne({ 
        newLink: digit,
    })

    if (doesExist) {
        const digitAnother = Math.floor(Math.random() * 90000) + 10000;
        await new LinkSchema({
            newLink: digitAnother,
            oldLink: link,
        }).save()
        res.send({
            success: true,
            data: { message: "Created new Link", code: 200, digits: digitAnother }
        })
    } else {
        await new LinkSchema({
            newLink: digit,
            oldLink: link,
        }).save()
        res.send({
            success: true,
            data: { message: "Created new Link", code: 200, digits: digit }
        })
    }
})

router.get('/get/:digit', async (req, res) => {
    const digit = req.params.digit

    if (!digit) {
        return res.send({
            success: true,
            data: { code: 404, message: "No digits provided" }
        })
    }

    const doesExist = await LinkSchema.findOne({ newLink: digit })

    if (!doesExist) {
        return res.send({
            success: false,
            data: { message: "Link doesn't exist", code: 404 }
        })
    } else {
        return res.send({
            success: true,
            data: { code: 200, link: doesExist.oldLink  }
        })
    }
})

export default router;