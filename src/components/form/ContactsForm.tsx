/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import styled from "styled-components";
import { useAddContactMutation } from "../../redux/features/contacts/contactsApi";
import Error from "../../ui/Error";
import { toast } from "sonner";
import Loading from "../../ui/Loading";
import Success from "../../ui/Success";
import axios from "axios";

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
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const FormImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
`;

const ContactsForm = () => {
  const [contactsData, { isLoading, isError, isSuccess }] =
    useAddContactMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

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
    } catch (error: any) {
      toast.error("Error uploading image", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const imageUrl = await uploadImage(profilePicture);

      const newContact = await contactsData({
        name,
        email,
        phoneNumber,
        address,
        profilePicture: imageUrl,
      });
      console.log("contact", newContact);

      setName("");
      setEmail("");
      setPhoneNumber("");
      setAddress("");
      setProfilePicture("");

      toast.success("Contact added successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error adding contact");
    }
  };

  return (
    <FormContainer>
      <FormImage src="image/contacts.png" alt="" />
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Phone Number</Label>
          <Input
            type="tel"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Address</Label>
          <Input
            type="text"
            name="address"
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

        <Button type="submit">Submit</Button>
        {isError && <Error status="Error" message="Error adding contact" />}
        {isLoading && <Loading />}
        {isSuccess && <Success status="Success" message="Contact added" />}
      </Form>
    </FormContainer>
  );
};

export default ContactsForm;
