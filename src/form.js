import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import formapi from './api'
import $ from 'jquery'
import "./style.css";

class form extends Component {
    constructor(props) {
        super(props);
        this.driverref = React.createRef();
        this.vehicleref = React.createRef();
        this.licenseref = React.createRef();

      }
  imgsrcbase64 = () => {
    return "data:image/jpeg;base64,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LDDLPHPLDDLHDPPPPPHPPLLDCwcNtssuvskgstowg7DPPPPPPPPHDLDLLLPHPDKGM4kgokggogkgsggogIibPHHPLHHPPPPPPONPPAvQggggglgggwkggggggghxfPPPPPPPPHDHHDHDAxvuvvvvvoWbb7ONevvvvvvmCTHPHHHLPPNMMMNMLTjjjjjjgxp//wC588w8444445gHCxRSDDzzzzzzwgIIIIIIIfmoFfv/APb9GCCCCCCCE88888880A4cITjCCiiSCGC3w/db/ZbzchiiSCCCTJ88880888888VOOOeOeOeY+M86+aPpfuNOuOuOeOP8APPPPMPPPPBKAiggggggjT4z/ADAYMPpwoIIIoIYIpDzzzzzzzzyg464655Y4YoQNLIPnJIIo655o66545fzzzzzzzjQMIIIIIIIIILYs4UMk8MjsAIIIIIIIJXTzzzxwwwGv7K777r77alw8m08548zLSr7b7qLaKOowyzzjTyT777777r776+oscHykcMW/7777777777HTTzzzzyJIIIqKqIIIIZmAcRWgsNNYYJIKIKIooJrzzzxBgxRJ7ab56rbaprxIGX7uMZB77r747KLLLaPzzzzzzxQYIIIIoIIIIoILMHAMXkIIIIIYIoIIIIjzzzwwyxQYIIIIIIIIIo4ZTTjwAIoIIYYI4IoIYIJzxzzzzwkQYoYIYo44IIoo4b+8Q4Io4YIoYIIIIr/zzzzzzzyEKIJJIJIIKIt//r/6TmFAKrIKIIIIIZzzzzzzzzwEIY4Y4IYVd57/AP8A/wDz/wD/APnghhhgiggmfPPPPPPPPCMwpssssJvf/wD/AP8A/wD/AP8A/wD/APsbyyCCCCJ8888888888CCCSCybz+//AP8A/wD/AP8A/wD/AP8An8kKIIIIIzzzzzxRRDTweDL7a53Lb/8A/wD/AP8A/wD/AP8A/wCNuIugogoJBHNDPPPPPPHIEostfD1P/wD/AP8A/wD/AP8A/wD/AIf+byCCac8888884w0040RX+y0/d4//AP8A/wD/AP8A/wD/AP1t/wDHbbGLTzTzTTDzzxzzywVjKP8A7W//AP8A/wD/AP8A/wD/AP69P7ctL/PPPPPPPHLDPDHHHAUBffKdP/8A/wD/AP8A/wD/AP21/Q6Q7PLLLHHDPPLPPPPPPLARIzbl/wD/AP8A/wD/AP8A/wDqUIMrLzzzzzzzzzzzzzzzzzzzzwB5FX7/AP8A/wD/AP8A/wC7RTnzzzzzzzzzzzzzzzzzzzzzzzziOHvn/wD/AP8A/wCypRc8888888888888888c88888888888sDjhyUQyc88888888s88888888888888888888888888888888888888888888888MMMMMMMsMMMMMMMMMMMMsMsMMMsscMMMMMMMMMMM8888cc88888s88888888888888888888888888888Ac88888gc8g88c8888888gg8888gc8888g8888A/8QAJhEBAAIBBAEEAgMBAAAAAAAAAQARMRAhMEEgQFFhcYGxcKHB8P/aAAgBAwEBPxD+CFDMyAiWjDRghBHHrzrVQGxuY1qZB5YRnc3BwZlXqi7U2zYRFa5BRsmx7yBWvTn3GOWvQIrJd+2CJZ6MBbE9n5qroa08SFOIZ6EAWx10cAoyW5uytmPJ8Wkne/xHaOD41AHoC518CW4fpCiglPjvTMS3OBqHDBBZzV+x4AtqGDKwRj7YiZ1rTIBDaef+Nyi6jouCoPvpeUxoM0ViutWK/s8xRslK98m0MHC6kTb5kcxO0+qL2mQmC2i3ISQrb4NkcPGarqIld8PxQyu0T2WBgy0pywfa5mDcZbHbtw/MpuJSD3xb3zGlKSiBlFOpi2mNQLqDhLrQ9fc8VSfFdHtxe+ihGh3IBs0AWgGzRGxhgbJBZOG9cK0Sw4h+/Wp2CAroRwgK6MoXSCKy8VTwLh8cf/OmIoUmpvKIKxr8UyxCuNQcCrkC6D9olaDNXKe8yEGaaGQz+nIr/P0mRmQhp6Z02BsxFqpehiJ12Iq/B9cmf74DfKGoXx37IlS9Hj0EwAPKK/LgoXxzI263/qZ1EBvDmoHAllS4HlYPYvS5crQw/vm+qOG2+ePKM9hF6LWZvGaLloIYfsPv9RSOy467iXAeABbDjKPhaoPxK5R/ERtX9eGAY8CLOCxvriuISmnyAW6Yt1yu7IJs86UcvHsfD5YIFtwbjyWK0q8iiOjkBVEVPjY6A2HkMCkSofH4mUy8tv8Ad4KhY776B5A3XWqHw9uDmQSmJYYdXWlZIbfINr1ndNal1DIegwfGtFsGjqDa5BUvQ8PSYAAEHbMSpF2MVIzMSmuMUI7VgsJkuZsrHpACAplX6YABxkjN7fywUou/8hp8RD52VFL/AHYNCW9TrQhvphu+m1bGP+z/ACXtOI2I6/JNpu2fED1RIdZkKGhmfPOzKhKjfZ6/EjN6hT3nyv8A34gXbPcH5mAP4y//xAAmEQEAAgICAgMAAgMBAQAAAAABABEwMRAhIEFAUWFxsXCB0aHB/9oACAECAQE/EP8ABFQ1iD+p+UR9RDZET57NCM2qequaQ8kdEnrqjm81z5SFCE77wBRkQemd90Y30+O3qkE18AgUyuFVv4YK0Qfu+YCfbm8Qtm4ir4IFaIZt3gJnQnQGptGftNSz1CCbMBH9jv4BV92ATpb/AJjdb5MdamscBXG4lNOa36jAtFsV1wpIfaX4j0xWHz/+5lYBDIMFDcVtpuJwpleB6+aCUy3MlNvvCL4rVmhg+k/kg+kX1B77h0JUECisHf8Asx0QgADDckv3gfsIpslEt0T8+H0kq36wsuTFevpiuRRHwXTPQgHub9xuUU9xdpRWIvFHWHFS/uJ7eo91w9SI6eEVER08IrI2wDFYOG2MJKgxL9ePfBGsJgcCaxkOTG+4KAxWBgNJknmYbHxDfP7ZK97cdTwCzkavv+kG+Ey6l/qaSGdPCq9H95DWBryAEfcoftrjoXshRuJwTe9gmMmr+MCo5Vxz1N9MG+QR2zeBZV/4wKg5gqXqV9S2dsFiu7zO3gGmKwTL/PPC8fZmuXDW/mMTD7yojSalGK4rBbGRs9H/AGJ9RZjt8StcEF1D7wJ4B02RLdQDR4Idx+sRMFYHvFWwNlnkFtEAMqZUEqCmvO4cfetnkfcXVTTItcHq/LSbcinACzxNE2m1ZNY7ILPLV6MtfgHbXG0eQtcwprwpe5zDXZOid8m+A05Rd8w7vkrvcRW50YIZ/eD74Nwu8jgcNb4vTEsfBdwNp3LkEYllTUNY3agoqKG5f0QXvcQv4YU7J/3IXXfxAK/oRBu6qa470U3FCv6EsieoXssRW/GCF2Z3DR/rKunEqILX+p2WiD+3ykL94TrG6YOmCCjRudJp8/QPBAPqfmSz6i42q/xl/8QAKxAAAgIBAgYBBAMBAQEAAAAAAAERIYEQkSAxQVFhcaEwwdHwQLHh8VBg/9oACAEBAAE/EK1rWuCtK+vX0KK1rStK+lX8Kv4M6zrOkm3Dt9TbTbSTbXb6GxPDt/Gkn6M6TxyT9KdZ0nSeCSSSeCdJ0knWSeGf4E8d8F8V63rZel8dlll8F6WWWWXpZZZellll6WX/ADc/P0+v0p/8Ra5+dM/Omfn616X9Oyyyy9b0svWyyyyyy9LL0svWyy9LLLLLLLL+lel/QoooooooooooooogoooooooggooooooooojhoojigoorSiCiCiiCCiCiiiiiiiiiiiiiiiCiP/ClndDaQp+W+w+dVX9nXb3C+598v8jfon79Euz9+hK+bL1L7DHK+mn9z++8v6FVD0f9hJtI/wDw6KKKKK0ooooooooooooooorSiuDz9xoRLJneMLdnK6yHI4u34iZAc27Zubm5ubm5uR5ZubkxybRy3pck5LbkR0UeVD3VfBCJz1apvz+BHb84TvYrSita4aKKKKKKKKK0oooorSiv5anMSLm2SrWrpy78ieT9mkuPLGbukzb34LL0ssssssssssssTaaabUX5RBLInzz+SK5INP0+BNeHVp/mUUUUUUUUUVpRRRRRRRRRRRkoaF1zbQh04xVy2E+W87Qlj6tR11rTc34vLNGjcqSco4eURgvVdV7WlFFFFFFFFFFFFFFFFFFFFFaUY44II1gwQYMa4IIGSNskl1YlQXI7H5wSDK5Lkljivi2024scGDbgUF3ybR8kZCcobXtfgRW3ybSYI0ggwYMawY0gxpgwQYI0wVpWlaZKKKKK0oooooorT1oC2xsV1TKy+pkjzoiPJkyR50yR54M651jybGdI88GSPJnRfcbquaftD9pNpJ/A9a0ooorSitKKKKKK0ooogggggjSNII0jgjVtJS+XklAuS2tL0uozuNcttO7MGDBgwYMGDBgwYMGDBgwYMGDBgwYMGDBgwYMGDBgwOl23zfkEkX2miOLBGsEax9CiiiiiiiiiiiiitUpVrYmmvkxyft4+rKHDdZpp1QnD+WuHOmdc/Uzpks8d28n/AKTTpTeftpRRRRRRRRRRRWlFFFFcdcVaUVo8Rk5Lq32RKGhdDpeyyzBZZZgvsWWWWWIY1JDbbcKFzljp81W+ipTS9j9ssssssssswWWWWWWWbFlllllllj+i9n7XYgzr/wCq0rgrhrhor6NcdaMzvSXNvwNFTo8k8cD1f0Gz2VZcJLbGsoQxrm2Pb7EjnAGXT0n39D1LqSc73bYOWnXl806bJDJuK+aYrxBfA4lq+6f9jZNp0j/cZJq10dK/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FdlV9xggcOIo14IaWVdGjkeyxLLu9+4a/p/xfNjWHL+EWc/+rFBJLdKjl4vn8DL26YWF1FR9LfMx2LLLLL4L0svSyyy9b1vivS9b4L4r4EjeE2MauTWi9fgVpA06NNQ0+2kSK2n6aaf9o5B2v6E01Tmf4ckiv6EvlrTcocbQ5hiHjvsLlVXKUwKuXIvSy/4F8Mkkkkkkkkkkkkkkkkkkkkk8LdMEtUbiXR9C8MaM0LKqhu+XJPlo9qyLap/wldlQSXbXTIi2p/e3t/ohVy1selyzAoXLWSSSSSSSSSSSSSSSSSSSSSSSSCCCCCCCCCCCCCCCCCCCCCCCCCNVhJhNNNdmhu011m6diG/M1M9SiU35oYtqp2su7ljLEzNDqnUNe0I5PqvZc5P7uTdjdh+agcUEeptq78JXu2eLutH7jmQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQIgggggggggggggggggggggggggSeOlitx62/wDRNk218CD9FOiErH/qw2TX7u6oPXhD/bGvqwJf4mObK/opj9+70ZC4F9tDZNJ2X/dsvnvkX2DJlPkqvcsSSRBBBBBBBBBBBBBBBBBAiCCCCCCCCCCCCCSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSdZ0nSSdJ0nWSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSOCOCOKCNIII4oII444I0jSNI0jWOKNI0jSCNI1gjSCCCNYI0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggj/wCQkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkoooorStK0ooooooooooorStKKKKKKKKKKKKKKKKKKKKJKKKKKKKKKKKKKKK0ooooooooooooooooggggggggggggggggggggggggggggggggggggggggggggggggggggggggggjSNI0gggggjSCCCNII0YtFquR2ELTsPR6dDv6GdTrojpp+BctGdeBC06nQR0OunXT8addUddVotO/oZ0Gd9ELkdR6LkMevUevbT//Z";
  };

  change = async (e,element) => {


var formdData = new FormData();

formdData.append("Image", e.target.files[0]);

try {
  var res = await formapi.post("/fetchimage", formdData);
  element.src = res.data;
} catch (error) {
  console.log(error);
}
  }
  printDocument = () => {
    const input = document.querySelector('.rowlist');


}
 
  render() {
    return (
      <section>
       <form id='formdata' onSubmit={async (e) => {
e.preventDefault()
try {
    var dataf = new FormData(e.target);
    fetch(`${window.location.origin}/fetchs`,{
      body: dataf,
      method: 'POST'
    }).then((res) => res.blob()).then((blob) => {
      let blobUrl = window.URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.download ="image.pdf";
              
          a.href = blobUrl;
          document.body.appendChild(a);
          a.click();
        a.remove(); 
      })
   
} catch (error) {
    console.log(error)

}
this.printDocument()
       }}>
       <Container>
          <Row >
            <Col>
              <h1  className="headliss" style={  {
  textAlign: "center",
  color: "rebeccapurple",
  fontSize: "40px"
}}>Please, enter Driver information</h1>
            </Col>
          </Row>
          <Row className="rowlist">
            <Col className="imagelist"  md={12}>
              <div className="driverinfo">
                <p>Driver Photo</p>
                <img ref={this.driverref} src={this.imgsrcbase64()} />
                <input  onChange={(e) => {
                    this.change(e,this.driverref.current)
                }}  name="driver" type="file" />
              </div>
              <div className="driverinfo">
                <p>Goods & Pickup Boy</p>
                <img  ref={this.vehicleref}  src={this.imgsrcbase64()} />
                <input  onChange={(e) => {
                    this.change(e,this.vehicleref.current)
                }}  name="car" type="file" />
              </div>
              <div className="driverinfo">
                <p>license Photo</p>
                <img ref={this.licenseref} src={this.imgsrcbase64()} />
                <input onChange={(e) => {
                    this.change(e,this.licenseref.current)
                }}  name="license" type="file" />
              </div>
            </Col>
            <Col md={8} >
              <div className="check">
                <p>NAME</p>
                <input name="name" type="text" />
              </div>
              <div className="check">
                <p>COURIER NAME </p>
                <input name="couriername" type="text" />
              </div>
              
              <div className="check">
              <p>DATE</p>
                <input name="date" type="date" />
              </div>
              <div className="check">
              <button>
                SUBMIT
              </button>
              </div>
              
            </Col>
       
          </Row>
        </Container>
       </form>
      </section>
    );
  }
}
export default form;
