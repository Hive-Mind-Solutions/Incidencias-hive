import React, { useState } from "react";
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  Spin,
  Alert,
  Upload,
  Modal,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

function TicketForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const resetForm = () => {
    setSubmitted(false);
    setError(false);
    setFileList([]);
  };

  const onFinish = (values) => {
    // Crear una nueva instancia de FormData
    const formData = new FormData();

    // Añadir los valores del formulario a formData
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    // Añadir los archivos a formData
    fileList.forEach((file) => {
      formData.append("files", file.originFileObj);
    });

    // Llamar a submitTicket con formData como argumento
    submitTicket(formData);
  };

  // Agrega una función para manejar la vuelta al formulario después de éxito
  const handleReturnToForm = () => {
    resetForm();
    setSubmitted(false); // Agrega esto para asegurarte de que el formulario se muestre nuevamente
  };

  const submitTicket = async (formData) => {
    // Cambiar 'values' por 'formData'
    setLoading(true);
    try {
      await axios.post("http://127.0.0.1:5000/api/v1/tickets/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      setSubmitted(true);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error("Error sending the form:", error);
    }
  };

  return (
    <Card className="animate__animated animate__fadeIn">
      <Row justify="center">
        <Col xl={24} lg={18} md={20} sm={22} xs={24}>
          {" "}
          {loading ? (
            <Spin />
          ) : submitted ? (
            <>
              <Alert
                message="¡Solicitud de asistencia creada correctamente!"
                type="success"
              />
              <br />
              <Button
                onClick={handleReturnToForm} // Usa handleReturnToForm en lugar de resetForm
                type="primary"
                className="primary-button"
              >
                Enviar otra solicitud
              </Button>
            </>
          ) : error ? (
            <>
              <Alert message="Error al generar la solicitud" type="error" />
              <br />
              <Button
                onClick={resetForm}
                type="primary"
                className="primary-button"
              >
                Volver atrás
              </Button>
            </>
          ) : (
            <Form onFinish={onFinish} className="form-ticket">
              <Form.Item
                label="Email"
                name="email" // Esto es importante para recoger los valores
                rules={[
                  { required: true, message: "Por favor, rellena tu email" },
                ]} // Añade reglas de validación
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                label="Nombre"
                name="nombre"
                rules={[
                  { required: true, message: "Por favor, rellena tu nombre" },
                ]}
              >
                <Input placeholder="Nombre" />
              </Form.Item>
              <Form.Item
                label="Centro"
                name="centro"
                rules={[
                  {
                    required: true,
                    message: "Por favor, rellena el centro",
                  },
                ]}
              >
                <Select defaultValue="Elige un centro">
                  <Option value="Santa Eulalia">Santa Eulalia</Option>
                  <Option value="San Miguel">San Miguel</Option>
                  <Option value="San Juan">San Juan</Option>
                  <Option value="Virgen de Valencia">Virgen de Valencia</Option>
                  <Option value="Oficina">Oficina</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Aplicación"
                name="aplicacion"
                rules={[
                  {
                    required: true,
                    message: "Por favor, rellena la aplicación",
                  },
                ]}
              >
                <Select defaultValue="Elige una aplicación">
                  <Option value="Espacio Dependencia">
                    Espacio Dependencia
                  </Option>
                  <Option value="LEAP">LEAP</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Tipo"
                name="tipo"
                rules={[
                  { required: true, message: "Por favor, rellena el tipo" },
                ]}
              >
                <Select defaultValue="Elige el tipo de solicitud">
                  <Option value="Incidencia">Incidencia</Option>
                  <Option value="Consulta">Consulta</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Criticidad"
                name="criticidad"
                rules={[
                  {
                    required: true,
                    message: "Por favor, rellena la criticidad",
                  },
                ]}
              >
                <Select defaultValue="Elige una criticidad">
                  <Option value="🟩 Baja"> 🟩 Baja </Option>
                  <Option value="🟨 Media">🟨 Media</Option>
                  <Option value="🟥 Alta">🟥 Alta</Option>
                  <Option value="🔥 Crítica">🔥 Crítica</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Descripción"
                name="descripcion"
                rules={[
                  {
                    required: true,
                    message: "Por favor, rellena la descripción",
                  },
                ]}
              >
                <Input.TextArea placeholder="Descripción" rows={4} />
              </Form.Item>

              <Form.Item label="Imagen" name="imagePaths">
                <Upload
                  action={() => false}
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 1 ? null : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Subir</div>
                    </div>
                  )}
                </Upload>

                <Modal
                  visible={previewVisible}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage}
                  />
                </Modal>
              </Form.Item>
              <Form.Item wrapperCol={{ span: 24 }}>
                <Button
                  className="primary-button"
                  type="primary"
                  htmlType="submit"
                >
                  Enviar
                </Button>
              </Form.Item>
            </Form>
          )}
        </Col>
      </Row>
    </Card>
  );
}

export default TicketForm;
