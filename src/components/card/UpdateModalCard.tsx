/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Modal } from "antd";
import styled from "styled-components";

import { toast } from "sonner";
import { TContact } from "../../redux/features/contacts/contactsSlice";
import { useUpdateContactMutation } from "../../redux/features/contacts/contactsApi";
import Error from "../../ui/Error";
import Loading from "../../ui/Loading";
import Success from "../../ui/Success";
import axios from "axios";

const UpdateModalCard: React.FC<{ contact: TContact }> = ({ contact }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  //   const [modalText, setModalText] = useState("Content of the modal");
  const [updateContact, { isLoading, isError, isSuccess }] =
    useUpdateContactMutation();

  const {
    name: initialName,
    email: initialEmail,
    phoneNumber: initialPhoneNumber,
    address: initialAddress,
    profilePicture: initialProfilePicture,
  } = contact;

  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
  const [address, setAddress] = useState(initialAddress);
  const [profilePicture, setProfilePicture] = useState(initialProfilePicture);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);

    setConfirmLoading(false);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const uploadImage = async (imageFile: any) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_KEY}`,
        formData
      );

      return response.data.data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleImageUpload = async (imageFile: any) => {
    try {
      const imageUrl = await uploadImage(imageFile);
      setProfilePicture(imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image");
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const imageUrl = await uploadImage(profilePicture);

      await updateContact({
        contactId: contact._id,
        contactsData: {
          name,
          email,
          phoneNumber,
          address,
          profilePicture: imageUrl,
        },
      });

      toast("Contact details updated successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error updating contact:", error);
      toast("Error updating contact");
    }
  };

  return (
    <>
      <div onClick={showModal}>Update</div>
      <Modal
        title="Update Contact"
        visible={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <FormContainer>
          <h2>Update Contact {contact._id}</h2>
          <Form onSubmit={handleUpdateSubmit}>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Phone Number</Label>
              <Input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Address</Label>
              <Input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Profile Picture</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleImageUpload(file);
                  }
                }}
              />
            </FormGroup>
            <Button type="submit">Update</Button>
          </Form>
          {isError && <Error status="Error" message="Error updating contact" />}
          {isLoading && <Loading />}
          {isSuccess && <Success status="Success" message="Contact updated" />}
        </FormContainer>
      </Modal>
    </>
  );
};

export default UpdateModalCard;

// const ModalButton = styled.button`
//   background-color: #4caf50;
//   color: #fff;
// `;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  width: 300px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #4caf50;
  color: #fff;
`;
