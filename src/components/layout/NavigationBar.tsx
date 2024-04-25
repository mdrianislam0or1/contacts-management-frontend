import { Link } from "react-router-dom";
import styled from "styled-components";

const NavBar = styled.nav`
  background-color: #1d2b53;
  color: #ffffff;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  Link {
    text-decoration: none;
    color: white;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 15px 0;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  color: inherit;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 10px 20px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #343a40;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const CustomLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const NavigationBar = () => {
  return (
    <NavBar>
      <div>
        <CustomLink to="/">
          <NavButton>
            <h1>🈸</h1>
          </NavButton>
        </CustomLink>
      </div>
      <div>
        <CustomLink to="/add-contacts">
          <NavButton>Add Contacts</NavButton>
        </CustomLink>
        <CustomLink to="/">
          <NavButton>All Contacts</NavButton>
        </CustomLink>
      </div>
    </NavBar>
  );
};

export default NavigationBar;
