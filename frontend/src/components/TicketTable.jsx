import React, { useState, useEffect } from "react";
import { Table, Input, Button, Space, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";

const TicketTable = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/v1/tickets/"
        );
        setTickets(response.data.data.tickets);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchTickets();
  }, []);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Resetear
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };

  const handleReset = (clearFilters) => {
    clearFilters();
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      ...getColumnSearchProps("email"),
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      sorter: (a, b) => a.nombre.localeCompare(b.nombre),
      ...getColumnSearchProps("nombre"),
    },
    {
      title: "Centro",
      dataIndex: "centro",
      key: "centro",
      sorter: (a, b) => a.centro.localeCompare(b.centro),
      ...getColumnSearchProps("centro"),
    },
    {
      title: "Aplicación",
      dataIndex: "aplicacion",
      key: "aplicacion",
      sorter: (a, b) => a.aplicacion.localeCompare(b.aplicacion),
      ...getColumnSearchProps("aplicacion"),
    },
    {
      title: "Tipo",
      dataIndex: "tipo",
      key: "tipo",
      sorter: (a, b) => a.tipo.localeCompare(b.tipo),
      ...getColumnSearchProps("tipo"),
    },
    {
      title: "Criticidad",
      dataIndex: "criticidad",
      key: "criticidad",
      sorter: (a, b) => a.criticidad.localeCompare(b.criticidad),
      ...getColumnSearchProps("criticidad"),
    },
  ];

  return (
    <>
      {" "}
      <h1>Listado de incidencias</h1>
      <Card>
        <Table columns={columns} dataSource={tickets} rowKey="_id" />;
      </Card>
    </>
  );
};

export default TicketTable;
