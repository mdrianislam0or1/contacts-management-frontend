import styled from "styled-components";
import { useGetAllContactsQuery } from "../redux/features/contacts/contactsApi";
import Error from "../ui/Error";
import Loading from "../ui/Loading";
import ContactCard from "../components/card/ContactCard";
import { TContact } from "../redux/features/contacts/contactsSlice";

const AllContact = () => {
  const {
    data: contacts,
    error,
    isLoading,
    isSuccess,
  } = useGetAllContactsQuery();

  console.log(contacts);

  if (isLoading) {
    return <Loading />;
  }

  if (error || !isSuccess || !contacts) {
    return <Error status="false" message="somethinig wrong"></Error>;
  }

  return (
    <Container>
      {contacts?.data?.map((contact: TContact) => (
        <ContactCard key={contact._id} contact={contact} />
      ))}
    </Container>
  );
};

export default AllContact;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
