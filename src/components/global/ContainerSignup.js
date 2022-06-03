import React from "react";
import styled from "styled-components";

// for signup
function ContainerSignup(props) {
  return <Contain>{props.children}</Contain>;
}

export default ContainerSignup;

const Contain = styled.div`
  width: 90%;
  max-width: 662px;
  /* max-width: 821px; */
  height: auto;
  margin: 0 auto;
`;

// feed header container
export const HeaderContainer = ({ children }) => {
  return <HeaderContain>{children}</HeaderContain>;
};

const HeaderContain = styled.div`
  width: 90%;
  max-width: calc(935px + 40px);
  /* max-width: 821px; */
  height: auto;
  position: relative;
  margin: 0 auto;
`;
