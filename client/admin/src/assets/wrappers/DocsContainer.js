import styled from "styled-components";

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  /* .docs {
    display: grid;
    grid-template-rows: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 992px) {
    .docs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  } */

  .edit-btn {
    color: var(--green-dark);
    background: var(--green-light);
    margin-right: 0.7rem;
    margin-left: 0.7rem;
  }

  .download-btn {
    color: var(--grey-900);
    background: var(--primary-300);
  }

  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
  }

  .edit-btn:hover {
    color: black !important;
    background-color: none !important;
  }

  .delete-btn:hover {
    color: black !important;
    background-color: none !important;
  }

  .download-btn:hover {
    color: black !important;
    background-color: none !important;
  }
  .actions {
    display: block;
    text-align: center;
  }

  thead th {
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: #fafafa;
  }

  tbody td {
    padding-top: 14px;
    padding-bottom: 14px;
    background-color: #fafafa;
  }
`;
export default Wrapper;
