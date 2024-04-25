import React, { useState } from "react";
import styled from "styled-components";
import UpdateModalCard from "./UpdateModalCard";
import { TContact } from "../../redux/features/contacts/contactsSlice";
import {
  useDeleteContactMutation,
  useMarkAsFavoriteMutation,
} from "../../redux/features/contacts/contactsApi";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useQueryClient } from "react-query";

interface ContactCardProps {
  contact: TContact;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  const [deleteContact, { isLoading, isError, isSuccess }] =
    useDeleteContactMutation();
  const queryClient = useQueryClient();
  const [isFavorite, setIsFavorite] = useState(contact.isFavorite);
  const [
    markAsFavorite,
    {
      isLoading: isFavoriteLoading,
      isError: isFavoriteError,
      isSuccess: isFavouriteSuccess,
    },
  ] = useMarkAsFavoriteMutation();

  const handleFavoriteToggle = async () => {
    try {
      setIsFavorite((prevIsFavorite) => !prevIsFavorite);

      await markAsFavorite({
        contactId: contact._id,
        markAsFavoriteData: { isFavorite: !isFavorite },
      });

      const favoriteStatus = !isFavorite
        ? "marked as favorite"
        : "removed from favorites";
      if (isFavoriteLoading) {
        toast.info(`Marking as favorite`);
      }
      if (isFavouriteSuccess) {
        toast.success(`Contact ${favoriteStatus} successfully`);
      }
    } catch (error) {
      setIsFavorite((prevIsFavorite) => !prevIsFavorite);
      if (isFavoriteError) {
        toast.error("Error toggling favorite status");
      }
      console.error("Error toggling favorite status:", error);
      toast.error("Error toggling favorite status");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteContact(contact._id);
      console.log("Contact deleted successfully");

      if (isSuccess) {
        toast.success("Contact deleted successfully");
      }
      if (isLoading) {
        toast.info("Deleting contact");
      }

      window.location.reload();
      queryClient.invalidateQueries("getAllContacts");
    } catch (error) {
      if (isError) {
        toast.error("Error deleting contact");
      }
      console.error("Error deleting contact", error);
    }
  };

  const handleUpdateSubmit = async () => {
    <div>
      <UpdateModalCard contact={contact} />
    </div>;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <CardContainer isFavorite={isFavorite}>
        {isFavorite && <FavoriteLabel> Your Favorite Contact</FavoriteLabel>}
        <OptionalDiv>
          <div>
            <Avatar src={contact.profilePicture} alt={contact.profilePicture} />
          </div>
          <div>
            <SelectWrapper>
              <Select>
                <option onClick={handleFavoriteToggle}>
                  {isFavorite ? "Remove Favorites" : "Add to Favorites"}
                </option>
                <option onClick={handleUpdateSubmit}>update</option>
                <option onClick={handleDelete}>Delete</option>
              </Select>
            </SelectWrapper>
          </div>
        </OptionalDiv>
        <ContactInfo>
          <Name>Contact Name: {contact.name}</Name>
          <Email>Email Address: {contact.email}</Email>
          <PhoneNumber>Phone Number: {contact.phoneNumber}</PhoneNumber>
          <Address>Address: {contact.address}</Address>
        </ContactInfo>

        <Actions>
          <UpdateButton>
            <UpdateModalCard contact={contact} />
          </UpdateButton>
          <FavoriteButton onClick={handleFavoriteToggle}>
            {isFavorite ? "Remove Favorites" : "Add to Favorites"}
          </FavoriteButton>
          <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
        </Actions>
      </CardContainer>
    </motion.div>
  );
};

export default ContactCard;

const OptionalDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SelectWrapper = styled.div`
  position: relative;
  margin-top: 10px;
`;

const Select = styled.select`
  background-color: #143f6b;
  color: #fff;
  padding: 4px 6px;
  border: none;
  cursor: pointer;
  font-size: 10px;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const ContactInfo = styled.div`
  margin-bottom: 10px;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Email = styled.div`
  font-size: 14px;
`;

const PhoneNumber = styled.div`
  font-size: 14px;
`;

const Address = styled.div`
  font-size: 14px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 6px 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
`;

const UpdateButton = styled(Button)`
  background-color: #a3d8ff;
  color: balck;
`;

const DeleteButton = styled(Button)`
  background-color: #ff204e;
  color: #fff;
`;

const FavoriteButton = styled(Button)`
  background-color: #4ccd99;
  color: #fff;
`;

const CardContainer = styled.div<{ isFavorite: boolean }>`
  width: 300px;
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-top: ${({ isFavorite }) =>
    isFavorite ? "3px solid #FFD95A" : "none"};

  position: relative;
`;

const FavoriteLabel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  color: #ffd95a;
  padding: 4px 6px;
  text-align: right;
  font-weight: bold;
`;
