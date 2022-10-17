import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupFormPage from "./SignUpForm";

function SignUpFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div onClick={() => setShowModal(true)}>Sign Up</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupFormPage />
        </Modal>
      )}
    </>
  );
}

export default SignUpFormModal;
