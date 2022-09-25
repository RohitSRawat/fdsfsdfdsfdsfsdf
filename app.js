const express = require("express");
const app = express();
const cors = require("cors");
const imageToBase64 = require("image-to-base64");
const multer = require("multer");
const pdfKit = require('pdfkit');
const path = require('path')
const port = process.env.PORT||8080
const sharp = require('sharp')

const memory = multer.memoryStorage();
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const uploadmemory = multer({
  storage: memory,
  fileFilter: (req, file, cb) => {
    console.log(file);
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" 
     
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log;
    cb(null, './image')

  },
  filename: function (req, file, cb) {

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "." + file.mimetype.split("/")[1]);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log(file);
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "video/mp4"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});






if(process.env.NODE_ENV === 'production'){
    app.use(express.static('build'))
app.get('*',(req,res) => {
        req.sendFile(path.resolve(__dirname,"build",'index.html'))
    })
    
app.post("/fetchimage", uploadmemory.single("Image"), async (req, res) => {
  try {

       const a = await sharp(req.file.buffer).resize({
        height:300,
        width: 300
    })
    .jpeg({ quality: 100 })
    .toBuffer()
     console.log(a)
console.log(req.file.buffer)
  // .pipe(roundedCornerResizer)
  // .pipe(writableStream)
    const base64data = Buffer.from(a).toString("base64");
    res.status(201).send("data:image/jpeg;base64," + base64data);

  } catch (error) {
    res.status(400).send(error);
  }
});



app.post("/fetchs", uploadmemory.fields([{
  name: 'driver', maxCount: 1
}, {
  name: 'car', maxCount: 1
},{
  name: 'license', maxCount: 1
}]),async (req, res) => {
  try {

    const driver = await sharp(req.files.driver[0].buffer).resize({
      height:300,
      width: 300
  })
  .jpeg({ quality: 100 })
  .toBuffer()
  console.log(driver)

  const model = await sharp(req.files.car[0].buffer).resize({
    height:300,
    width: 300
})
.jpeg({ quality: 100 })
.toBuffer()

const license = await sharp(req.files.license[0].buffer).resize({
  height:300,
  width: 300
})
.jpeg({ quality: 100 })
.toBuffer()

let fontNormal = 'Helvetica';
let fontBold = 'Helvetica-Bold';
let driverdata = req.body
console.log(driverdata)
   //(1190.55 x 1683.78)
      let pdfDoc = new pdfKit({ size: [1100,600], bufferPages: true});
      var date = new Date().getTime()  

      let buffers = [];
      pdfDoc.on('data', buffers.push.bind(buffers));
      pdfDoc.on('end', () => {

        let pdfData = Buffer.concat(buffers);
        res.writeHead(200, {
              'Content-Length': Buffer.byteLength(pdfData),
              'Content-Type': 'application/pdf',
              'Content-disposition': 'attachment;filename=test.pdf',
           }).end(pdfData);
           
        

     });
      // pdfDoc.pipe(fs.createWriteStream(`${date}.pdf`));

      pdfDoc.font(fontBold).fontSize(20).text('Driver information',5,5, { width: 1100,align: "center" });
      pdfDoc.rect(30, 30, 1020, 500).stroke();


      pdfDoc.font('Helvetica').fontSize(16).text('DRIVER PHOTO', 40, 40,{ align: "center", width: 300 });

      pdfDoc.image(driver, 40, 60, {width: 300, height: 300 ,fit: [300, 300], align: 'center', valign: 'center'}
        );
      pdfDoc.font('Helvetica').fontSize(16).text('Goods and Pick Up Boy Photo', 380, 40,{ align: "center", width: 300 });

      pdfDoc.image(model
        , 380, 60, {width: 300, height: 300,fit: [300, 300], align: 'center', valign: 'center'}
        );
      pdfDoc.font('Helvetica').fontSize(16).text('LICENSE PHOTO', 720, 40,{ align: "center", width: 300 });

      pdfDoc.image(license
        , 720, 60, {width: 300, height: 300,fit: [300, 300], align: 'center', valign: 'center'});
      pdfDoc.font('Helvetica').fontSize(16).text('DATE:', 40, 400,{ align: "right", width: 440 });
      pdfDoc.font('Helvetica').fontSize(16).text('NAME:', 40, 430,{ align: "right", width: 440 });
      pdfDoc.font('Helvetica').fontSize(16).text('COURIER NAME:', 40, 460,{ align: "right", width: 440 });
      pdfDoc.font('Helvetica').fontSize(16).text(driverdata.date, 490, 400,{ align: "left", width: 490 });
      pdfDoc.font('Helvetica').fontSize(16).text(driverdata.name, 490, 430,{ align: "left", width: 490 });
      pdfDoc.font('Helvetica').fontSize(16).text(driverdata.couriername, 490, 460,{ align: "left", width: 490 });
      

      pdfDoc.end();
     


  } catch (error) {
console.log(error)
    res.status(400).send(error);
  }
});

}


app.listen(port, () => {
  console.log("server is on running in port " + port);
});
