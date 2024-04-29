import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function AddModal({ showModal, handleClose, drName, addAppointment }) {
  //   const [showModal, setShow] = useState(false); //! Modalı resimlere tıklanıldğında açtırmak isteğidğim için show stateini resimlerin olduğu yerde manipüle edebilmem lazım. Eğer statei burada oluşturursam setShowu resimlerin olduğu üst componente gönderemem o nedenle Liting State Up yaparak show stateini resimlerin olduğu üst componente taşıdık.
  console.log("Appointments güncellendi Home Componenti render olduğu için Doctors Componenti render olduğu için AddModal render oldu.")
  // console.log("showModal güncellendi Doctors Componenti render olduğu için AddModal render oldu.")
  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);
  const [patientName, setPatientName] = useState("");
  const [date, setDate] = useState("");
  // console.log(crypto.randomUUID());
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ patientName, date, drName });
    // addAppointment({
    //   id: new Date().getTime(),
    //   patient: patientName,
    //   day: date,
    //   consulted: false,
    //   doctor: drName,
    // });

    addAppointment({
      id: crypto.randomUUID(),// crypto.randomUUID() metodu her çağırıldığında farklı, unique karakter dizisi dönüyor. Id değeri bize update-delete işlemleri için lazım olacak ve işimizi kolaylaştıracak.
      patient: patientName,
      day: date,
      consulted: false,//? default olarak false yapmış olduk
      doctor: drName,//! tıklanılan doktoru yukarıda yakalamıştık burada da kullanıyoruz.
    });
    setPatientName("")//! input alanlarını temizlemek için kullanılan fonksiyon
    setDate("")
    handleClose()//! işlem başarılı bittiğinde modalı kapatması için kullanılan fonksiyon
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose} size={"lg"}>
        <Modal.Header closeButton>
          <Modal.Title>Appointment for : {drName} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Patient Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter patient name"
                onChange={(e) => setPatientName(e.target.value)}
                value={patientName} //inputun içini yönetebilmek için value attributeını kullanıyoruz. Statei  güncellediğimizde inputun içi de statein değerini almış oluyor.
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="datetime-local"
                placeholder="Date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />
            </Form.Group>
            <div className="text-center">
              <Button variant="success" type="submit" className="me-2">
                Save
              </Button>
              <Button variant="danger" onClick={handleClose}>
                Close
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddModal;
