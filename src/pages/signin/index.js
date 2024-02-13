import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SAlert from "../../components/Alert";
import SForm from "./form";
import axios from "axios";

function PageSignin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState({
    type: "",
    status: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const res = await axios("https://localhost:9000/api/v1/cms/signin", form);

    if (res?.data?.data) {
      console.log(res?.data?.data);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setAlert({ status: true, message: res?.response?.data?.msg ?? "Internal server error", type: "danger" });
    }
  };

  return (
    <Container md={12} className="my-5">
      <div className="m-auto" style={{ width: "50%" }}>
        {alert.status && <SAlert type={alert.type} message={alert.message} />}
      </div>
      <Card style={{ width: "50%" }} className="m-auto mt-5">
        <Card.Body>
          <Card.Title className="text-center">Form Signin</Card.Title>
          <SForm form={form} handleChange={handleChange} isLoading={isLoading} handleSubmit={handleSubmit} />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PageSignin;
